'use strict'

var app

var createApp = function(canvas) { 
	var c = canvas.getContext("2d")

 	// World variables.
    var floor = canvas.height * 0.2
	var initialObjectCount = 8
	var hooked = false
	// Distribution of ocean entities.
	var goldProb = 0.3
	var jellyProb = 0.7

	// Offset from floor where ocean entities can't spawn.
	var floorOffset = 100

	// Entity speed constants.
	var varSpeed = 7
	var minSpeed = 3

	// Metrics
	var score = 0;
	var fishLost = 0;
	var fastestCatch = null

	// Image frame arrays.
	var fishFrames = [
						"resources/gold/goldfish0.png",
						"resources/gold/goldfish1.png",
						"resources/gold/goldfish2.png",
						"resources/gold/goldfish3.png",
						"resources/gold/goldfish4.png",
						"resources/gold/goldfish5.png",
						"resources/gold/goldfish6.png",
						"resources/gold/goldfish7.png"
					]
	var jellyFrames = [
						"resources/jelly/jellyfish_0.png",
						"resources/jelly/jellyfish_1.png",
						"resources/jelly/jellyfish_2.png",
						"resources/jelly/jellyfish_3.png",
						"resources/jelly/jellyfish_4.png",
						"resources/jelly/jellyfish_5.png",
						"resources/jelly/jellyfish_6.png",
						"resources/jelly/jellyfish_7.png",
						"resources/jelly/jellyfish_8.png",
						"resources/jelly/jellyfish_9.png",
						"resources/jelly/jellyfish_10.png",
						"resources/jelly/jellyfish_11.png"
					]
	var bombFrames = [
						"resources/hazard/c40.png",
						"resources/hazard/c41.png"
					]
	var impactFrames = ["resources/bang/impact_0.png", "resources/bang/impact_1.png", "resources/bang/impact_2.png"]

	var fishIcon = document.getElementById("fish")
	var jellyIcon = document.getElementById("jelly")
	var bombIcon = document.getElementById("bomb")

	var indexF = 0
	var indexJ = 0
	var indexB = 0

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

	var getDistance = function(a, b){
		return Math.sqrt(Math.pow((a.x - b.x), 2) + Math.pow((a.y - b.y), 2))
	}

	var getRadius = function(e){
		return (e.width + e.height) * e.scale / 2
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
	var fisherman = {image:document.getElementById("fisherman"), x:canvas.width, y:0, width:800, height:600, scale:0.5 }
	var hook = { image:document.getElementById("hook"), x:canvas.width * 0.5, y:canvas.height * 0.5, width:88, height:160, scale:0.5 }
	var sinker = { image:document.getElementById("sinker"), x:canvas.width * 0.5, y:canvas.height * 0.4, width: 42, height:140, scale: 0.3 }
	var bobber = { image:document.getElementById("bobber"), x:canvas.width * 0.5, y:floor, width:80, height:128, scale:0.5 }
	var oceanContents = []

	var generateFish = function(){
		return { 
				id:"fish",
				image:new Image(),
				frames:fishFrames,
				index:0,
				x:-72,
				y:(canvas.height - floor - floorOffset) * Math.random() + floor + floorOffset,
				width:72,
				height:72,
				scale:0.5 + Math.random() * 0.7,
				speed: Math.max(Math.random() * varSpeed, Math.random() * varSpeed) + minSpeed,
				angle:20,
				caught: false,
				destroyed: false
			};
	}

	var generateJelly = function(){
		return { 
				id:"jelly",
				image:new Image(),
				frames:jellyFrames,
				index:0,
				x:-160,
				y:(canvas.height - floor - floorOffset) * Math.random() + floor + floorOffset,
				width:160,
				height:250,
				scale:0.5,
				speed: Math.min(Math.random() * varSpeed, Math.random() * varSpeed) + minSpeed,
				angle:0,
				caught: false,
				destroyed: false
			};
	}

	var generateBomb = function(){
		return { 
				id:"bomb",
				image:new Image(),
				frames:bombFrames,
				index:0,
				x:-144,
				y:(canvas.height - floor - floorOffset) * Math.random() + floor + floorOffset,
				width:144,
				height:144,
				scale:0.5,
				speed: Math.random() * varSpeed + minSpeed,
				angle:0,
				caught: false,
				destroyed: false
			};
	}

	var populateOcean = function(number){
		for (var index = 0; index < number; index++) {
			var r = Math.random()
			if (r <= goldProb){
				oceanContents.push(generateFish())
			} else if (r > goldProb && r <= jellyProb){
				oceanContents.push(generateJelly())
			} else {
				oceanContents.push(generateBomb())
			}
		}
	}

	// World update and rendering functions.
	var updatePlayer = function(){
		var sinkerOffset = 0.8
		var hookDrift = 0.3
		var sinkerDrift = 0.5
		fisherman.x = canvas.width - (fisherman.width * fisherman.scale / 2)
		fisherman.y = floor - (fisherman.height * fisherman.scale / 2) + fisherman.height * fisherman.scale / 5
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
		var trash = []
		oceanContents.forEach(function(element) {
			if (!element.caught){
				element.x = element.x + element.speed
				if (element.x > canvas.width + element.width){
					element.x = 0
					element.y = (canvas.height - floor - floorOffset) * Math.random() + floor + floorOffset
				}
			} else{
				element.x = getDrawLocation(hook).x - hook.width / 3
				element.y =  getDrawLocation(hook).y + hook.height / 4
			}
			element.image.src = cacheImage(element.frames)[element.index++ % element.frames.length].src;
			switch (element.id){
				case "fish":
					if (getDistance(element, hook) < getRadius(element) && !hooked){
						hooked = true;
						element.caught = true;
					}
					if (element.destroyed){
						trash.push(oceanContents.indexOf(element))
						if (element.caught){
							hooked = false;
						}
					}
					break;
				case "jelly":
					if (getDistance(element, hook) < getRadius(element) && !hooked){
						hooked = true;
						element.caught = true;
					}
					if (element.destroyed){
						trash.push(oceanContents.indexOf(element))
						if (element.caught){
							hooked = false;
						}
					}
					break;
				case "bomb":
					if (element.destroyed){
						if (element.index >= element.frames.length * 2){
							trash.push(oceanContents.indexOf(element))
						} else {
							element.scale = 1.2
						}
					} else{
						element.angle = element.angle + 3
						oceanContents.forEach(function(collide) {
							if (collide.id !== "bomb" && collide.caught && hooked && getDistance(element, collide) < getRadius(collide)){
								element.index = 0
								element.frames = impactFrames
								element.width = 128
								element.height = 128
								trash.push(oceanContents.indexOf(collide))
								element.destroyed = true
								collide.destroyed = true
								hooked = false
								if (collide.id === "fish"){
									fishLost++
								}
							}
						});
					}
					break;
			}
		});

		trash.forEach(function(i) {
			oceanContents.splice(i, 1)
		})
	}

    var drawWater = function(){
		// Draw Water.
		c.beginPath()
		c.fillStyle= "#48D1CC"
		c.fillRect(0, floor, canvas.width, canvas.height)
	}
	var drawPlayer = function(){
		var hookOffset = -10
		c.drawImage(fisherman.image, getDrawLocation(fisherman).x, getDrawLocation(fisherman).y, fisherman.width * fisherman.scale, fisherman.height * fisherman.scale)
		c.beginPath()
		c.moveTo(getDrawLocation(fisherman).x, 0)
		c.lineTo(bobber.x, bobber.y)
		c.strokeStyle="black"
		c.lineWidth = 1
		c.stroke()
		c.closePath()
		c.drawImage(hook.image, getDrawLocation(hook).x + hookOffset, getDrawLocation(hook).y, hook.width * hook.scale, hook.height * hook.scale)
		// c.fillStyle="white"
		// c.fillRect(hook.x, hook.y, hook.width * hook.scale, hook.height * hook.scale)
		c.beginPath()
		c.moveTo(bobber.x, bobber.y)
		c.lineTo(sinker.x, getDrawLocation(sinker).y)
		c.strokeStyle="black"
		c.lineWidth = 1
		c.stroke()
		c.closePath()
		c.drawImage(bobber.image, getDrawLocation(bobber).x, getDrawLocation(bobber).y, bobber.width * bobber.scale, bobber.height * bobber.scale)
		c.beginPath()
		c.moveTo(sinker.x, sinker.y)
		c.lineTo(hook.x, getDrawLocation(hook).y)
		c.stroke()
		c.closePath()
		c.drawImage(sinker.image, getDrawLocation(sinker).x, getDrawLocation(sinker).y, sinker.width * sinker.scale, sinker.height * sinker.scale)
		c.strokeStyle="yellow"
		c.lineWidth = 5
		c.beginPath()
		c.rect(canvas.width - 420, 0, 420, 250)
		c.stroke();
		c.closePath()
	}
	var drawOceanContents = function(){
		console.log(oceanContents.length)
		oceanContents.forEach(function(element) {
			c.save()
			c.translate(getDrawLocation(element).x, getDrawLocation(element).y);
			c.translate(element.width * element.scale, element.height * element.scale); 
			c.rotate(element.angle * Math.PI/180)
			c.drawImage(element.image, -(element.width * element.scale / 2), -(element.height  * element.scale / 2), element.width * element.scale, element.height * element.scale)
			c.restore()
			// c.fillStyle="white"
			// c.fillRect(element.x, element.y, element.width * element.scale, element.height * element.scale)
		});
	}
	var drawMetrics = function(){
		c.font = "16px Courier New";
		c.fillStyle= "#48D1CC"
		c.fillText("SCORE: " + score, 10, 20);
		c.fillText("Fish Lost: " + fishLost, 10, 36);
		c.fillText("Fastest Catch: " + fastestCatch, 10, 52);
		if (hooked){
			c.font = "bold 24px Courier New";
			c.fillText("GOT ONE!", canvas.width - 360, 50)
		}
	}

	// Update game world.
	var update = function(){
		updatePlayer()
		updateOceanContents()
		fishIcon.src = cacheImage(fishFrames)[indexF++ % fishFrames.length].src;
		jellyIcon.src = cacheImage(jellyFrames)[indexJ++ % jellyFrames.length].src;
		bombIcon.src = cacheImage(bombFrames)[indexB++ % bombFrames.length].src;
	}

	// Redraw game world.
	var draw = function(){
		c.clearRect(0, 0, canvas.width, canvas.height)
		drawWater()
		drawPlayer()
		drawOceanContents()
		drawMetrics()
	}

	var restart = function(){
		var c = canvas.getContext("2d")

		// World variables.
		floor = canvas.height * 0.2
		initialObjectCount = 8
		hooked = false
		// Distribution of ocean entities.
		var goldProb = 0.3
		var jellyProb = 0.7

		// Offset from floor.
		var floorOffset = 20

		// Entity speed constants.
		var varSpeed = 7
		var minSpeed = 3

		// Metrics
		score = 0;
		fishLost = 0;
		fastestCatch = null

		// World objects.
		hook = { image:document.getElementById("hook"), x:canvas.width * 0.5, y:canvas.height * 0.5, width:88, height:160, scale:0.5 }
		sinker = { image:document.getElementById("sinker"), x:canvas.width * 0.5, y:canvas.height * 0.4, width: 42, height:140, scale: 0.3 }
		bobber = { image:document.getElementById("bobber"), x:canvas.width * 0.5, y:floor, width:80, height:128, scale:0.5 }
		oceanContents = []

		var indexF = 0
		var indexJ = 0
		var indexB = 0

		populateOcean(initialObjectCount)
	}

	// Start game update loop.
    setInterval(function(){
		update()
		draw()
	}, 80);

	return {
		populateOcean : populateOcean,
		initialObjectCount : initialObjectCount,
		restart : restart
	}
}

window.onload = function() {
	app = createApp(document.querySelector("canvas"))
	app.populateOcean(app.initialObjectCount)
	document.getElementById("restart").onclick = app.restart
	document.getElementById("addstuff").addEventListener("click", function(){
		app.populateOcean(1)
	});
}