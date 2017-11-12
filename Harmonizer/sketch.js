//<<<<<<<<<<<<<HARMONIZER>>>>>>>>>>>>>>>>>>>v0.0.1
//An interactive audible tone and interval reference.
//Finlay Braithwaite - 2017
//As part of Experiment 3 for DIGF6037, Creation & Computation, OCAD University.
//Serial Connection Code modified from course example code by Nicholas Puckett and Kate Hartman.
//Equal intonation calculations sourced from 'Equal temperaments as mathematical series' by John S. Allen - http://www.bikexprt.com/tunings/tunings0.htm
//Just intonation calculations sourced from 'Scales: Just vs Equal Temperament' by Bryan H. Suits - https://pages.mtu.edu/~suits/scales.html

var serial;//variable to hold the serial port object
var serialStatus = 0//turns to 1 once serial connection is confirms, a value of 1 starts the oscillators.
var ardVal = [8];  //array that will hold all values coming from arduino
var jitterFree = [8]	//this variable is a lower resolution calculation of the potentiometers. Calculate in the draw function, the intetio is to reduce the jitter in potentiometers.
var root = 344;		//this is a starting value for the root frequency of which all intervals are based. Sweepable with pot[7]
var Osc0, Osc1, Osc2, Osc3; //the four oscillators
var pitchLO = 100;			//lower limit for root frequency.
var pitchHI = 2000;			//upper limit for root frequency.
var page0, page1, page2, page3, page4, page5;	//the six paramter pages. One for each oscillator, an effect page, and a global page.
var pagePot;	//the value that selects the current page.
var filters = ['lowpass', 'highpass', 'bandpass']; //the filter modes that can be called in P5.sound.
var filterMode; //the current filter mode state
var SelectedScale; //selects either just or equal intonation.
var filterSelector; //for selecting filters
var FilterFreqVal;	//frequency value for filter
var latchValue = 40; //for latchKnob function, sets the width to catch and control the intended value.
var justScale = [1, 25/24, 9/8, 6/5, 5/4, 4/3, 45/32, 3/2, 8/5, 5/3, 9/5, 15/8, 2]; //calculation of just intonation. Each interval is a simple ratio to the root.
var equalScale = [1, Math.pow(2, 1/12), Math.pow(2, 2/12), Math.pow(2, 1/4), Math.pow(2, 1/3), Math.pow(2, 5/12), Math.pow(2, 1/2), Math.pow(2, 7/12), Math.pow(2, 2/3), Math.pow(2, 3/4), Math.pow(2, 5/6), Math.pow(2, 11/12), 2];//calculation of equal intonation. Each jump from semitone to semitone is a calculated exponential increment.
var scaleLang = ['Unison', 'Minor\nSecond', 'Major\nSecond', 'Minor\nThird', 'Major\nThird', 'Fourth', 'Diminished\nFifth', 'Fifth', 'Minor\n Sixth', 'Major\nSixth', 'Minor\nSeventh', 'Major\nSeventh', 'Octave']//names of intervals, for GUI display
var textCALCsize;//calculates text size, based on overall pixel count of canvas.
var gL = 50;//global colour lightness value for GUI elements
var gS = 75;//global colour saturation value for GUI elements
var scaleName = 'just'//name of intonation for GUI text.
var filterTextVal = 'lowpass'//name of filter mode for GUI text.
//
//

