/* see also https://github.com/hexwab/rainbownoise */
var ctx = new AudioContext();
var noisenode = ctx.createScriptProcessor(2048, 0, 2);
noisenode.onaudioprocess = function(ev) {
    for(var c=0; c<2; c++) {
	var buf = ev.outputBuffer.getChannelData(c);
	for (var i=0; i<buf.length; i++) {
	    var w = Math.random()*2-1;
	    if (!(noise&1))
		w = chan[c][0](w);
	    if (noise<2)
		w = chan[c][1](w);
	    if (noise>3)
		w = chan[c][2](w);
	    buf[i] = w*[1,1,2,1,9,4][noise]/9;
	}
    }
};

noisenode.connect(ctx.destination);
var chan=[];

var noise;

function select(n) {
    noise = n;
    for (var i=0; i<2; i++) {
	chan[i] = [ (function() {
	    var b = [ 0,0,0,0,0,0,0 ];
	    
	    return function(i) {
		var k=0;
		for (var n=0; n<6; n++) {
		    b[n] *= [.99886,.99332,.969,.8665,.55,-.7616][n];
		    b[n] += i * [ .055518, .075076, .153852, .3104856, 0.5329522, -0.0169 ][n];
		    k += b[n];
		}
		b[6] = i * .115926;
		return (k+ i * .5362)/8;
	    };	})(),
		    (function(){var s=0;return function(i){s+=i;s*=0.993;return s/10}})(),
		    (function(){var s=0;return function(i){var k=s-i;s=i;return k;}})()
		  ];
    }

    document.body.innerHTML ='<center><br><h1>'+
['Unnamed', 'Brown', 'Pink', 'White', 'Blue', 'Violet'][n]+" noise</h2><big>"+
	[-9,-6,-3,'+0','+3','+6'][n]+' dB/octave';
    document.body.style.background = '#'+
[480,840,'f8d','fff','26f','80f'][n];
}
document.body.onclick=function() { select((noise+1)%6);};
select(3);
