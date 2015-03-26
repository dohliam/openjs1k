// Creative Commons CC by SA
var M = Math,
	d = document,
	c = d.body.children.c,
	C = c.getContext("2d"),
	K = "F0970007fff7F117FF170A1701D".split(7), // some colors
	Q = J = $ = 0,		// lives level, score 
	X = 2,				// ball x-speed
	P = Y = y = x = 14,	// padding / paddle height, ball y-speed, x and y positions of ball
	q = 99,				// paddle width
	o = 22,				// bumper rows
	n = 38,				// bumper colls
	L,U,E,T;
	
	


// functions are combined to save chars
function a(c,l,t,W,H) {
	
	// Setup a new level
	if(!W) {
		J++;		// increment level
		Q++; 		// reward with 1up
		Y*=1.05;	// speed up just a little
		X*=1.1;		// speed up just a little
		i = -1;		// current pin
		u = [];		// our array of bumpers
		
		// store an array of [x,y] array objects representing pixel positions of bumpers
		// in the push - i%n gives us our col, * w give our x; ~~(i/o) gives our row (~~ is bitwise floor), * 9 gives our y
		while(++i<o*n) M.random()*.51 >.5 ? u.push([i%n * w, ~~(i/o) * 9]) : 0; 
		d=i=u.length;
	
	// draw a shape
	} else {
		C.beginPath();
		C.fillStyle = "#"+K[c%7];
		H ? C.rect(l,t,W,H) : C.arc(l, t, W, 0, M.PI*2, 1);
		C.closePath();
		C.fill()
	}
}


// move the paddle on key press or swipe on touch uis
c.ontouchmove = d.onkeydown = d.onkeyup = function(e,c) {
	// on any key press set U to 0 (falsy) if L is depressed or set it to a positive int (any key is the left key)
	U=e.keyCode%39;
	// if touch ui use that, if not set L ( !U returns true if U is set to 0 and false for the positive ints)
	(c = e.touches) ? z = c[0].pageX : L=!U;
	//on keyup set both U and L to 0 so the paddle stops moving, 
	//if no keyup return !c (returns false if there are touch events) becasue thouch events need to be blocked after here esp for android
	return e.type == "keyup" ? U=L=0 : !c
};


c.width = W = 480;	// render area width
H = 600;			// render area height
c.height = H+q; 	// need the extra room below render area to handle touch eventswithout covering up the paddle
z = W/2;			// bumper start position			
w = W/n;			// column width

// main loop
setInterval(function(j) {
	
	// background
	a(J,0,0,W,H);
	
	
	// draw the ball
	a(J+1, x, y, P);
	
	// draw the score
	C.font = "50px Arial";
	C.fillText([J,Q-1,$], o, H-$%H-9); // H-$%H == y pixel value, text climbs up as score increases and then wraps back to the bottom
	

	// position and render the paddle
	z += L ? 9+J/2 : U ? -(9+J/2) : 0;
	a(J+1, z, H-P, q, P);
	T = x+X;
	E = y+Y;
	B = E+P;

	// hit a bumper
	i=d;
	while(--i) {
		// modify the x positon of the bumper for animation, use log for a cool effect, 
		// %W to wrap across, abs to keep things positive for higer levels
		j=(u[i][0]+=M.abs(M.log(i/J)))%W;
		// modifiy the y position slightly for animation, %320 to wrap vertically
		A=++u[i][1]%320;
		
		// draw the bumper
		a(i, j, A, 11);
		
		// bumper hit test
		if(x>j-P && x<j+P && y>A-P && y<A+P) {
			Y = -Y;				// change direction
			$++;				// score!
			if($%o > o-2) a() 	// level up! rebuild gameboard for increasing score;
		}
	}
	
	
	
	// bounce off the sides
	if(T + P > W || T - P < 0) X = -X;

	if (E - P < 0)
		// bounce off the top
		Y = -Y
	else if (B > H)
		if (x > z-8 && x < z + q+8) {
			//move the ball differently based on where it hit the paddle
			X = 9 * ((x-(z+q/2))/q);
			
			y = H-9;
			Y = -Y
		} else if (B > H) {
			// ball hit bottom, loose a life
			Y=P;		
			z=W/2;	// reset the ball and paddle
			y=0;	// ball stop on bottom and depleates score
			
			// no more lives, loose game/start over
			if(--Q<1)J=Q=$=X=1
		}
			
		
	x += X;
	y += Y
	
	

	
}, o);

// generate level 1
a()