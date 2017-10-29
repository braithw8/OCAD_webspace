var openbutton = 0
var sat = 75
var light = 50
var peopleArray = [	//people array
		'Jad',
		'Roxanne B',
		'Kristy',
		'Finlay',
		'Emma',
		'Ramona',
		'Kylie',
		'Karo',
		'Dave',
		'Sean',
		'Kate',
		'Roxanne H',
		'Max',
		'Chris',
		'Emilia',
		'Margot',
		'Nick',
		'Quinn',
		'Yiyi',
		'Sana',
		'Savaya',
		'Dikla',
		'Tommy',
		'Feng'
		];
var randomPerson;
var focusArray = [	//focus array
		'slight smile',
		'big smile',
		'left eye blink',
		'right eye blink',
		'tongue out',
		'nose flare',
		'teeth grin',
		'hair flip',
		'left shoulder shrug',
		'right shoulder shrug',
		'eye roll',
		'head tilt right',
		'head tilt left',
		'right hand victory sign',
		'left hand victory sign',
		'torso twist to the left',
		'torso twist to the right',
		'right hand wave',
		'left hand wave',
		'left knee raise',
		'right knee raise',
		'left foot point',
		'right foot point',
		'squint',
		'eyebrows raise',
		'arms crossed',
		'right clench fist',
		'left clench fist',
		'head nod',
		'right hands high five',
		'left hands high five',
		'right hands hand shake',
		'left hands hand shake',
		'inhale',
		'exhale',
		'left thumb up',
		'right thumb up',
		'left thumb down',
		'right thumb down',
		'lean back',
		'squat',
		'jump',
		'left middle finger',
		'right middle finger',
		'head shake'
		];


var soundArray = [	//sound array
'assets/LAUGH0001.mp3',
'assets/LAUGH0002.mp3',
'assets/LAUGH0003.mp3',
'assets/LAUGH0004.mp3',
'assets/LAUGH0005.mp3',
'assets/LAUGH0006.mp3',
'assets/LAUGH0007.mp3',
'assets/LAUGH0008.mp3',
'assets/LAUGH0009.mp3',
'assets/LAUGH0010.mp3',
'assets/LAUGH0011.mp3',
'assets/LAUGH0012.mp3',
'assets/LAUGH0013.mp3',
'assets/LAUGH0014.mp3',
'assets/LAUGH0015.mp3',
'assets/LAUGH0016.mp3',
'assets/LAUGH0017.mp3',
'assets/LAUGH0018.mp3',
'assets/LAUGH0019.mp3',
'assets/LAUGH0020.mp3',
'assets/LAUGH0021.mp3',
'assets/LAUGH0022.mp3',
'assets/LAUGH0023.mp3',
'assets/LAUGH0024.mp3',
'assets/LAUGH0025.mp3',
'assets/LAUGH0026.mp3',
'assets/LAUGH0027.mp3',
'assets/LAUGH0028.mp3',
'assets/LAUGH0029.mp3',
'assets/LAUGH0030.mp3',
'assets/LAUGH0031.mp3',
'assets/LAUGH0032.mp3',
'assets/LAUGH0033.mp3',
'assets/LAUGH0034.mp3',
'assets/LAUGH0035.mp3',
'assets/LAUGH0036.mp3',
'assets/LAUGH0037.mp3',
'assets/LAUGH0038.mp3',
'assets/LAUGH0039.mp3',
'assets/LAUGH0040.mp3',
'assets/LAUGH0041.mp3',
'assets/LAUGH0042.mp3',
'assets/LAUGH0043.mp3',
'assets/LAUGH0044.mp3',
'assets/LAUGH0045.mp3',
'assets/LAUGH0046.mp3',
'assets/LAUGH0047.mp3',
'assets/LAUGH0048.mp3',
'assets/LAUGH0049.mp3',
'assets/LAUGH0050.mp3',
'assets/LAUGH0052.mp3',
'assets/LAUGH0053.mp3',
'assets/LAUGH0054.mp3',
'assets/LAUGH0055.mp3',
'assets/LAUGH0056.mp3',
'assets/LAUGH0051.mp3'];

var randomFocus;
var fontSIZE;
var randomBGhue;
var seconds;
var date;
var randomTXThue;
var randomTXThue1;
var randomTXThue2;
var randomTXThue3;
var randomTXThue4;
var randomTXThue5;
var randomTXThue6;
var randomTXThue7;
var randomTXThue8;

