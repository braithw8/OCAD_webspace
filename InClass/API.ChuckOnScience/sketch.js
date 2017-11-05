/*
* Creation & Computation - Digital Futures, OCAD University
 * Kate Hartman / Nick Puckett
Uses the Chuck Norris API + P5.speech
http://ability.nyu.edu/p5.js-speech/
https://api.chucknorris.io/
possible voices: https://jsfiddle.net/api/mdn/
potential topics: https://api.chucknorris.io/jokes/categories

Modified by Finlay Braithwaite as part of an in-class workshop.
*/


var serial;          // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodemFA131';
var options = { baudrate: 9600}; // change the data rate to whatever you wish
var inData;                             // for incoming serial 
var chuckPITCH

//

var baseURL = 'https://api.chucknorris.io/jokes/random?category='
var topics = ["explicit","dev","movie","food","celebrity","science","political","sport","religion","animal","music","history","travel","career","money","fashion"] ;  
var tHeight = 180;
var sendURL;
var voiceOfChuck = new p5.Speech();




	



function setup()
{
  serial = new p5.SerialPort();       // make a new instance of the serialport library
  serial.on('list', printList);  // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing
  serial.list();                      // list the serial ports
  serial.open(portName, options);	
	
	
createCanvas(800,600);

textAlign(CENTER);
textSize(tHeight/2);
noStroke();
text("CLICK CHUCK",width/2,height/2+(tHeight/2))





}


function draw()
{


}

function enlightenME(knowledge)
{
console.log(knowledge.value);
//voiceOfChuck.setVoice('Bad News');
voiceOfChuck.setRate(1);
//chuckPITCH = floor(map(inData,0,255,0,3));		//FB - Was playing around with potentiometer also affecting pitch
//voiceOfChuck.setPitch(chuckPITCH);
voiceOfChuck.setPitch(1);
//print(chuckPITCH);
voiceOfChuck.speak(knowledge.value);
}


function mousePressed()
{

chuckDATA = floor(map(inData, 0, 255, 0, 15));	//FB - Kristy, I created this to take 0-255 inData (mapped in arduino from 0 to 1023) and map it to 0 to 
//chuckDATA = floor(map(inData, 0, 255, 0, topics.length));	//FB - I think topics.length would respond to the length of your array. Untested.
background(255);
var rTopic = topics[chuckDATA]; //FB - Kristy, this is the connection of the pot mapping to the array.
sendURL = baseURL + rTopic;
textSize(tHeight);
text(rTopic,width/2,height/2+(tHeight/2))	
loadJSON(sendURL,enlightenME);

}

function serverConnected() {
  print('connected to server.');
}
 
function portOpen() {
  print('the serial port opened.')
}
 
function serialEvent() {
  inData = Number(serial.read());
}

 
function serialError(err) {
  print('Something went wrong with the serial port. ' + err);
}
 
function portClose() {
  print('The serial port closed.');
}
 
// get the list of ports:
function printList(portList) {
 // portList is an array of serial port names
 for (var i = 0; i < portList.length; i++) {
 // Display the list the console:
 print(i + " " + portList[i]);
 }
}



