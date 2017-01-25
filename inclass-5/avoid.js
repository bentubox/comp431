var butt= document.getElementById('clickme');
var shiftDown = false;
var win = false;

window.onload = function() {
    butt = document.getElementById('clickme');
    butt.style.margin = "50% auto auto 50%";
};

document.addEventListener("keydown", function (event){
	// console.log(event.which);
	if (event.keyCode == 16){
		shiftDown = true;
	}
	// console.log(shiftDown);
});

document.addEventListener("keyup", function (event){
	// console.log(event.which);
	if (event.keyCode == 16){
		shiftDown = false;
	}
	// console.log(shiftDown);
});

function moveButton(){
	if (!shiftDown && !win) {
		butt.style.margin = Math.random() * 50 + "% auto auto " + Math.random() * 50 + "%";
		console.log(butt);
	}
}

function end_game(){
	console.log("click")
	if (win == false){
		win = true;
		butt.innerHTML = "Play Again?";
		document.getElementById("congrats").style.display = "table";
	} else {
		win = false;
		butt.innerHTML = "CLICK ME";
		butt.style.margin = "50% auto auto 50%";
		document.getElementById("congrats").style.display = "none";
	}
}

