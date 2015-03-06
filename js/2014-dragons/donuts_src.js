with (g) {
    //not really that important, but gives a nicer background..
    b.style.background='#000';

    //some very well compressed setup code from p01 
    //here is our aliasing for WebGL context
    for(k in g) 
        g[k.match(/^..|[A-Z]|1f$/g).join('')] = g[k];
    
    //setup viewport and define S (shader) and s (size) variables...
    vi(
        0,
        S=0,
        s=256,
        a.style.cssText=(a.width=a.height=s));


    //uncomment for debugging shader errors
    for (p = crP(t=2); t; coS(S), (atS(p, S)  /*|| console.log( getShaderInfoLog(S) )*/ )) {
        shS(S = crS(35634 - t), --t ? <%= frag %> : 'attribute vec4 p;void main(){gl_Position=p;}');
    }
    //console.log( getShaderInfoLog(S) )

    //setInterval leads to pretty brutal performance in Chrome
    D=function() { 
        requestAnimationFrame(D)
        drA(4, un1f(geUL(p,"T"),t+=.01), 3) 
    }
    D(
        veAP(
            enVAA(
                biB(k = 34962, crB())
            ),   
            2,
            5126,
            liP(p),
            usP(p),
            buD(k, new Float32Array([1,1,1, -3, -3, 1]), k+82)
        )
    );
}


//////// frag.glsl source: (minified and included in JS file during build step)

precision lowp float;

uniform float T;

void main( void ) {
	vec2 fc = gl_FragCoord.xy;
	vec2 p = fc / 256.;
	
	vec3 ray_dir = vec3(p.xy*2.-1., .9);

	vec3 pos = ray_dir;
	pos.z -= 15.5;
// ray_dir = normalize(ray_dir);		
	
	vec3 color = vec3(.0);
	float dist;
	float j;
	for( float i = 0.; i < 20.; i += 1. ) {		
		float a = T/4.+.01*pos.y;
		
		//twist deform
		float c = cos(a);
    	float s = sin(a);
    	mat2  m = mat2(c,-s,s,c);
		
		//here we repeat the content, lerping from one plane to another
		vec3 q = abs(1.-mod(vec3(m*mix(pos.xz, pos.xy, abs(sin(T/5.))),pos.y),2.));
		
		//here is where we model the tori and intersect them with a sphere
		dist = max(length(vec2(length(q.xz)-(sin(T)/2.+.5),q.y))-.4, length(pos)-10.5);

	   	j = i;
		if(abs(dist)<.005) 
			break;		
		pos += ray_dir * dist;
	}
	
	//determine our color, with vignette
	color = vec3(j/40.) * (1.-length(p-.5)) * 1.4;

	//some noise
	color += fract(sin(dot(p, vec2(12.9,78.2))) * 43758.5)*.15;
	
	//scanlines
	if (mod( fc.x+fc.y, 6. ) > 2. )
		color *= .9;

	gl_FragColor = vec4(vec3(color),1.);
}