function setup()
	{
	//Setting up the serial port//
  		serial = new p5.SerialPort();     //create the serial port object
  		serial.open('/dev/cu.usbmodemFA131'); //open the serialport. determined 
  		serial.on('open', ardCon);         //open the socket connection and execute the ardCon callback
  		serial.on('data', dataReceived);   //when data is received execute the dataReceived function
		createCanvas(windowWidth, windowHeight); //create canvas
		colorMode(HSL, 100);				//setting colour mode to Hue, Saturation, Lightness with max values of 100
		
		pagePot = 0;						//app starts on page 0 - Osc0.

		Osc0 = new p5.Oscillator();			//create four new oscillators p5.sound Oscillator function.
		Osc1 = new p5.Oscillator();
		Osc2 = new p5.Oscillator();
		Osc3 = new p5.Oscillator();
				
		page0 = new page();					//create 5 pages with my page fuction.
		page1 = new page();
		page2 = new page();
		page3 = new page();
		page4 = new page();
		page5 = new page();
		//
		SelectedScale = justScale;			//app starts off in just intonation mode.

		page0.pot1 = 50;					//initial values of pot1 for all pages
		page1.pot1 = 50;
		page2.pot1 = 50;
		page3.pot1 = 50;
		page4.pot1 = 50;
		page5.pot1 = 50;		
		
		page0.pot2 = 25;					//initial values of pot2 for all pages
		page1.pot2 = 400;
		page2.pot2 = 600;
		page3.pot2 = 800;
		page4.pot2 = 200;
		page5.pot2 = 900;		
		
		page0.interval = Math.floor(map(page0.pot2, 0, 1023, 0, 12));	//initial calculation of intervals.
		page1.interval = Math.floor(map(page1.pot2, 0, 1023, 0, 12));
		page2.interval = Math.floor(map(page2.pot2, 0, 1023, 0, 12));
		page3.interval = Math.floor(map(page3.pot2, 0, 1023, 0, 12));
		
		Osc0.freq(root * SelectedScale[page0.interval]);				//initial calculation of oscillator frequencies, based on root & intervals.
		Osc1.freq(root * SelectedScale[page1.interval]);
		Osc2.freq(root * SelectedScale[page2.interval]);
		Osc3.freq(root * SelectedScale[page3.interval]);
		
		page0.pot3 = 100;	//initial values of pot3 for all pages
		page1.pot3 = 100;
		page2.pot3 = 100;
		page3.pot3 = 100;
		page4.pot3 = 100;
		page5.pot3 = 100;
		
		page0.pot4 = 666;	////initial values of pot1 for all pages
		page1.pot4 = 50;
		page2.pot4 = 50;
		page3.pot4 = 50;
		page4.pot4 = 50;
		page5.pot4 = 50;
		
		Osc0.amp(map(page0.pot4, 0, 1023, 0, .50));			//initial calculations of oscillator amplitude - volume, for each oscillator
		Osc1.amp(map(page1.pot4, 0, 1023, 0, .50));
		Osc2.amp(map(page2.pot4, 0, 1023, 0, .50));
		Osc3.amp(map(page3.pot4, 0, 1023, 0, .50));

		filter0 = new p5.BandPass();					//creates new filter in bandpass mode
		filterMode = filters[0];						//sets initial mode to lowpass. Redundant......
		FilterFreqVal = Math.floor(map(page4.pot2, 0, 1023, 0, 10000)); //calculation of initial filter frequency
		filter0.freq(FilterFreqVal);					//sets initial filter frequency value using above calculation.
		//filterResVal = map(page4.pot3, 0, 1023, 0.001, 1000);
		//filter0.res(filterResVal);
		
		page0.pot5 = 512;	//initial values of pot5 for all pages
		page1.pot5 = 512;
		page2.pot5 = 512;
		page3.pot5 = 512;
		page4.pot5 = 512;
		page5.pot5 = 512;
		
		Osc0.pan(map(page0.pot5, 0, 1023, -1, 1)); //calculates and sets initial pan for oscillators.
		Osc1.pan(map(page1.pot5, 0, 1023, -1, 1));
		Osc2.pan(map(page2.pot5, 0, 1023, -1, 1));
		Osc3.pan(map(page3.pot5, 0, 1023, -1, 1));
		
		Osc0.disconnect();	//disconnects oscillators from output, so they can be connected through filter instead.
		Osc1.disconnect();
		Osc2.disconnect();
		Osc3.disconnect();
		
		Osc0.connect(filter0);	//connects oscillators to filter
		Osc1.connect(filter0);
		Osc2.connect(filter0);
		Osc3.connect(filter0);
		
		page0.HUE = 10			//sets hue of pages
		page1.HUE = 30
		page2.HUE = 50
		page3.HUE = 70
		page4.HUE = 90
		page5.HUE = 100
		
		
//		Osc0.start();
//		Osc1.start();
//		Osc2.start();
//		Osc3.start();
			}

function page()
	{
		this.pot1 = ardVal[1];
		this.pot2 = ardVal[2];
		this.pot3 = ardVal[3];
		this.pot4 = ardVal[4];
		this.pot5 = ardVal[5];
		this.pot6 = ardVal[6];
		this.interval = 4;
		this.HUE = 100
	}



