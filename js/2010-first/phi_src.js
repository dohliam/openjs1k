var // the var statement can be removed after minification, and the commas below changed to semicolons

    // Document
    doc = document,
    canvas = doc.getElementById('c'),
    ctx = canvas.getContext('2d'),
    width = canvas.width = innerWidth,    // assign width to canvas, and store a reference
    height = canvas.height = innerHeight, // assign height to canvas, and store a reference
    
    // Maths
    M = Math,
    pi2 = 7, // over-approximation of 2*PI, used for drawing circles (quicker, and less bytes than using 2*Math.PI)
    phi = .618,
    PHI = 1 / phi,
    phiTenth = phi / 10,
    PHIten = PHI * 10,
    phiWidth = width * phi,   // width on the Golden Ratio line
    phiHeight = height * phi, // height on the Golden Ratio line
    RGBMAX = 255, // for colour assignments
    ceil = M.ceil,
    random = M.random,
    
    // Settings
    frequency = 60,     // -> PHI * 10 frames per second
    unitsPerFrame = PHIten, // circles per frame
    driftFactor = .02,  // how much randomness to introduce (approximation of PHI / 100)
    driftFactorWidth = width * driftFactor,
    driftFactorHeight = height * driftFactor,
    canvasDiagonal = hypotenuse(width, height), // length of the diagonal across the canvas
    
    // Modifiers
    tone = randomInt(3), // set a colour tone for this run
    
    // Container for units
    units = [],
    
    // Declarations - these can all be removed after minification
    intensity, factor, radius, rgbStroke, firstCoords, i, x, y, r, g, b, rgbStr1, rgbStr2, driftX, driftY, lineToCoords, comparisonColor, xy, burst, lineStartOrigin;

// **

// Ah, I remember trig
function hypotenuse(a, b) {
    return M.sqrt((a * a) + (b * b));
}

/*
randomInt: This function returns a number from 0 to `len`. It's handy for seeding randomness within a range.
    randomInt() will return either 0 or 1 - e.g:
        var something = randomInt() ? oneThing : otherThing;

    randomInt(3) will return either 0, 1 or 2 - e.g:
        var something = [onThing, otherThing, anotherThing][randomInt(3)];

    randomInt(100) will return a number between 0 and 99 - e.g:
        var something = randomInt(100);                           // choosing a number at random
        var something = randomInt(100) ? commonThing : rareThing; // introducing occasional or rare properties
*/
function randomInt(len){
    return ceil((len || 2) * random()) - 1;
}

// Get a random drift amount - positive or negative - up to a maximum
function drift(maxDrift){
    return ceil(random() * (maxDrift * 2 + 1) - maxDrift / 2 - 1);
}

// Draw lines between the coordinates in the supplied array
function lines(units){
    ctx.beginPath();
    lineStartOrigin = randomInt(PHIten);
    ctx.moveTo(
        lineStartOrigin ? phiWidth + driftX : randomInt(width),
        lineStartOrigin ? phiHeight + driftY : randomInt(height)
    );
    for (i = units.length; xy = units[--i];){
        ctx.lineTo(xy[0], xy[1]);
    }
    // NOTE: we don't bother to close the path, to save bytes. It'll be closed automatically when the next path is begun.
}

// The main loop. This chooses colours, alpha transparency, positions and draws circles and lines (some coloured, some black)
function frame(){
    // Get the value for a red, green or blue colour component
    function color(which){
        return which != tone || burst ?
            // if the mouse isn't pressed, and this isn't the main colour tone, the go random
            randomInt(RGBMAX) :
            // otherwise, calculate the exponential intensity (2.72 is an approximation of Math.exp(1))
            ceil((M.exp(intensity) / 2.72) * RGBMAX);
    }
    
    // Set units array to zero length, and save bytes by assigning `i` at the same time
    units.length = i = 0;
    
    // Get some drift
    driftX = drift(driftFactorWidth);
    driftY = drift(driftFactorHeight);

    // Main calculation loop
    for (; i < unitsPerFrame; i++){
        x = randomInt(width / PHI) * PHI;
        y = randomInt(height / PHI) * PHI;
        
        // Intensity (used for weighting colours, circle radius and alpha transparency)
        intensity = 1 - hypotenuse(x - phiWidth, y - phiHeight) / canvasDiagonal; // proximity to the Golden Ration coords
        factor = random() * intensity * (intensity / PHI);
        radius = driftFactorWidth * (randomInt(PHIten) ? factor * PHI : (1 - factor * phi)); // add variety to radius - show large circles at the periphery only 1:PHI times
        
        // Colours
        r = color(0);
        g = color(1);
        b = color(2);
        rgbStr1 = 'rgba(' + r + ',' + g + ',' + b + ',';
        
        // Circle path
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, pi2, 0);
        
        // Styles
        ctx.strokeStyle = rgbStroke = (randomInt(PHI) ? 'rgba(' + r * phiTenth + ',' + g * phiTenth + ',' + b * phiTenth + ',' : rgbStr1) + factor +')';
        ctx.fillStyle = rgbStr1 + (burst ? intensity * phi : factor * intensity) +')';
        
        // Draw
        ctx.stroke();
        ctx.fill();
        units[i] = [x, y, intensity, rgbStroke];
    }
    
    // Coloured lines - to shoot out from the PHI origin or somewhere else
    lines([units[0]]);
    ctx.stroke();
    
    // Black lines - to etch away
    lines(units);
    ctx.strokeStyle = 'rgba(0,0,0,' + (0.38 * units[0][2]) + ')'; // 0.38 is approximation of phi * phi
    ctx.stroke();
}

// Set body style - this is a bit of an extravagence, but it's good to expand the canvas to the full width and height, and we've got bytes left, so why not?
doc.body.style.cssText='background:#000;overflow:hidden;margin:0';

// Burst of colour when the mouse is pressed
burst = 0; // In the minified version, there will be no `var burst`, so we set a value for it here
canvas.onmouseup = canvas.onmousedown = function(){
    burst = !burst;
};


// Start the animation
//   -> For the minified version, the line below should be uncommented. For development, comment it out.
setInterval(frame, frequency);

//   -> For the minified version, the whole block below should be commented out. For development, leave it uncommented, to allow a space bar key press stop the animation and spare the CPU.
/*
var intervalRef;
(doc.onkeydown = function(event){
    if (!event || event.which == 32){
        intervalRef = intervalRef ?
            clearInterval(intervalRef) :    // clearInterval and set intervalRef to undefined
            setInterval(frame, frequency);  // setInterval and create reference to it
    }
})();
*/


// ** fin

/*
MINIFICATION PROCESS:

* code minimally, and code for minification (there are many techniques here)
* put through advance Closure Compiler: http://closure-compiler.appspot.com/home
* remove trailing semicolon
* remove line breaks
* remove leading `0` from floating point numbers
* remove var (+ change commas to semicolons)
* change setinterval function to string
* change function declarations to function assignments (making sure that they are declared before they are called)
* put through jsCrush: http://www.iteral.com/jscrush/
*/
