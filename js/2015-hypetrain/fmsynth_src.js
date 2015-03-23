/* jshint evil: true, loopfunc: true, elision: true, undef: false, -W008 */

// Sampling rate
r=8000;

// Oscillators
// t = curr time (samples)
// f = frequency (hz)
// r = sample rate (hz)
// p = cycle period (samples)
O={
	'sin': 'Math.sin(6.3*t/r*f)',
//	'cos': 'Math.cos(6.3*t/r*f)',  // ~12 bytes
	'sqr': 't%p<p/2?1:-1',
//	'saw': 't%p/p',  // not as loud
	'saw': 't%p/p/.5-1'
};

// Draw interface
b=b.appendChild(document.createElement('pre')).appendChild(document.createElement('center'));
// init form
b.appendChild(document.createElement('label')).innerHTML='len: ';
d = [b.appendChild(document.createElement('input'))];
d[0].value = 5;  // default len
b.appendChild(document.createElement('hr'));

for (c=0; c++<16;) {
	b.appendChild(document.createElement('label')).innerHTML = c>9?c:'0'+c;
	for (x=-1; x++<4;) {
		e=b.appendChild(document.createElement('label'));
		e.innerHTML = ' '+[c<5?'out':'osc','vol','f','fm','am'][x]+': ';
		if (x) {
			i=document.createElement('input');
//			if(x>2) i.type='number';  // ~21 bytes
		} else {
			i=document.createElement('select');
			for (e in O) {
				i.appendChild(document.createElement('option')).innerHTML = e;
			}
		}
		// train horn!
		i.value = ['sqr',1,311,5,6,'sqr',1,370,5,6,'sqr',1,470,5,6,'sqr',1,523,5,6,,.1,.1,,,,1,.1,,7,,-1,.1][5*c+x-5]||'';
		// fm synthesis test
//		i.value = [,.3,'f',5,,'saw',2,'f/2',,6,,1,,,,,1,,,,,1,'f/4',,,'saw',1,'f/2',,7,,1,1][5*c+x-5]||'';
		d.push(b.appendChild(i));
	}
	b.appendChild(document.createElement('br'));
	if (c==4) b.appendChild(document.createElement('hr')); // ~11 bytes
}

// Get sample for channel c at time t with main freq f
function y(c, f){
	// initial freq
	g = o[c][1];
	if (!g) return 0;
	// FM: modulate freq by osc channel, if any
	if (o[c][2]) g *= Math.pow(2, y(o[c][2], g)/8);
	// run current vol oscillator
	v = o[c][0](g);
	// AM: attenuate vol by osc channel, if any
	if (o[c][3]) v *= y(o[c][3],f);
	return v;
}

addEventListener('keydown', function(e) {
	// Chromatic scale, bottom row of keyboard, middle row is "black keys"
	n = 'ZSXDCVGBHNJM'.indexOf(String.fromCharCode(e.keyCode));
	f = 256*Math.pow(Math.pow(2, 1/12), n);
	if (n > -1) {
		// Prepare oscillators
		o = [];
		for(c=16; --c;) {
			n = 5*c-5;
			o[c] = [
				eval('(function(v){return function(f){p=r/f;return v*('+O[d[++n].value]+')}})')(d[++n].value),
				eval(d[++n].value)||0,
				eval(d[++n].value)||0,
				eval(d[++n].value)||0
			];
		}

		// Compute all oscillator params
		a = '';
		for (t=0; t<r*d[0].value; t++){
			v = 0;
			// Mix samples, divide result by # of channels (4)
			for (c=5; --c;) v += y(c,f)/4;
			a += String.fromCharCode(v>1?255:v<-1?0:(v+1)*127);
		}
		new Audio('data:audio/wav;base64,'+btoa('RIFF_oO_WAVEfmt '+atob('EAAAAAEAAQBAHwAAQB8AAAEACAA')+'data'+a)).play();
	}
});
