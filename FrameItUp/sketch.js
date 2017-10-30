var openbutton = 0 //switch between loading page and game states
var sat = 75 // global colour saturation
var light = 50 // global colour lightness
var peopleArray = [	//people array
		'Jad',
		'Roxanne B',
		'Kristy',
		'Finlay',
		'Emma',
		'Ramona',
		'Kylie',
		'Karo',
		//'Dave',		//absent
		'Sean',
		'Kate',
		'Roxanne H',
		'Max',
		'Chris',
		'Emilia',
		//'Margot',		//absent
		'Nick',
		'Quinn',
		'Yiyi',
		'Sana',
		'Savaya',
		'Dikla',
		'Tommy',
		'Feng'
		];
var randomPerson;	//random person variable
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
var randomFocus; // random focus variable

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

var textCALCsize; // font size variable
var randomBGhue;	//random background colour
var date;		// clock
var seconds;	// seconds of clock
var randomTXThue;	//random text colours
var randomTXThue1;	//multiple text colours for multiple lines of text in loading page
var randomTXThue2;
var randomTXThue3;
var randomTXThue4;
var randomTXThue5;
var randomTXThue6;
var randomBUTTONhue; //random button colour for loading page


var r = 0		//resuesable variable for randomness

function preload() {		//preload sound assets
  
	soundFormats('mp3', 'ogg');
	randomSound0 = Math.floor(Math.random()*soundArray.length); //call for random sound from sound array
	randomSound1 = Math.floor(Math.random()*soundArray.length);	
	randomSound2 = Math.floor(Math.random()*soundArray.length);
	randomSound3 = Math.floor(Math.random()*soundArray.length);
	randomSound4 = Math.floor(Math.random()*soundArray.length);
	randomSound5 = Math.floor(Math.random()*soundArray.length);
	randomSound6 = Math.floor(Math.random()*soundArray.length);
	randomSound7 = Math.floor(Math.random()*soundArray.length);
	randomSound8 = Math.floor(Math.random()*soundArray.length);
	randomSound9 = Math.floor(Math.random()*soundArray.length);
	//10 random sounds selected per user, to then be loaded as 'selectedSounds'

	selectedSound0 = loadSound(soundArray[randomSound0]);	//loading of previously randomly selected sounds
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
	//play mode so that repeating a sound, interrupts the previous iteration. The random calls in the code make this necessary that one sound does not awkwardly double up. However, that is still possible if two 'randomSounds' point to the same asset. This odds of this are minimized by the number (51) of available sound assets.

}		// end of preload
function setup() {
		createCanvas(windowWidth, windowHeight); //create canvas
		colorMode(HSL,100);	//change colour mode to Hue, Saturation, and Lightness with max values of 100

		randomTXThue1 = random(0,100); 	//defining static random colours for loading page text
		randomTXThue2 = random(0,100);	//each line is a different colour
		randomTXThue3 = random(0,100);
		randomTXThue4 = random(0,100);
		randomTXThue5 = random(0,100);
		randomTXThue6 = random(0,100);	
		randomBUTTONhue = random(0,100);

		textAlign(CENTER, CENTER);			//text alignment
		randomBGhue = random(0,100); //random background colour for initial game state
		randomTXThue = random(0,100); ////random text colour for iniital game state

		randomPerson = Math.floor(Math.random()*peopleArray.length); //random person for initial game state
		randomFocus = Math.floor(Math.random()*focusArray.length);//random focus for initial game state

		videoIN = createCapture({				//initialize video capture as videoIN
    		audio: false,						//no audio
    		video: {							//video constraints
			//facingMode: {exact: "environment"}, //selecting camera in mobile
			maxFrameRate: 10					//lowered frame rate
    		}
  			}
			);
		videoIN.hide();						//hide videoIN, to be implemented in draw.
}	// end of setup
		
