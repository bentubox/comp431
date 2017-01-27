'use strict'

var createApp = function(canvas) { 
	var c = canvas.getContext("2d");

	// Sun data.
	var radius = 30;
	var sunx = 0;
	var suny = canvas.height * 0.1;
	var grow = true;	

	// common size for windows
	var windowSpacing = 2, floorSpacing = 3
	var windowHeight = 5, windowWidth = 3

	// colors of buildings
	var blgColors = [ 'red', 'blue', 'gray', 'orange']

	// building array
	var buildings = []

	// ground stuff
	var floor = canvas.height/2
	var grad = c.createLinearGradient(0,floor,0,canvas.height)
	grad.addColorStop(0, "green")
	grad.addColorStop(1, "black")

	// car stuff
	var car = document.getElementById("car")
	var carx = 0
	var cary = canvas.width/2

	window.addEventListener("click", function(e){
    	var x = event.clientX;
    	var y = event.clientY;
    	var b
    	for (b in buildings){
			var buildme = buildings[b]
			if (x > buildme.start && x < buildme.start + buildme.w){
				if (y < floor && y > floor - buildme.h){
					console.log(buildme.c)
					buildme.h = buildme.h + 2 * windowHeight
				}
			}
		}

	});

	var drawSun = function(){
		// Create sun.
		c.beginPath();
		c.fillStyle="yellow"
		c.arc(sunx, suny, radius, 0, 2 * Math.PI)
		c.fill()
	}

	var drawGround = function(){
		// Create the ground
		c.fillStyle=grad
		c.fillRect(0, floor, canvas.width, canvas.height)
	}

	var drawBuildings = function(){
		var b
		for (b in buildings){
			var buildme = buildings[b]
			c.fillStyle= buildme.c
			c.fillRect(buildme.start, floor - buildme.h, buildme.w, buildme.h)
			for (var y = floor - floorSpacing; y > floor - buildme.h; y -= floorSpacing + windowHeight) {
				for (var x = windowSpacing; x < buildme.w - windowWidth; x += windowSpacing + windowWidth) {
					if (Math.random() > 0.5){
						c.fillStyle="yellow"
					} else {
						c.fillStyle="black"
					}
					c.fillRect(buildme.start + x, y - windowHeight, windowWidth, windowHeight)
				}
			}
		}
	}

	var drawCar = function(){
		c.drawImage(car, carx, cary, 100, 33)
	}

	//build a building
	var build = function() { 
		var x0 = Math.random()*canvas.width
		var blgWidth = (windowWidth+windowSpacing+1) * Math.floor(Math.random()*10)
		var blgHeight = Math.max(Math.random()*canvas.height/2, windowHeight+1)

		var color = blgColors[ Math.floor(Math.random()*blgColors.length)]
		var building = {start: x0, w: blgWidth, h: blgHeight, c: color}
		buildings.push(building)
		// console.log(buildings.length)
	}

	var update = function(){
		// Update sun.
		if (grow){
			radius = radius + 1; 
			if (radius > 50){
				grow = false
			}
		} else {
			radius = radius - 1;
			if (radius < 20){
				grow = true
			}
		}
		sunx = sunx + 5
		if (sunx - radius > canvas.width){
			sunx = 0;
		}

		carx = carx+3
		if (carx > canvas.width + 20){
			carx = 0;
		}
	}

	setInterval(function(){
		c.clearRect(0, 0, canvas.width, canvas.height)
		update();
		drawSun()
		drawGround()
		drawBuildings()
		drawCar()
	}, 100);

	return {
		build: build
	}
}

window.onload = function() {
	var app = createApp(document.querySelector("canvas"))
	document.getElementById("build").onclick = app.build
}


