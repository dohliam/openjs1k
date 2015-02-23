//
// This program is free software. It comes without any warranty, to
// the extent permitted by applicable law. You can redistribute it
// and/or modify it under the terms of the Do What The Fuck You Want
// To Public License, Version 2, as published by Sam Hocevar. See
// http://sam.zoy.org/wtfpl/COPYING for more details.
//

t = 0;

m=[0, 3, 1, 1, 0];
(function d(){
    v=document.body.children[0];
    w=800;
    h=800;
    v.width=w;
    v.height=h;
    c=v.getContext('2d');
    u=300;

    // draw background
    c.clearRect(0, 0, w, h);
    g = c.createLinearGradient(w/2, 0, w/2, h);
    g.addColorStop(1, 'lightgrey');
    g.addColorStop(0, 'lightblue');
    c.fillStyle = g;
    c.fillRect(0, 0, w, h);

    // draw clouds
    for (j = 1; j <= 3; j++) {
	c.beginPath();
	for (i = 0; i < 3; i++) {
	    c.arc((t*0.13579*j+m[i]*10) % (w + 500) - 400 + j * 100, m[i+2]*10+j*75, 32, 0, 8, false);
	}
	c.fillStyle = 'white';
	c.fill();
    }

    // draw sun
    c.beginPath();

    // draw feets
    c.beginPath();
    c.moveTo(w/2,h/2);
    c.lineTo(w/3, h);
    c.moveTo(w/2,h/2);
    c.lineTo(w/2,h);
    c.moveTo(w/2,h/2);
    c.lineTo(w*2/3,h);
    c.stroke();

    // move center
    c.translate(w/2,h/2);

    n=15;
    k=2*Math.PI;

    // draw wheel
    s=t*0.002;
    c.save();
    c.beginPath();
    c.rotate(s);
    for (i = 0; i < n*2; i+=1) {
	a = k/(n*2);
	c.moveTo(0,0);
	for (j = 1; j <= 4; j+=1) {
	    c.arc(0,0,u/j,0,a,false);
	}
	c.rotate(a);
    }
    c.stroke();
    c.restore();

    // draw capsules
    for (i = 0; i < n; i+=1) {
	a = k/n*i;
	c.save();
	c.rotate(s+a);
	c.translate(u, 0);
	c.rotate(-s-a);
	c.beginPath();
	c.translate(-50/2, 50);
	c.moveTo(0, 0);
	c.lineTo(50, 0);
	c.lineTo(50/2, -50);
	c.lineTo(0, 0);
	c.fillStyle = 'pink';
	c.fill();
	c.stroke();
	c.restore();
    }

    t+=1;
    setTimeout(d, 1);
})();