function draw()
	{
		root = Math.floor(map(ardVal[7], 0, 1023, pitchLO, pitchHI)); //calculation of root frequency from pot[7] mapped between pitchLO and pitchHI.
		jitterFree = [(Math.floor(ardVal[0]/8))*8, (Math.floor(ardVal[1]/8))*8, (Math.floor(ardVal[2]/8))*8, (Math.floor(ardVal[3]/8))*8, (Math.floor(ardVal[4]/8))*8, (Math.floor(ardVal[5]/8))*8, (Math.floor(ardVal[6]/8))*8, (Math.floor(ardVal[7]/8))*8]//the idea of this was to reduce the resolution of the potentiometers by a factor of 8. This helped, but I feel the problem would have been better addressed from an electronics noise perspective.
		
		//root = latchKnob(root, mouseX);
		pagePot = Math.floor(map(jitterFree[0], 0, 1024, 0, 6));	//selects pages. There are only 6 pages, but wanted a range that made selecting the fourth page possible. The out-of-reach value of 1024 would reach the invalid page 7.
		//pagePot = Math.floor(map(jitterFree[0], 0, 1024, 0, 5));
		
		pageSelector(pagePot);//feeds the pagePot variable to pageSelector
		
		GlobalFreqShift();//loads a function that applies potientiometer 8 to all four oscillators. In the draw function so that it is accessible regardless of page.


		
		textCALCsize = window.innerWidth*window.innerHeight/7000; //text-size referenced against overall pixel count.
		
		if(serialStatus == 1) //starts the oscillators only when serial connection is established. serialStatus is tied to ardCon function.
			{
				Osc0.start();
				Osc1.start();
				Osc2.start();
				Osc3.start();
				serialStatus = 2; //makes this a one-time deal.
			}
		


	}

function GlobalFreqShift()	//passes values to set frequency for all oscillators.
	{
		OscXFreq(Osc0, page0);
		OscXFreq(Osc1, page1);
		OscXFreq(Osc2, page2);
		OscXFreq(Osc3, page3);
	}

function OscXFreq($, $$)	//sets frequencies for all oscillators.	
	{
		$.freq(root * SelectedScale[$$.interval]);
		//console.log('page: ', page, 'SelectedScale: ', SelectedScale);
	}

function pageSelector(page) //takes jitter-free version of pot[0] and uses it to select the current page. Selecting a page, calls for a function.
	{
		if (page == 0) 
		{
			OscXPage(Osc0, page0);
		}
		
		if (page == 1) 
		{
			OscXPage(Osc1, page1);
		}
				
		if (page == 2) 
		{
			OscXPage(Osc2, page2);
		}	
			
		if (page == 3) 
		{
			OscXPage(Osc3, page3);
		}
		
		if (page == 4) 
		{
			filterPage(filter0, page4);
		}
				
		if (page == 5) 
		{
			globalPage(gL, page5);
		}
		
		//console.log(page5.pot1, 'page: ', page, 'SelecedScale', SelectedScale);
	}

function OscXPage($, $$) //pageSelector passes oscillator and page numbers to each oscillator page. From there the following functions are called to control each page's specific oscillator.
	{
		//OscXOnOff($, $$);
		OscXPageFreq($, $$);
		OscXtype($, $$);
		OscXamp($, $$);
		OscXpan($, $$);
		PageDraw($, $$);
		OscxPageDraw($, $$);
		universalText($, $$);


		//console.log('page info: ', $$, 'osc info: ', $);
	}

function PageDraw($, $$) //GUI drawing of background for all pages. GUI layout of rectangles reflects relative physical positions of pots on interface. Pages have a uniform hue, but varying lightness in cells. This function accepts page values to match to corresponding page.HUE values. All shapes are proportional to canvas size.
	{
		fill($$.HUE, gS, 55);
		rect(0, 0, windowWidth*1/5, windowHeight);
		fill($$.HUE, gS, 33);
		rect(windowWidth*1/5, 0, windowWidth/5, windowHeight/2);
		fill($$.HUE, gS, 55);
		rect(windowWidth*2/5, 0, windowWidth/5, windowHeight/2);
		fill($$.HUE, gS, 33);
		rect(windowWidth*3/5, 0, windowWidth/5, windowHeight/2);
		fill($$.HUE, gS, 44);
		rect(windowWidth*1/5, windowHeight/2, windowWidth/5, windowHeight/2);
		fill($$.HUE, gS, 34);
		rect(windowWidth*2/5, windowHeight/2, windowWidth/5, windowHeight/2);
		fill($$.HUE, gS, 22);
		rect(windowWidth*3/5, windowHeight/2, windowWidth/5, windowHeight/2);
		fill($$.HUE, gS, 33);
		rect(windowWidth*4/5, 0, windowWidth/5, windowHeight);
		textAlign(CENTER, CENTER)	
	}

function universalText($, $$) //GUI text for page selector and root note control (left and right). All text is proportional to overall pixel count in canvas as per textCALCsize.

		{
		fill(100);
		textSize(textCALCsize/2);
		text('page', windowWidth*1/10, windowHeight*1/4);
		
		textSize(textCALCsize);
		text(pagePot+1, windowWidth*1/10, windowHeight*3/4);
		
		textSize(textCALCsize);
		text('#', windowWidth*9/10, windowHeight*3/4);
		textSize(textCALCsize/2);
		text(root+"Hz", windowWidth*9/10, windowHeight*1/4);
		
		}

