/* An entry for the JS1k competition
   See http://js1kpiano.appspot.com for more info about how this
   works (or doesn't if you're using Chrome or IE ;-)
   (c) Menboku Ltd 2010 - http://www.menboku.co.uk
   Licenced under GPL v2 - http://www.gnu.org/licenses/gpl-2.0.html

   This code is full of commented out sections, some of these are
   holdovers from abandoned ideas, sub-optimal code that may be useful
   for understanding what's going on, etc.
*/



var q = 16; /* used for: converting integer to hex form
                         check for when to clear the canvas
                         array size */

/* These header vars are for illustrative/documentation purposes,
   mostly to show how the WAVs are constructed.  */



var MONO = 1;
var STEREO = 2;
var CHANNEL_COUNT = STEREO;

var BYTES_PER_SAMPLE = 2 * CHANNEL_COUNT;
var BITS_PER_SAMPLE = 16;

// var SAMPLE_RATE = 8000; /* 1f40, hex 40=@ */
// var NUM_SAMPLES = 5000; /* 13 88 - too short for Firefox 3.6.8 on Windows */

var SAMPLE_RATE = 44100 /* 0x0000ac44, hex 44=D */
/* 44100 * 4 = 176,400 => 0x00 02 b1 10 */ 
var NUM_SAMPLES = 30000; /* 0x00007530 hex 75=u, hex 30=0 */
/* var NUM_SAMPLES = 40000; /* 0x00009c40, hex 40=@ */

var SAMPLE_SIZE = NUM_SAMPLES * BYTES_PER_SAMPLE;
/* that's 480,000 = 0x00075300 */
/* REALLY? 30000 * 4 = 120,000 = 0x0001b4a0 surely? */
/* 40000 * 4 = 160,000 = 0x0002 71 00, hex 71 = ASCII q*/

/* var NUM_SAMPLES = 80000; /* 00 01 38 80, hex 38= 8 */

/* We can't play the same player (note) more than once simultaneously, so create
   DUPE_NOTES duplicate <audio> elements for each note.
   DUPE_NOTES can be made bigger, but at the cost of memory and 
   maybe startup speed - 5 seems a reasonable tradeoff  */
var DUPE_NOTES = 5;

var note_count = 0;

/*var press_count=0; /* holdover from debugging */

function make_wav(freq) {
    // var angle_factor =  1273.2395447351628 / freq; /* 8000hz */
    var angle_factor = 7018.733 / freq; /* 441.khz, actually 7018.732990 */
    var decay = 1;
    /*var retval = wav_header(NUM_SAMPLES);*/
    var retval = "RIFF%c4%b4%01%00" + /* SAMPLE_SIZE + x24 */ /* TODO ASCIIfy if poss */
	"WAVEfmt%20" + 
	"%10%00%00%00" + /* length of this subchunk - never changes */
        "%01%00" +  /* 1 => uncompressed */
	"%02%00" + /* CHANNEL_COUNT */
	"D%ac%00%00" + /* SAMPLE_RATE */
	"%10%b1%02%00" + /* SAMPLE_RATE * BYTES_PER_SAMPLE*/
	"%04%00" + /* BYTES_SAMPLE */
	"%10%00" + /* BITS_PER_SAMPLE */
	"data%a0%b4%01%00"; /* SAMPLE_SIZE - TODO ASCIIfy if poss */

    for (var i=0; i<NUM_SAMPLES; i++) {
	var angle = i / angle_factor;


	// decay *= 0.9995; /* OK for 8000hz, too quick for 44.1khz */
	decay *= 0.9998; /* 44.1khz */

	var level = Math.sin(angle) * decay;

	/* 8 bit 'samples' - laggy on Windows FF 3.6.8
	var normalized = parseInt(level * 127) + 128;
	retval += "%" + (normalized<16?"0":"") + normalized.toString(16);
	*/

	/* 16 bit 'samples' */
	var normalized = parseInt(level * 32767);
	if (normalized<0) {
	    normalized=65536+normalized;
	}
	var high_byte = normalized >> 8;
	var low_byte = normalized & 255;
	for (var channel_loop=0; channel_loop<2; channel_loop++) {
	    /* output twice for each stereo channel */
	    retval += "%" + (low_byte<q?"0":"") + low_byte.toString(q) +
		"%" + (high_byte<q?"0":"") + high_byte.toString(q);
	}

    }
    return retval;
}

/*make_wav(261.64, 80000);*/

var freq = 261.64; /* middle C */

var notes=new Array(q); /* 13 really, but maybe can save bytes? */
/*var keys=new Array(13);*/

/* Note names for early debugging messages before I had the canvas code
var note_names = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "Ab", "A", "A#", "B","C"];
*/

var note_offsets=[0,0,1,1,2,3,3,4,5,5,5,6,7];
var s="\u266f"; /* Closure seems to think this isn't needed */
var note_accents=["", s, /* C, C# */
		  "", s,  /* D, D# */
		  "", /* E */
		  "", s,  /* F, F# */
		  "", /* G */
		  "\u266d", "", s,  /* Ab, A, A# */
		  "", /* B */
		  "" /* C */
		 ];


function init_canvas() {
    cv.width^=1; /* Dive into HTML5 is wrong about not having to change the width
                    to alter the canvas dimensions in Webkit browsers,
                    see http://webkit.org/blog/176/css-canvas-drawing/ */

    c.font = "50px sans"; /* need a font name it seems; doesn't actually matter if it's a really font though?!? */
	
    note_count=0;

}		  