function draw(){
	textCALCsize = window.innerWidth*window.innerHeight/7000;	// proportional textSize
	strokeCALC = window.innerWidth*window.innerHeight/160000;   // proportional strokeWidth
	difference = Math.abs(randomTXThue1 - randomTXThue2);
	//calculates absolute difference between background and text colours
		if (difference < 19 || difference > 81) {randomTXThue2 = random(0,100);}
		//enforces difference in background and text colours
	difference = Math.abs(randomTXThue2 - randomTXThue3); //repeat for all colours in loading page
		if (difference < 19 || difference > 81) {randomTXThue3 = random(0,100);}
	difference = Math.abs(randomTXThue3 - randomTXThue4);
		if (difference < 19 || difference > 81) {randomTXThue4 = random(0,100);}
	difference = Math.abs(randomTXThue4 - randomTXThue5);
		if (difference < 19 || difference > 81) {randomTXThue5 = random(0,100);}
	difference = Math.abs(randomTXThue5 - randomTXThue6);
		if (difference < 19 || difference > 81) {randomTXThue6 = random(0,100);}
	difference = Math.abs(randomTXThue6 - randomBUTTONhue);
		if (difference < 19 || difference > 81) {randomBUTTONhue = random(0,100);}


	if (openbutton == 0)  //loading page state
		{
			background(15);
			noStroke();
			textSize(textCALCsize);
			fill(randomTXThue1, sat, light);
			text('Frame It Up!',window.innerWidth/2,window.innerHeight/8);
			textSize(textCALCsize/2);
			fill(randomTXThue2, sat, light);		
			text('Find the person',window.innerWidth/2,window.innerHeight/10*3);	
			fill(randomTXThue3, sat, light);		
			text('Ask them to perform',window.innerWidth/2,window.innerHeight/10*4);
			fill(randomTXThue4, sat, light);		
			text('Frame It Up!',window.innerWidth/2,window.innerHeight/10*5);		
			fill(randomTXThue5, sat, light);		
			text('Click to take a picture',window.innerWidth/2,window.innerHeight/10*6);
			
			stroke(25);
			strokeWeight(strokeCALC);
			fill(randomBUTTONhue, sat, light);
  			rect(windowWidth/2-textCALCsize*5/3, windowHeight/12*10-textCALCsize*3/4, textCALCsize*10/3, textCALCsize*6/4, textCALCsize/2, textCALCsize/2, textCALCsize/2, textCALCsize/2); 		//rectangular button to enter game state - proportional to textCALCsize :)
  			fill(randomTXThue6, sat, light);
  			textSize(textCALCsize);
			text('PLAY', windowWidth/2, windowHeight/12*10);
	
  if(mouseX>windowWidth/2-textCALCsize*5/3 && mouseX<windowWidth/2+textCALCsize*5/3 && mouseY>windowHeight/12*10-textCALCsize*3/4 && mouseY<windowHeight/12*10+textCALCsize*3/4 && mouseIsPressed) 	//if button is clicked - constrained to position of button - proportional to textCALCsize ;)
  		{
		openbutton=1;			//switch from loading state 0 to game state 1
			r = random([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);		//select a random number
			if (r == 0) {selectedSound0.play();}			//play the corresponding randomly loaded sound
			if (r == 1) {selectedSound1.play();}
			if (r == 2) {selectedSound2.play();}
			if (r == 3) {selectedSound3.play();}
			if (r == 4) {selectedSound4.play();}
			if (r == 5) {selectedSound5.play();}
			if (r == 6) {selectedSound6.play();}
			if (r == 7) {selectedSound7.play();}
			if (r == 8) {selectedSound8.play();}
			if (r == 9) {selectedSound9.play();}
			r = random([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);		//2nd layered sound on button click
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
			r = random([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);		//third layered sound on button click
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
		} 			//end of button statement
		}			//end of loading page state
	
	if (openbutton == 1) //game state	
		{
		var difference = Math.abs(randomBGhue - randomTXThue); //calculates absolute difference between background and text colours
		if (difference < 20 || difference > 80) {randomTXThue = random(0,100);} //enforces difference in background and text colours in game state
		
		date = new Date();		//calculate Date
		seconds = date.getSeconds();	//seconds of date
		background(randomBGhue, sat, light);	//background using random colour and global saturation and lightness
		fill(randomTXThue, sat, light); //fill using random colour and global saturation and lightness
		textSize(textCALCsize);	//text size
		stroke(25);
		strokeWeight(strokeCALC);	//stroke weight
		text(peopleArray[randomPerson],window.innerWidth/2,window.innerHeight/6);		//display text randomPerson
		text(focusArray[randomFocus],window.innerWidth/2,window.innerHeight/6*5); 		//display randomFocus

	//start video section
	
	if (videoIN.width >= window.innerWidth && window.innerWidth >= window.innerHeight)
		//four video display possibilities depending on source video and canvas size.
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

					//print("video wider than horizontal window");
			
		} 
	
		if (videoIN.width >= window.innerWidth && window.innerWidth < window.innerHeight)
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
		} 
	
	if (videoIN.width < window.innerWidth && window.innerWidth >= window.innerHeight)
		{	
			image(videoIN, 0, window.innerHeight/3, videoIN.width, window.innerHeight/3, window.innerWidth/2-videoIN.width/2, window.innerHeight/3, videoIN.width, window.innerHeight/3);
			
			//print("video narrower than horizontal window");
		} 
	
	if (videoIN.width < window.innerWidth && window.innerWidth < window.innerHeight)
		{	
					image(videoIN,
				  	videoIN.width/4,  								//source y
					videoIN.height*5/12,							//source y
				  	window.innerWidth/2,							//source width
				  	window.innerHeight/6,							//source height
				  	0,												//destination x
				  	window.innerHeight/3,							//destination y
				  	window.innerWidth,								//destination width
				  	window.innerHeight/6*2);						//destination height
			//print("video narrower than vertical window");
		}
// end video section
		
	if (seconds == 0)	//one-minute timer to switch random name and prompt. Note: depending on machine, a different number of frames happen within the 0 second window.
		{randomPerson = Math.floor(Math.random()*peopleArray.length); //random person
		 randomFocus = Math.floor(Math.random()*focusArray.length);//random focus}
		 randomBGhue = random(0,100);		//new background colour
		 randomTXThue = random(0,100);		//new text colour
			r = random([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);	//play a random sound
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

		}
	}
}

function mousePressed() {	//save canvas to named PNG file. Fileame is 'name' and 'focus'.
  	if (openbutton == 1){
	saveCanvas("Frame it UP - " + peopleArray[randomPerson]+"'s " + focusArray[randomFocus], "png");
	r = random([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
	randomFocus = Math.floor(Math.random()*focusArray.length); //sound plays for click
	
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
	
}


function windowResized() 
{
  resizeCanvas(windowWidth, windowHeight);		//resize canvas function
}