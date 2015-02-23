//Matrix Script by John Drake (foxox)
//drake[youARENTaROBOT]seas upenn edu

/*DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE 
                    Version 2, December 2004 
 Copyright (C) 2004 Sam Hocevar <sam@hocevar.net>
 Everyone is permitted to copy and distribute verbatim or modified 
 copies of this license document, and changing it is allowed as long 
 as the name is changed.
            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE 
   TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION 
  0. You just DO WHAT THE FUCK YOU WANT TO.*/
/* This program is free software. It comes without any warranty, to
 * the extent permitted by applicable law. You can redistribute it
 * and/or modify it under the terms of the Do What The Fuck You Want
 * To Public License, Version 2, as published by Sam Hocevar. See
 * http://sam.zoy.org/wtfpl/COPYING for more details. */

//knowing this will be compressed, I get a head start here:
d=document, b=d.body, c=d.getElementById("c"), x=c.getContext("2d"), bluron=0;
//bluron is just a bool that tracks whether the blur feature is on or not
b.setAttribute("style","margin:0;padding:0;overflow:hidden");
//make the canvas fill the whole space and kill any scrollbars

//initialize settings (for window resize)
function init()
{
  c.width=innerWidth;
  c.height=innerHeight;
  
  //wipe the screen (default color is black, so it doesn't need to be set before running this)
  x.fillRect(0,0,innerWidth,innerHeight);

  //set up font size for glyphs
  x.font = "30px sans-serif";

  //lets make some arrays for the character grid
  letters = new Array();  //linear array, but holds entire grid of glyphs
  positions = new Array();  //falling positions
  speeds = new Array(); //falling speeds

  //let these be configured to change the spacing of the grid
  charw = 30;
  charh = 30;

  //grid dimensions
  letterw = innerWidth/charw;
  letterh = innerHeight/charh;

  //fill grid with stuff
  for (i = 0; i < letterw; i++)
  {
    //first, random characters
    for (j = 0; j < letterh; j++)
      letters.push(String.fromCharCode(Math.floor(Math.random()*300+12354)));
    //then some random speeds (don't change) and positions (do change, obviously)
    speeds.push(Math.random()*innerHeight/150+innerHeight/400);
    positions.push(Math.random()*innerHeight);
  }
}

//make stuff re-initialize on resize
window.onresize = init;
//actually initialize the first time here
init();

//main program loop
setInterval(
  function()
  {
    //again, getting a headstart on compression
    vr = Math.random();
    //if blurry feature turned on, do the blur
    if (bluron)
      x.drawImage(c,-1*vr+.5,-2*vr,innerWidth+1*vr-.5,innerHeight+6*vr);  //basically just writes the screen over itself, but stretched out a little and jittered a little for more attractive random appearance... this code hopes that the browser does some sample interpolation in its raster scale-up system and doesn't just sample nearest-neighbor/point-sampling 
    //draw a transparent black rect over the screen to fade out BG
    x.fillStyle="rgba(0,0,0,0.07)";
    x.fillRect(0,0,innerWidth,innerHeight);
    //and now draw the letters
    //the +=1+!bluron*(vr>.5) parts cut 1/2 computation time for non-blur mode (non-blur mode is most low-performance-friendly, which is also why I have it set as the initial mode)
    //that skipping is not done in blur mode, as it gets jittery if it's done there
    for (i = 0; i < letterw; i+=1+!bluron*(vr>.5))
    {
      //first draw the green part
      x.fillStyle="#0F0";
      for (j = 1; j < 10; j+=1+!bluron*(vr>.5))
      {
        x.fillText(letters[Math.max(0, Math.floor(i*letterh + positions[i]/charh - j))], i*charw, Math.floor(positions[i]/charh)*charh-j*charh);
      }
      //then draw the white part
      x.fillStyle="#EFE";
      x.fillText(letters[Math.floor(i*letterh+positions[i]/charh)], i*charw, positions[i]);
      positions[i] += positions[i]>innerHeight?-innerHeight:speeds[i];
    }
  }
,100);

//and respond to clicks
document.onclick = function(){bluron=bluron?0:1}