function OscxPageDraw($, $$) // draws GUI centre section text for all oscillator pages.
	{

		fill(100)
		//
		
		
		textSize(textCALCsize/2)
		text('int', windowWidth*5/10, windowHeight*1/8);
		textSize(textCALCsize/2.5)

		text(scaleLang[Math.floor(map($$.pot2, 0, 1024, 0, 13))], windowWidth*5/10, windowHeight*3/8);
		
		textSize(textCALCsize/2.8)
		text('waveform', windowWidth*7/10, windowHeight*1/8);
		textSize(textCALCsize/2.5)
		text($.getType(), windowWidth*7/10, windowHeight*3/8);
		
		textSize(textCALCsize/2)
		text('volume', windowWidth*3/10, windowHeight*5/8);
		text(Math.floor(map($$.pot4, 0, 1023, 0, 100)), windowWidth*3/10, windowHeight*7/8);		
		
		textSize(textCALCsize/2)
		text('pan', windowWidth*5/10, windowHeight*5/8);
		text(Math.floor(map($$.pot5, 0, 1023, -100, 100)), windowWidth*5/10, windowHeight*7/8);
		
		

		

		
		
		


	}

//function OscXOnOff($, $$)// switch to turn oscillators on and off. Not necessary with existing oscillator amplitude control
//	
//	{
//		$$.pot2 = latchKnob($$.pot2, jitterFree[1]);
//		
//		if($$.pot2 <= 512 && $.started == false)
//			{
//				$.start();
//				$.started = true;
//				//print('$.starting');
//			}
//		if($$.pot2 > 512 && $.started == true)
//			{
//				
//				$.stop();
//				$.started = false;
//				//print('$.stopping');
//			}
//	}

function OscXPageFreq($, $$) //using latchKnob principle, pot2 on each oscillator page controls pitch for that page's oscillator.
	{
		//$.freq(root * SelectedScale[$$.interval]);
		$$.pot2 = latchKnob($$.pot2, jitterFree[2]);
		$$.interval = Math.floor(map($$.pot2, 0, 1024, 0, 13));

	}
function OscXtype($, $$) //pot3 on oscillator pages controls the waveform type for each oscillator. 
	{
		waveforms = ['sine', 'triangle', 'sawtooth', 'square'];
		$$.pot3 = latchKnob($$.pot3, jitterFree[3]);
		waveSelector = Math.floor(map($$.pot3, 0, 1024, 0, 4)); //this comes up a lot. The pot value goes from 0 to 1023. I only have four valid waveforms. However, if I set a map to 0, 3 against 0, 1023, I never reach the last value, in this case 'square'. So I increase the input and output ranges by one so that a value I never input reaches a value that doesn't exist.
		//waveSelector = Math.floor(map(mouseX, 0, windowWidth, 0, 4));
		//print(waveSelector);
		
		if (waveSelector == 0 && $.getType() !== 'sine') //in selecting a waveform for an oscillator, I have each oscillator stop and start. In between, the waveform changes.
			{
				$.stop();
				$.setType(waveforms[waveSelector]);
				$.start();
			}
		
		if (waveSelector == 1 && $.getType() !== 'triangle')
			{
				$.stop();
				$.setType(waveforms[waveSelector]);
				$.start();
			}
		
		if (waveSelector == 2 && $.getType() !== 'sawtooth')
			{
				$.stop();
				$.setType(waveforms[waveSelector]);
				$.start();
			}
		
		if (waveSelector == 3 && $.getType() !== 'square')
			{
				$.stop();
				$.setType(waveforms[waveSelector]);
				$.start();
			}
		
	}

function OscXamp($, $$) //pot4 on oscillator pages controls the amplitude - volume for each oscillator. 
	{
		$$.pot4 = latchKnob($$.pot4, jitterFree[4]);
		$.amp(map($$.pot4, 0, 1023, 0, .50));
	}

function OscXpan($, $$) //pot5 on oscillator pages controls the pan for each oscillator.
	{
		$$.pot5 = latchKnob($$.pot5, jitterFree[5]);
		$.pan(map($$.pot5, 0, 1023, -1, 1));
	}

