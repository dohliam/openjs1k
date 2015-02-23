/*
Copyright (c) 2010, Patrick Wied. All rights reserved.
Code licensed under the BSD License:
http://patrick-wied.at/static/license.txt
*/
var heatmapApp = (function(){
	// var definition
	// canvas: the canvas element
	// ctx: the canvas 2d context
	// width: the heatmap width for border calculations
	// height: the heatmap height for border calculations
	// invoke: the app doesn't react on the mouse events unless the invoke var is set to true
	var canvas,
		ctx,
		width,
		height,
		radius1 = 25,
		radius2 = 50,
		invoke = false,
	// function for coloring the heatmap
	colorize = function(x,y,x2){
		// initial check if x and y is outside the app
		// -> resetting values
		if(x+x2>width)
			x=width-x2;
		if(x<0)
			x=0;
		if(y<0)
			y=0;
		if(y+x2>height)
			y=height-x2;
		// get the image data for the mouse movement area
		var image = ctx.getImageData(x,y,x2,x2),
		// some performance tweaks
			imageData = image.data,
			length = imageData.length;
		// loop thru the area
		for(var i=3; i < length; i+=4){
			
			var r = 0,
				g = 0,
				b = 0,
				tmp = 0,
				// [0] -> r, [1] -> g, [2] -> b, [3] -> alpha
				alpha = imageData[i];
				
			// coloring depending on the current alpha value
			if(alpha<=255 && alpha >= 235){
				tmp=255-alpha;
				r=255-tmp;
				g=tmp*12;
			}else if(alpha<=234 && alpha >= 200){
				tmp=234-alpha;
				r=255-(tmp*8);
				g=255;
			}else if(alpha<= 199 && alpha >= 150){
				tmp=199-alpha;
				g=255;
				b=tmp*5;
			}else if(alpha<= 149 && alpha >= 100){
				tmp=149-alpha;
				g=255-(tmp*5);
				b=255;
			}else
				b=255;
			// we ve started with i=3
			// set the new r, g and b values
			imageData[i-3]=r;
			imageData[i-2]=g;
			imageData[i-1]=b;
		}
		// the rgb data manipulation didn't affect the ImageData object(defined on the top)
		// after the manipulation process we have to set the manipulated data to the ImageData object
		image.data = imageData;
		ctx.putImageData(image,x,y);	
	},
	// this handler is listening to the mouse movement of the user
	mouseMoveHandler = function(ev){
		// if the invoke variable is set to true -> do the alphamap manipulation
		if(invoke){
			// at first we have to get the x and y values of the user's mouse position
			var x, y;
			if (ev.layerX) { // Firefox
				x = ev.layerX;
				y = ev.layerY;
			} else if (ev.offsetX) { // Opera
				x = ev.offsetX;
				y = ev.offsetY;
			}
			// storing the variables because they will be often used
			var r1 = radius1;
			var r2 = radius2;
			// create a radial gradient with the defined parameters. we want to draw an alphamap
			var rgr = ctx.createRadialGradient(x,y,r1,x,y,r2);
			// the center of the radial gradient has .1 alpha value
			rgr.addColorStop(0, 'rgba(0,0,0,0.1)');  
			// and it fades out to 0
			rgr.addColorStop(1, 'rgba(0,0,0,0)');
			// drawing the gradient
			ctx.fillStyle = rgr;  
			ctx.fillRect(x-r2,y-r2,2*r2,2*r2);
			// negate the invoke variable 
			// next execution of the logic is when the activate method activates the invoke var again
			invoke=!invoke;
			// at least colorize the area
			colorize(x-r2,y-r2,2*r2);
		}
	};
	
	return {
		// initialization
		initialize: function(c, wt, ht){
			canvas = document.getElementById(c);
			canvas.width = wt;
			canvas.height = ht;
			canvas.style.border = "2px solid black";
			ctx = canvas.getContext("2d");
			width = wt;
			height = ht;
			canvas["onmousemove"] =  function(ev){ mouseMoveHandler(ev); };
		},
		// activating the logic
		activate: function(){
			invoke = !invoke;
		}
	};
}());
// call the initialization
heatmapApp.initialize("c",999,500);
// and call the activate function in an interval of 50ms
setInterval("heatmapApp.activate();",50);