var selectedSound
var r = 0
var s = 1
var t = 2
var u = 3
function preload() {
  
	soundFormats('mp3', 'ogg');
	randomSound0 = Math.floor(Math.random()*soundArray.length);
	randomSound1 = Math.floor(Math.random()*soundArray.length);//random sound
	randomSound2 = Math.floor(Math.random()*soundArray.length);//random sound
	randomSound3 = Math.floor(Math.random()*soundArray.length);//random sound
	randomSound4 = Math.floor(Math.random()*soundArray.length);//random sound
	randomSound5 = Math.floor(Math.random()*soundArray.length);//random sound
	randomSound6 = Math.floor(Math.random()*soundArray.length);//random sound
	randomSound7 = Math.floor(Math.random()*soundArray.length);//random sound
	randomSound8 = Math.floor(Math.random()*soundArray.length);//random sound
	randomSound9 = Math.floor(Math.random()*soundArray.length);//random sound
//random sound

  //mySound = loadSound('assets/air-horn-club-sample_1.mp3',');
  //mySound2 = loadSound('assets/vehicle039.mp3',')
	selectedSound0 = loadSound(soundArray[randomSound0]);
	selectedSound1 = loadSound(soundArray[randomSound1]);
	selectedSound2 = loadSound(soundArray[randomSound2]);
	selectedSound3 = loadSound(soundArray[randomSound3]);
	selectedSound4 = loadSound(soundArray[randomSound4]);
	selectedSound5 = loadSound(soundArray[randomSound5]);
	selectedSound6 = loadSound(soundArray[randomSound6]);
	selectedSound7 = loadSound(soundArray[randomSound7]);
	selectedSound8 = loadSound(soundArray[randomSound8]);
	selectedSound9 = loadSound(soundArray[randomSound9]);
	selectedSound0.playMode('restart');
	selectedSound1.playMode('restart');
	selectedSound2.playMode('restart');
	selectedSound3.playMode('restart');
	selectedSound4.playMode('restart');
	selectedSound5.playMode('restart');
	selectedSound6.playMode('restart');
	selectedSound7.playMode('restart');
	selectedSound8.playMode('restart');
	selectedSound9.playMode('restart');

	


}

function setup() {
//from loading page
	
background(255);
//createCanvas(windowWidth, windowHeight);
randomBGhue = random(0,100);
randomTXThue1 = random(0,100);
randomTXThue2 = random(0,100);
randomTXThue3 = random(0,100);
randomTXThue4 = random(0,100);
randomTXThue5 = random(0,100);
randomTXThue6 = random(0,100);
randomTXThue7 = random(0,100);
randomTXThue8 = random(0,100);
stroke(25);
//strokeWeight(3);
textSize(window.innerHeight/10);
	
//from original
fontSIZE = window.innerHeight/10;
//randomBGhue = random(0,100);
randomTXThue = random(0,100);
randomPerson = Math.floor(Math.random()*peopleArray.length); //random person
randomFocus = Math.floor(Math.random()*focusArray.length);//random focus
createCanvas(windowWidth, windowHeight);
colorMode(HSL,100);
//selectedSound1.play();
//selectedSound2.play();
//selectedSound3.play();




	
	videoIN = createCapture({				//initialize video capture
    audio: false,
    video: {
			//facingMode: {exact: "environment"},
			maxFrameRate: 10
    		}
  			}
			);
			videoIN.hide();
	
	//background(random(0,255),100,100);											//background - remove once random is set up

	textAlign(CENTER, CENTER);			//text alignment
	textSize(fontSIZE);		//text size
	

	//text(peopleArray[randomPerson],window.innerWidth/2,window.innerHeight/6);		//display text randomPerson
	//text(focusArray[randomFocus],window.innerWidth/2,window.innerHeight/6*5);		//display randomFocus
	

}