function latchKnob(value, input) //This is something I'm most proud of creating for this project. It makes the dynamic switching of pages possible. Without this, all parameters on a page would snap to the current potentiometer values when the page is loaded. With latchKnob, the potentiometers need to move through the current value before it takes control of the value. latchValue is an absolute (+ or -) range that widens the function's parameters. 
	{
		if (Math.abs(value - input) < latchValue)
			{
				return input;
			}
		else
			{
				return value;
			}
	}

function filterPage($, $$) //pageSelector passes filter and page numbers to the filter page. From there the following functions are called to control the filter.
	{
		filterType($, $$);
		filterFreq($, $$);
		PageDraw($, $$);
		universalText($, $$);
		filterText($, $$, filterText);
		
		//console.log('page info: ', $$, 'filter info: ', $);
		//filterRes($, $$);
		
	}

function filterText($, $$) // draws GUI text specific to the filter page.
	{
		textSize(textCALCsize/3)
		text('filter type', windowWidth*3/10, windowHeight*1/8);
		textSize(textCALCsize/3)
		text(filterTextVal, windowWidth*3/10, windowHeight*3/8);
		
		textSize(textCALCsize/3)
		text('filter freq', windowWidth*5/10, windowHeight*1/8);
		textSize(textCALCsize/3)
		text(FilterFreqVal+"Hz", windowWidth*5/10, windowHeight*3/8);
	}

function filterType($, $$)	//uses the filter page's pot1 to select the filter type.
	{
		
		$$.pot1 = latchKnob($$.pot1, jitterFree[1]);
		filterSelector = Math.floor(map($$.pot1, 0, 1024, 0, 3));
		//waveSelector = Math.floor(map(mouseX, 0, windowWidth, 0, 4));
		//print(waveSelector);
		
		if (filterSelector == 0 && filterMode !== filters[0])
			{
				$.setType(filters[filterSelector]);
				filterMode = filters[0];
				filterTextVal = 'lowpass';
			}
		
		if (filterSelector == 1 && filterMode !== filters[1])
			{
				$.setType(filters[filterSelector]);
				filterMode = filters[1];
				filterTextVal = 'highpass';
			}
		
		if (filterSelector == 2 && filterMode !== filters[2])
			{
				$.setType(filters[filterSelector]);
				filterMode = filters[2];
				filterTextVal = 'bandpass';
			}

	}

function filterFreq($, $$) // uses the filter page's pot 2 to select a filter frequency.
	{
		$$.pot2 = latchKnob($$.pot2, jitterFree[2]);
		FilterFreqVal = Math.floor(map($$.pot2, 0, 1023, 0, 10000));
		$.freq(FilterFreqVal);
	}

//function filterRes($, $$) //uses the filter page's pot3 to control a filter's resonance. Something about this was ruing the sound output, so it's deactivated pending further debugging.
//	{
//		$$.pot3 = latchKnob($$.pot3, jitterFree[3]);
//		filterResVal = map($$.pot3, 0, 1023, 0.001, 1000);
//		$.res(filterResVal);
//	}

function globalPage($, $$) //sets the parameters for the global page. Currently this only selects global intonatino of intervals. More parameters to come in future version.
	{
		PageDraw($, $$);
		universalText($, $$);
		globalText($, $$, scaleName);
		$$.pot1 = latchKnob($$.pot1, jitterFree[1]);
		if ($$.pot1 <= 512 && SelectedScale == equalScale)
			{
				SelectedScale = justScale;
				scaleName = 'just';
			}
		if ($$.pot1 > 512 && SelectedScale == justScale)
			{
				SelectedScale = equalScale;
				scaleName = 'equal';
			}
	}

function globalText ($, $$, $$$)	//draws GUI text for global page.
	{
		textSize(textCALCsize/3);
		text('intonation', windowWidth*3/10, windowHeight*1/8);
		textSize(textCALCsize/2);
		text($$$, windowWidth*3/10, windowHeight*3/8);
	}




function dataReceived()   //this function is called every time data is received
	{
		var rawData = serial.readStringUntil('\r\n'); //read the incoming string until it sees a newline
    	
		if(rawData.length>1)                      //check that there is something in the string
    		{                                         //values received in pairs  index,value
      			var incoming = rawData.split(',');      //split the string into components using the comma as a delimiter
      			for(var i=0;i<incoming.length;i++)
      				{
      					ardVal[i]=parseInt(incoming[i]);        //convert the values to ints and put them into the ardVal array
      				}
    		}
	}

function ardCon() //called when serial connection is confirmed. Serial status used to start oscillators.
	{
  		console.log('connected to the arduino');
		serialStatus = 1;
	}


function windowResized() 
	{
  		resizeCanvas(windowWidth, windowHeight);
	}
