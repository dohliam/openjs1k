// See https://github.com/subzey/js1k2015 for details

var VIEWPORT_WIDTH = 500;
var VIEWPORT_HEIGHT = 300;
var DEBUG = false;

if (typeof __RegPack === 'undefined'){
	g = null;
}

var v01, v02, v03;

setInterval(function(){
	g=1+g%1000;
	var __inline_bgcolorReset = b.bgColor=0;
	a.width -= __inline_bgcolorReset; // Reset canvas
	c.translate(a.width/2, a.height/2); // Center the context origin
	v01 = Math.max(a.width / VIEWPORT_WIDTH, a.height / VIEWPORT_HEIGHT);
	c.scale(v01, v01); // Make logical viewport cover physical one

// Camera shake
	v01 = (g < 213) && Math.cos(Math.log(g/2+5));
	c.translate(Math.cos(g*3) * v01, Math.sin(g*2) * v01);

if (DEBUG){
	c.scale(0.9, 0.9);
	c.save();
}

// Stars
	c.fillStyle = '#fff';
	for (v01=300; v01--; ){
		c.beginPath();
		c.arc(Math.cos(v01*30) * 250, Math.sin(v01*31) * 150, Math.sin(v01*5)/3 + 0.5, 0, 7);
		c.fill();
	}
//	return;

// Planet
	// Fill & atmosphere glow
	v01 = c.createRadialGradient(0, 480, 500, 0, 480, 515);
	v01.addColorStop(0, '#37a');
	v01.addColorStop(1, 'rgba(255,255,255,0)');
	c.beginPath();
	c.arc(0, 480, 600, 0, 7);
	c.fillStyle=v01;
	c.fill();


	c.fillStyle='#452';
	// Continent
	c.beginPath();
	for (v01=6; v01-=1/32; ){
		c.lineTo(
			Math.cos(v01) * (Math.sin(v01 * 3) + 5) * (Math.sin(v01 * 17) + 13) * 2 + 80,
			Math.sin(v01) * (Math.sin(v01 * 4) + 4)  * (Math.sin(v01 * 18) + 13) + 60 
		);
	}
	c.fill();

	// Shadow
	v01 = c.createRadialGradient(100, 550, 450, 100, 550, 550);
	v01.addColorStop(0, 'rgba(0,0,0,0)');
	v01.addColorStop(1, 'rgba(0,0,0,.9)');
	c.beginPath();
	c.arc(0, 480, 515, 0, 7);
	c.fillStyle = v01;
	c.fill();

	// Blinking landing point
	c.translate(130, 30);
	c.fillStyle = '#fff';
	c.save();
	v01 = 1 + g %2 / 5;
	c.scale(v01, v01);
	c.beginPath();
	for (v01=70; v01--; ){
		v02 = v01 * (91 + Math.sin(g/100) / 200);
		c.lineTo(1/Math.sin(v02), 1/Math.cos(v02));
	}
	c.fill();
	c.restore();

	// LAZOR RAILS!


	c.beginPath();
	c.moveTo(0,0);
	c.lineTo(-400, -29);
	c.lineTo(-400, -26);
	c.lineTo(0,0);
	c.lineTo(-400, -53);
	c.lineTo(-400, -50);
	c.fill();

	c.fillStyle = 'hsl(300,50%,'+(Math.cos(g/10) * 10 + 80)+'%)';
	c.save();
	v02 = 1+g%30/100;
	c.scale(v02, v02);
	for (v01=12; v01--;){
		c.beginPath();
		c.moveTo(-10, 10);
		c.quadraticCurveTo(
			-80, -15,
			-120, -25
		);
		c.quadraticCurveTo(
			-80, -14.8,
			-10, 10
		);
		c.fill();
		c.scale(1.3, 1.3);
	}
	c.restore();


	// c.globalAlpha = 1;
// Train
	v01 = (500 / g) - .5;
	// v01 = 5;
	c.scale(v01, v01);

	for (v01 = 400; v01-- ; ){
		c.beginPath();
		c.moveTo(-70 + Math.sin(v01/152) * 30, v01/16-30);
		c.lineTo(-560, v01/2-246);
			if (v01<200){
				c.strokeStyle = 'hsl(0,15%,' + (90-v01*0.3) + '%)';
			} else {
				c.strokeStyle = 'hsl(195,25%,' + (180-v01*0.375) + '%)';
			}

		c.stroke();
	}

// Stripes and the rear
	c.save();
	c.fillStyle = '#111';
	for (v01=5;v01--;){

		c.beginPath();
		if (v01){
			c.arc(-99, -23.0, 18.8, 1, -1.2, 1);
		} else {
			c.arc(-99, -23.0, 18.8, 2.8, 4.6);
		}
		c.arc(-97, -22.6, 19.2, -0.9, 0.95);
		c.fill();
		c.scale(1.6, 1.6);

	}
	c.restore();

// Flames
// c.fillStyle = '#f82';
// c.globalAlpha = 0.1;
c.fillStyle = 'rgba(255,136,34,.1)';
for (v01=10; v01--; ){
	c.beginPath();
	c.moveTo(-70 + Math.sin(g + v01), -35 + Math.cos(g + v01));
	c.quadraticCurveTo(
		10, -10,
		-80 + Math.sin(g + v01), Math.cos(g + v01)
	);
	c.quadraticCurveTo(
		-10 + Math.sin(g + v01) * 9, -12  + Math.cos(g + v01) * 3,
		-70 + Math.sin(g + v01), -35 + Math.cos(g + v01)
	);
	c.fill();
}

if (DEBUG){
	c.restore();
	c.strokeStyle = '#fff';
	c.strokeRect(-VIEWPORT_WIDTH / 2, -VIEWPORT_HEIGHT / 2, VIEWPORT_WIDTH, VIEWPORT_HEIGHT);
}
}, 40);
