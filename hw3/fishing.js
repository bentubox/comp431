'use strict'

var createApp = function(canvas) { 
	var c = canvas.getContext("2d")

 	// World variables.
    var floor = canvas.height * 0.2
	var initialObjectCount = 3
	// Metrics
	var score = 0;
	var fishLost = 0;
	var fastestCatch = null

	// Helper functions for positioning elements correctly.
	var getPosition = function(element) {
		var xPos = 0
		var yPos = 0
		
		while (element) {
			xPos += (element.offsetLeft - element.scrollLeft + element.clientLeft);
			yPos += (element.offsetTop - element.scrollTop + element.clientTop);
			element = element.offsetParent;
		}
		return { x: xPos, y: yPos };
	}

	var getDrawLocation = function(o){
		var drawX = o.x - o.width * o.scale * 0.5
		var drawY = o.y - o.height * o.scale * 0.5
		return {x : drawX, y : drawY }
	}

	var cacheImage = function(imgArray){
		return imgArray.map(function(src){
			var img = new Image();
			img.src = src;
			return img;
		});
	};

	// EventListener for polling mpuse location.
	var mouse = { x:0, y:floor }
	canvas.addEventListener("mousemove", function(e){
		mouse.x = e.clientX - getPosition(canvas).x
		mouse.y = e.clientY - getPosition(canvas).y
	}, false);

	// World objects.
	var hook = { image:document.getElementById("hook"), x:canvas.width * 0.5, y:canvas.height * 0.5, width:88, height:160, scale:0.5 }
	var sinker = { image:document.getElementById("sinker"), x:canvas.width * 0.5, y:canvas.height * 0.4, width: 42, height:140, scale: 0.3 }
	var bobber = { image:document.getElementById("bobber"), x:canvas.width * 0.5, y:floor, width:80, height:128, scale:0.5 }
	var oceanContents = []

	var populateOcean = function(number){
		// Distribution of ocean entities.
		var goldProb = 0.5
		var jellyProb = 0.8

		for (var index = 0; index < number; index++) {
			var r = Math.random()
			if (r <= goldProb){
				var newObject = { 
					id:"fish",
					image:document.getElementById("fish"),
					frames:[
						"resources/gold/goldfish0.png",
						"resources/gold/goldfish1.png",
						"resources/gold/goldfish2.png",
						"resources/gold/goldfish3.png",
						"resources/gold/goldfish4.png",
						"resources/gold/goldfish5.png",
						"resources/gold/goldfish6.png",
						"resources/gold/goldfish7.png"
					],
					index:0,
					x:0,
					y:(canvas.height - floor) * Math.random() + floor,
					width:72,
					height:72,
					scale:0.7,
					angle:20 
				};
			} else if (r > goldProb && r <= jellyProb){
				var newObject = { 
					id:"jelly",
					image:new Image(),
					frames:[],
					index:0,
					x:0,
					y:(canvas.height - floor) * Math.random() + floor,
					width:72,
					height:72,
					scale:0.7,
					angle:20 
				};
			} else {
				var newObject = { 
					id:"bomb",
					image:document.getElementById("bomb"),
					frames:[
						"resources/hazard/c40.png",
						"resources/hazard/c41.png"
					],
					index:0,
					x:0,
					y:(canvas.height - floor) * Math.random() + floor,
					width:144,
					height:144,
					scale:0.5,
					angle:0 
				};
			}
			
			oceanContents.push(newObject)
		}
	}

	// World update and rendering functions.
	var updatePlayer = function(){
		var sinkerOffset = 0.8
		var hookDrift = 0.3
		var sinkerDrift = 0.5
		hook.x = hook.x + (mouse.x - hook.x) * hookDrift
		if (mouse.y >= floor){
			hook.y = hook.y + (mouse.y - hook.y) * hookDrift
		} else{
			hook.y = hook.y + (floor - hook.y) * hookDrift
		}
		sinker.x = sinker.x + (mouse.x - sinker.x) * sinkerDrift
		if (mouse.y >= floor * (1 / sinkerOffset)){
			sinker.y = sinker.y + (mouse.y * sinkerOffset - sinker.y) * sinkerOffset
		} else{
			sinker.y = sinker.y + (floor - sinker.y) * sinkerOffset
		}
		bobber.x = mouse.x
	}

	var updateOceanContents = function(){
		oceanContents.forEach(function(element) {
			switch (element.id){
				case "fish":
					element.x = element.x + 1
					if (element.x > canvas.width){
						element.x = 0
					}
						element.image.src = cacheImage(element.frames)[element.index++ % element.frames.length].src;
					break;
				case "bomb":
					element.x = element.x + 1
					if (element.x > canvas.width){
						element.x = 0
					}
						element.image.src = cacheImage(element.frames)[element.index++ % element.frames.length].src;
					break;
			}
		});
	}

    var drawWater = function(){
		// Draw Water.
		c.beginPath()
		c.fillStyle= "#48D1CC"
		c.fillRect(0, floor, canvas.width, canvas.height)
	}
	var drawPlayer = function(){
		var hookOffset = -10
		c.drawImage(hook.image, getDrawLocation(hook).x + hookOffset, getDrawLocation(hook).y, hook.width * hook.scale, hook.height * hook.scale)
		c.beginPath()
		c.moveTo(bobber.x, bobber.y)
		c.lineTo(sinker.x, getDrawLocation(sinker).y)
		c.stroke()
		c.closePath()
		c.drawImage(bobber.image, getDrawLocation(bobber).x, getDrawLocation(bobber).y, bobber.width * bobber.scale, bobber.height * bobber.scale)
		c.beginPath()
		c.moveTo(sinker.x, sinker.y)
		c.lineTo(hook.x, getDrawLocation(hook).y)
		c.stroke()
		c.drawImage(sinker.image, getDrawLocation(sinker).x, getDrawLocation(sinker).y, sinker.width * sinker.scale, sinker.height * sinker.scale)
	}
	var drawOceanContents = function(){
		oceanContents.forEach(function(element) {
			// element.angle++
			c.save()
			c.translate(getDrawLocation(element).x, getDrawLocation(element).y); 
			c.rotate(element.angle * Math.PI/180)
			c.drawImage(element.image, -(element.width / 2), -(element.height / 2), element.width * element.scale, element.height * element.scale)
			c.restore()
		});
		
	}

	// Update game world.
	var update = function(){
		updatePlayer()
		updateOceanContents()
	}

	// Redraw game world.
	var draw = function(){
		c.clearRect(0, 0, canvas.width, canvas.height)
		drawWater()
		drawPlayer()
		drawOceanContents()
	}

	// Start game update loop.
    setInterval(function(){
		update()
		draw()
	}, 50);

	return {
		populateOcean : populateOcean,
		initialObjectCount : initialObjectCount
	}
}

window.onload = function() {
	var app = createApp(document.querySelector("canvas"))
	app.populateOcean(app.initialObjectCount)
}