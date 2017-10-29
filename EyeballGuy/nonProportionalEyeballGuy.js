var easing = 0.05;
var x = 0;
var y = 0;

function setup() {
createCanvas(800, 600);
}
function draw() {

	var smallMouseX = constrain(mouseX, 0, width);
	var smallMouseY = constrain(mouseY,0, height);
	var eyeballx = map(smallMouseX, 0, width, 0, 40);
	var eyebally = map(smallMouseY, 0, height, 0, 40);
	var targetX = smallMouseX;
	var targetY = smallMouseY;
	var xmap = map(x, 0, width, 0, 40);
	var ymap = map(y, 0, height, 0, 40);
	x += (targetX - x) * easing;
	y += (targetY - y) * easing;
	//var smallY = constrain()
	background(155);
	fill(255);
	strokeWeight(8);
	rect(300,100,200,400,20,20,20,20); //face
	strokeWeight(6);
	rect(335,150,50,50,10,10,10,10); //left eye
	strokeWeight(6);
	rect(415,150,50,50,10,10,10,10);//right eye
	rect(340+eyeballx,152+eyebally,5,5);//left eyeball
	rect(420+xmap,152+ymap,5,5);//right eyeball
	

}