function play_note(note_number) {
    
/* Debugging */
/*
    var log_el = document.getElementById("debug");
    if (log_el) {
	log_el.innerHTML = "<p>Playing " + note_names[note_number] +
	    " (press_count=" + press_count + "</p>";
	press_count++;
    }
*/  
  
    var note_id = /* "myaudio" + */ note_number + "_" + (note_count % DUPE_NOTES);
    document.getElementById(note_id).play();
    var x="\u2669"+note_accents[note_number];

    if (note_count>=q) {
	init_canvas();
    }
    c.fillText(x, 5 + (note_count*60), 99-(note_offsets[note_number]*5));

    note_count++;
}

/* Holdover from when I had DIVs representing a genuine musical keyboard -
   abandoned as (a) didn't look like I'd get it all into 1k, and (b) not
   really usable on anything other than a touchscreen.  Might be salvagable
   for an iPhone/iPad version?
function play_note_from_key() {
    var key_number = this.id.substr(3);
    // alert("pressed " + key_number);
    play_note(key_number)
}
*/


/*var xpos=0;*/
/* max is really 13 rather than 16 aka q, but trying to save bytes */
for (var note_number=0; note_number<q; note_number++) {
    /* more holdovers from the draw a keyboard with DIVs */
    var white_note = true;
    if ((note_number % 12)==1 ||
	(note_number % 12)==3 ||
	(note_number % 12)==6 ||
	(note_number % 12)==8 ||
	(note_number % 12)==10) {
	white_note = false;
    } 
    */
    var freqstr=make_wav(freq); /* space inefficient but quicker than recalculating the
                                   sine wave for each duplicate of the note */
    for (var i=0; i<DUPE_NOTES; i++) {

	notes[note_number] = document.createElement("audio");
	notes[note_number].src="data:audio/wave,"+ freqstr;
	/*notes[note_number].autobuffer = true;*/ 
	/* notes[note_number].preload = "auto"; /* is this needed on data URI? */

	/* More space efficient but causes Opera to crash 
	notes[note_number] = Audio("data:audio/wave,"+ make_wav(freq));
	*/
	notes[note_number].id = /*"myaudio" + */ note_number  + "_" + i;

	/*notes[note_number].controls = true ; /* from debugging */
	document.body.appendChild(notes[note_number]);
    }

    /* Main part of the abandoned code to draw a musical keyboard that
       you could touch/click to play a note
    keys[note_number] = document.createElement("div");
    keys[note_number].id="key" + note_number;
    keys[note_number].style.position="absolute";
    keys[note_number].style.borderColor = "#000";
    keys[note_number].style.borderWidth= "2px";
    keys[note_number].style.borderStyle= "solid";

    if (white_note) {
        keys[note_number].style.backgroundColor="#fff";
        keys[note_number].style.width="96px";
        keys[note_number].style.height="400px";
        keys[note_number].style.left=xpos + "px";
        keys[note_number].style.top="250px";
        keys[note_number].style.zIndex=1;
	xpos+=100;
    } else {
        keys[note_number].style.backgroundColor="#000";
        keys[note_number].style.width="94px";
        keys[note_number].style.height="250px";
        keys[note_number].style.left=(xpos - 52 ) + "px";
        keys[note_number].style.top="250px";
        keys[note_number].style.zIndex=100;
    }
    keys[note_number].save_colour=keys[note_number].style.backgroundColor;
    keys[note_number].onclick = play_note_from_key;
    document.body.appendChild(keys[note_number]);
    */

    freq *= 1.059463; /* 2 ^ (1/12) */
}

var key_mappings = [
    81, // Q - 00 - C
    50, // 2 - 01 - C#
    87, // W - 02 - D
    51, // 3 - 03 - D#
    69, // E - 04 - E
    // skip black note
    82, // R - 05 - F
    53, // 5 - 06 - F#
    84, // T - 07 - G
    54, // 6 - 08 - G#
    89, // Y - 09 - A
    55, // 7 - 10 - A#
    85, // U - 11 - B
    // skip black note
    73  // I - 12 - C
];
    
  
function play_from_keyboard(e) {
    /*var key_id = e.keyCode ? e.keyCode : e.charCode;*/
    var key_id = e.keyCode;
    for (var i=0; i<key_mappings.length; i++) {
	if (key_id == key_mappings[i]) {
	    play_note(i);
	    /* break; /* not strictly necessary, and losing it saves a few bytes */
	}
    }
    /* Abandoned code to allow shifting of octaves, never really got any more done
       on it than this.  If I dumped the canvas stuff I could maybe have got this
       working, but I wanted to have a token gesture towards doing something in
       Chrome */
    /*
    if (key_id == 219) {
	octave--;
    } else if (key_id == 220) {
	octave++;
    }
    */
}

var cv = document.getElementById("c");
var c= cv.getContext("2d");
cv.width=999;
init_canvas();

/* these were just for seeing how much space I had in the canvas
  they aren't needed for proper use
*/
/*
c.fillStyle="#ff8";
c.fillRect(0,0,cv.width,cv.height);
c.fillStyle="#000";
*/

/*
cv.height=99;
c.font = "20px sans"; 
*/
/*c.font = "bold 20px sans-serif";*/
/* c.font="20px"; /* fails to parse */
/*c.fontSize="20px"; /* doesn't seem to have any effect */
c.fillText("Ready", 0,40);

document.onkeydown = play_from_keyboard;