function draw(){
 	
var difference = Math.abs(randomBGhue - randomTXThue);
	//print(difference);
	
	if (difference < 20 || difference > 80) {randomTXThue = random(0,100);}
	if (openbutton == 0)  //loading page
		{
			background(15);
			noStroke();
			var difference1 = Math.abs(randomTXThue1 - randomTXThue2);
			//print(difference2);
			if (difference1 < 19 || difference2 > 81) {randomTXThue2 = random(0,100);}
			fill(randomTXThue1, sat, light);
			text('Frame It Up!',window.innerWidth/2,window.innerHeight/8);
			textSize(window.innerHeight/20);
			var difference2 = Math.abs(randomTXThue2 - randomTXThue3);
			//print(difference2);
			if (difference2 < 19 || difference2 > 81) {randomTXThue3 = random(0,100);}
			fill(randomTXThue2, sat, light);		
			text('Here is how you play',window.innerWidth/2,window.innerHeight/6*1.7);
			var difference3 = Math.abs(randomTXThue3 - randomTXThue4);
			//print(difference2);
			if (difference3 < 19 || difference3 > 81) {randomTXThue4 = random(0,100);}
			fill(randomTXThue3, sat, light);		
			text('Every minute your screen will generate a name and a gestural prompt',window.innerWidth/2,window.innerHeight/6*2.2);
			var difference4 = Math.abs(randomTXThue4 - randomTXThue5);
			//print(difference2);
			if (difference4 < 19 || difference4 > 81) {randomTXThue5 = random(0,100);}
			fill(randomTXThue4, sat, light);		
			text('Use your camera to find the person',window.innerWidth/2,window.innerHeight/6*2.7);	
			var difference5 = Math.abs(randomTXThue5 - randomTXThue6);
			//print(difference2);
			if (difference5 < 19 || difference5 > 81) {randomTXThue6 = random(0,100);}
			fill(randomTXThue5, sat, light);		
			text('Ask them to perform the gestural prompt',window.innerWidth/2,window.innerHeight/6*3.2);
			var difference6 = Math.abs(randomTXThue6 - randomTXThue7);
			//print(difference2);
			if (difference6 < 19 || difference6 > 81) {randomTXThue7 = random(0,100);}
			fill(randomTXThue6, sat, light);		
			text('Click to take a picture',window.innerWidth/2,window.innerHeight/6*3.7);
			stroke(25);
			strokeWeight(3);
			fill(randomTXThue7, sat, light);
  			rect(windowWidth/8*3, windowHeight/12*8, windowWidth/4, windowHeight/4,50); 		//button to go to the camera 
			var difference7 = Math.abs(randomTXThue8 - randomTXThue7);
			//print(difference2);
			if (difference7 < 19 || difference7 > 81) {randomTXThue8 = random(0,100);}
  			fill(randomTXThue8, sat, light);
  			textSize(window.innerHeight/10);
			text('PLAY', windowWidth/2, windowHeight/12*9.5);
	
  if(mouseX>windowWidth/8*3 && mouseX<windowWidth/8*5 && mouseY>windowHeight/12*8 && mouseY<windowHeight/12*11 && mouseIsPressed) 
  		{
		openbutton=1;
			r = random([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
			if (r == 0) {selectedSound0.play();}
			if (r == 1) {selectedSound1.play();}
			if (r == 2) {selectedSound2.play();}
			if (r == 3) {selectedSound3.play();}
			if (r == 4) {selectedSound4.play();}
			if (r == 5) {selectedSound5.play();}
			if (r == 6) {selectedSound6.play();}
			if (r == 7) {selectedSound7.play();}
			if (r == 8) {selectedSound8.play();}
			if (r == 9) {selectedSound9.play();}
			r = random([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
			if (r == 0) {selectedSound0.play();}
			if (r == 1) {selectedSound1.play();}
			if (r == 2) {selectedSound2.play();}
			if (r == 3) {selectedSound3.play();}
			if (r == 4) {selectedSound4.play();}
			if (r == 5) {selectedSound5.play();}
			if (r == 6) {selectedSound6.play();}
			if (r == 7) {selectedSound7.play();}
			if (r == 8) {selectedSound8.play();}
			if (r == 9) {selectedSound9.play();}
			r = random([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
			if (r == 0) {selectedSound0.play();}
			if (r == 1) {selectedSound1.play();}
			if (r == 2) {selectedSound2.play();}
			if (r == 3) {selectedSound3.play();}
			if (r == 4) {selectedSound4.play();}
			if (r == 5) {selectedSound5.play();}
			if (r == 6) {selectedSound6.play();}
			if (r == 7) {selectedSound7.play();}
			if (r == 8) {selectedSound8.play();}
			if (r == 9) {selectedSound9.play();}
		} 			//setting the parameters for the button
  
  //print(openbutton);
  	
		}
	if (openbutton == 1) //game state	
	{
		date = new Date();
		seconds = date.getSeconds();
		fontSIZE = window.innerHeight/10;
		background(randomBGhue, sat, light);
		//background(randomBGhue+rotationX/2, sat, light);
		fill(randomTXThue, sat, light);
		textSize(fontSIZE);
		stroke(25);
		strokeWeight(3);
		text(peopleArray[randomPerson],window.innerWidth/2,window.innerHeight/6);		//display text randomPerson
		text(focusArray[randomFocus],window.innerWidth/2,window.innerHeight/6*5); 		//display randomFocus


	
	//background(177);											//background - remove once random is set up

	//textAlign(CENTER, CENTER);			//text alignment
	//textSize(fontSIZE);		//text size
	//strokeWeight(window.innerWidth/120);

	//text(peopleArray[randomPerson],window.innerWidth/2,window.innerHeight/6);		//display text randomPerson
	//text(focusArray[randomFocus],window.innerWidth/2,window.innerHeight/6*5);		//display randomFocus
	
	//background to start


	
	//start video section
	
	if (videoIN.width >= window.innerWidth && window.innerWidth>=window.innerHeight)
		{
			image(videoIN,
				  	videoIN.width/2 - window.innerWidth/2,      	//source x
					videoIN.height/2 - window.innerHeight/6,		//source y
				  	window.innerWidth,								//destination width
				  	window.innerHeight/3,							//destination height
				  	0,												//destination x
				  	window.innerHeight/3,							//destination y
				  	window.innerWidth,								//source width
				  	window.innerHeight/3);							//source height

					//print("video wider than horizontoal window");
			
			//video wider than horizontoal window
		} 
	
		if (videoIN.width >= window.innerWidth && window.innerWidth>=window.innerHeight)
		{
			image(videoIN,
				  	videoIN.width/2 - window.innerWidth/2,      	//source x
					videoIN.height/2 - window.innerHeight/6,		//source y
				  	window.innerWidth,								//destination width
				  	window.innerHeight/3,							//destination height
				  	0,												//destination x
				  	window.innerHeight/3,							//destination y
				  	window.innerWidth,								//source width
				  	window.innerHeight/3);
			
					//print("video wider than vertical window");
			//source height
			//video wider than vertical window
		} 
	
	if (videoIN.width <= window.innerWidth && window.innerWidth>=window.innerHeight)
		{	
			image(videoIN, 0, window.innerHeight/3, videoIN.width, window.innerHeight/3, window.innerWidth/2-videoIN.width/2, window.innerHeight/3, videoIN.width, window.innerHeight/3);
			
			//print("video narrower than horizontal window")
		} //video narrower than horizontal window
	
	if (videoIN.width <= window.innerWidth && window.innerWidth<window.innerHeight) //phone height
		{	
					//ellipse(1,1,199,199);
					//image(videoIN, 0, 0, 100, 100);
					image(videoIN,
				  	videoIN.width/4,  								//source y
					videoIN.height*5/12,							//source y
				  	window.innerWidth/2,							//source width
				  	window.innerHeight/6,							//source height
				  	0,												//destination x
				  	window.innerHeight/3,							//destination y
				  	window.innerWidth/2*2,								//destination width
				  	window.innerHeight/6*2);							//destination height
			//print("video narrower than vertical window")
			//video narrower than vertical window
		}
// end video section
		
	if (seconds == 0)	//one-minute timer
		{randomPerson = Math.floor(Math.random()*peopleArray.length); //random person
		 randomFocus = Math.floor(Math.random()*focusArray.length);//random focus}
		 randomBGhue = random(0,100);
		 randomTXThue = random(0,100);
			r = random([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
			if (r == 0) {selectedSound0.play();}
			if (r == 1) {selectedSound1.play();}
			if (r == 2) {selectedSound2.play();}
			if (r == 3) {selectedSound3.play();}
			if (r == 4) {selectedSound4.play();}
			if (r == 5) {selectedSound5.play();}
			if (r == 6) {selectedSound6.play();}
			if (r == 7) {selectedSound7.play();}
			if (r == 8) {selectedSound8.play();}
			if (r == 9) {selectedSound9.play();}

		 //mySound.play();

		}
	}
}

function mousePressed() {
  	if (openbutton == 1){
	saveCanvas("Frame it UP - " + peopleArray[randomPerson]+"'s " + focusArray[randomFocus], "png");
	r = random([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
	//print(r);
	randomFocus = Math.floor(Math.random()*focusArray.length);
	
	if (r == 0) {selectedSound0.play();}
	if (r == 1) {selectedSound1.play();}
	if (r == 2) {selectedSound2.play();}
	if (r == 3) {selectedSound3.play();}
	if (r == 4) {selectedSound4.play();}
	if (r == 5) {selectedSound5.play();}
	if (r == 6) {selectedSound6.play();}
	if (r == 7) {selectedSound7.play();}
	if (r == 8) {selectedSound8.play();}
	if (r == 9) {selectedSound9.play();}}
	
	//saveFrames("out", "png", 1, 1);
}


function windowResized() 
{
  resizeCanvas(windowWidth, windowHeight);		//resize canvas function
}