window.onload = function () {
    var images0 = ["images/Flowers0.jpg", "images/Flowers1.jpg", "images/Flowers2.jpg", "images/Flowers3.jpg"];
	var index0 = 0;

	var imgList0 = images0.map(function(src){
		var img = new Image();
		img.src = src;
		return img;
	});

	var images1 = ["images/Building0.jpg", "images/Building1.jpg", "images/Building2.jpg", "images/Building3.jpg"];
	var index1 = 0;

	var imgList1 = images1.map(function(src){
		var img = new Image();
		img.src = src;
		return img;
	});

	var images2 = ["images/Food0.jpg", "images/Food1.jpg", "images/Food2.jpg", "images/Food3.jpg"];
	var index2 = 0;

	var imgList2 = images2.map(function(src){
		var img = new Image();
		img.src = src;
		return img;
	});

	var images3 = ["images/Scene0.jpg", "images/Scene1.jpg", "images/Scene2.jpg", "images/Scene3.jpg"];
	var index3 = 0;

	var imgList3 = images3.map(function(src){
		var img = new Image();
		img.src = src;
		return img;
	});

	function startInterval0(){
		var interval = Math.random() * 4000 + 1000;
		var img0 = document.getElementById("image0");
		return setInterval(function(){
			img0.src = imgList0[index0++ % images0.length].src;
		}, interval);
	}

	function startInterval1(){
		var interval = Math.random() * 4000 + 1000;
		var img1 = document.getElementById("image1");
		return setInterval(function(){
			img1.src = imgList1[index1++ % images1.length].src;
		}, interval);
	}

	function startInterval2(){
		var interval = Math.random() * 4000 + 1000;
		var img2 = document.getElementById("image2");
		return setInterval(function(){
			img2.src = imgList2[index2++ % images2.length].src;
		}, interval);
	}

	function startInterval3(){
		var interval = Math.random() * 4000 + 1000;
		var img3 = document.getElementById("image3");
		return setInterval(function(){
			img3.src = imgList3[index3++ % images3.length].src;
		}, interval);
	}

	var interval0 = startInterval0();
	var start0 = true;
	var interval1 = startInterval1();
	var start1 = true;
	var interval2 = startInterval2();
	var start2 = true;
	var interval3 = startInterval3();
	var start3 = true;

	function stopInterval0(){
		clearInterval(interval0);
	}

	function stopInterval1(){
		clearInterval(interval1);
	}

	function stopInterval2(){
		clearInterval(interval2);
	}

	function stopInterval3(){
		clearInterval(interval3);
	}

	document.getElementById("stop0").onclick = function(){
		if (start0){
			stopInterval0();
			document.getElementById("stop0").innerHTML = "START"
		} else {
			startInterval0();
			document.getElementById("stop0").innerHTML = "STOP"
		}
		start0 = !start0;
	}

	document.getElementById("stop1").onclick = function(){
		if (start1){
			stopInterval1();
			document.getElementById("stop1").innerHTML = "START"
		} else {
			startInterval1();
			document.getElementById("stop1").innerHTML = "STOP"
		}
		start1 = !start1;
	}

	document.getElementById("stop2").onclick = function(){
		if (start2){
			stopInterval2();
			document.getElementById("stop2").innerHTML = "START"
		} else {
			startInterval2();
			document.getElementById("stop2").innerHTML = "STOP"
		}
		start2 = !start2;
	}

	document.getElementById("stop3").onclick = function(){
		if (start3){
			stopInterval3();
			document.getElementById("stop3").innerHTML = "START"
		} else {
			startInterval3();
			document.getElementById("stop3").innerHTML = "STOP"
		}
		start3 = !start3;
	}
}