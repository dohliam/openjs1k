/*
 * File: life-js1k.htm
 * Author: Sean Cline
 * Version: .1
 * Description: An HTML5 canvas-drawn "life" universe for Conway's Game of Life.
 * License: You may do whatever you please with this file and any code it contains. It is public domain!
 * Notes: This file is does not have what most people what consider good coding practices. It is in the name of fitting as much as possible a small space.
 * 	It is effectively a stripped down version of my more functional JS life example found here:
 * 	http://www.eng.utoledo.edu/~scline/life/life.html
 */
 
//
// Init vars.
//
d = document;
c = d.getElementById("c");	// Save the canvas element to create the context later.
ctx = c.getContext("2d");	// YAY! A place to draw!
cW = cH = c.width = c.height = 400;
gW = gH = 175;
bW = cW/gW;
bH = cH/gH;
mX = mY = -1;		// mouseMove() updates this to be the position relative to the dockElement.
g = new Array();
s = true; 			// Which drawing mode to use, classic, or blurred.

// Set up the canvasX and canvasY in the browser.
cX = cY = 0;
o = c;
while(o) {
	cX += o.offsetLeft;
	cY += o.offsetTop;
	o = o.offsetParent;
}

//
//  Functions.
//

// Get the value (whether a cell is alive or dead) for an x,y pair.
function get(x, y) {
	if (x < 0 || y < 0 || x >= gW || y >= gH) {
		return 0; // Return 0 so everything off the grid is not alive.
	}
	return g[x][y];
}

// Run and draw 1 full generation.
function run() {
	var newgrid = new Array();
	var column = null;
	var gridval = 0;

	for (var x = 0; x < gW; x++) {
		column = new Array();
		for (var y = 0; y < gH; y++) {
			gridval = next(x,y);
			column.push(gridval);
		}
		newgrid.push(column);
	}
	g = newgrid;
}

// Fade out the old generation.
function draw() {
	s ? ctx.fillStyle = "rgba(0,0,0,.1)" : ctx.fillStyle = "#FFF";
	ctx.fillRect(0, 0, cW, cH);
	
	// Draw the frame
	ctx.fillStyle = s ? "#FFF" : "#000";
	for(var x = 0; x < gW; x++) {
		for(var y = 0; y < gH; y++) {
			if(get(x,y) == 1)
			{
				ctx.fillRect(x*bW, y*bH, bW, bH);
			}
		}
	}
}

// Executed when the mouse moves over the canvasElement.
function mouseMove(e) {
	// Figure out where the mouse is.
	// Subtract the canvas element's location from the mouse client location for the reletive position. See why offsetX,offsetY is easier?
	mX  = e.clientX - cX + d.body.scrollLeft;
	mY = e.clientY - cY + d.body.scrollTop;
	
	gX = ~~(mX/bW);
	gY = ~~(mY/bH);
	g[gX][gY] = 1;
}



// Executed when the canvas is clicked on.
function mouseClick(e) {
	s = !s;
}

// Seed the game by generating a random grid.
function seed() {
	g = new Array();
	var column = null;
	var gridval = 0;

	for (var x = 0; x < gW; x++) {
		column = new Array();
		for (var y = 0; y < gH; y++) {
			gridval = Math.random() < .75 ? 0 : 1;
			column.push(gridval);
		}
		g.push(column);
	}
}

// Calculate the next value for a cell on this grid.
function next(x, y) {
	var aliveCount = 0;
	for (var xOffset = -1; xOffset <= 1; xOffset++) {
		for (var yOffset = -1; yOffset <= 1; yOffset++) {
			if (xOffset != 0 || yOffset != 0) {
				aliveCount += get(x+xOffset, y+yOffset);
			}
		}
	}
	
	var currentVal = get(x, y);
	if (currentVal == 1) {
		if (aliveCount >= 2 && aliveCount <= 3) {
			return 1;
		} else {
			return 0;
		}
	} else {
		if (aliveCount == 3) {
			return 1;
		} else {
			return 0;
		}	
	}
	
}



//
// Init code.
//

// Create a new grid and randomize it.
seed();
setInterval(run, 100);
setInterval(draw, 50);
c.onmousemove = mouseMove;
c.onclick = mouseClick;
