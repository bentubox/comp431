
var images0 = ["images/Flowers0.jpg", "images/Flowers1.jpg", "images/Flowers2.jpg", "images/Flowers3.jpg"];
var index0 = 0;

var imgList0 = images0.map(function(src){
	var img = new Image();
	img.src = src;
	return img;
})