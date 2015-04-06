/**
 * copyright Ryan Day 2010
 * http://ryanday.org/
 *
 * mit/gpl dual licensed 
 *
 * use it modify it have a ball even make money off of it!
 *
 *
 * */


var sfc = String.fromCharCode,
d = document,
ce = function(nn){return d.createElement(nn)},
bits=16,
pack = function(point,bytes){
	point = parseInt(point);
	var s = '',i;
	for(i=0;i<bytes;i++){
		s+=sfc(point & 255);
		point = point >> 8;
	}
	return s;
},downtime = {};


_n=ce('div'),
_b=function(frequency,m){
	if(!frequency.map) frequency=[frequency];

	var c3,c2,num_channels = 1,samples = "",sample_rate=11025;

	//frequency.forEach(function(f){
	for(i in frequency){
		var f=frequency[i],
			k = 2* Math.PI * f / sample_rate,
			total = sample_rate*0.5,
			max = 65536,
			halfMax=(max/2);

		for (var sample=0; sample<total; sample++) {
			samples += pack((Math.sin(k * sample)*halfMax),2);
		}
	}
	//   16 offset   pcm  num channels
	c2 = pack(16,4)+pack(1,2)+pack(num_channels,2)+pack(11025,4)+pack((sample_rate * num_channels * bits)/8,4)+pack((num_channels * bits)/8,2)+pack(bits,2)+"data"+pack(samples.length,4)+samples;;
	
	return "data:"+(m||"audio")+"/x-wav;base64,"+btoa("RIFF"+pack(c2.length,4)+"WAVEfmt "+c2)
}

var generated = {},
generateSound = function(key){
	key = 440*Math.pow(1.0594630943,((+key)+41)-49)
	if(!generated[key]){
		generated[key] = new Audio(_b(key));
	}
	//---- add note
	var a=[];
	if(_n.a) a=_n.a;
	a.push(key);
	if(a.length > 10)a.shift();
	_n.textContent = a.join(',');
	_n.a=a;

	generated[key].play();
},
doel = function(txt,fnstr){
	el = ce('a');
	el.textContent=txt;
	d.body.appendChild(el);
	el.addEventListener('click',function(){
		eval(fnstr)
	},false);
}

d.body.appendChild(_n);
doel('Download ',"location=_b(_n.a,'application')");
doel('| Play',"new Audio(_b(_n.a)).play()");

d.addEventListener('keydown',function(ev){
	var t = new Date().getTime(),w=ev.which;
	if(downtime[w] && downtime[w]+350 > t){
		return;
	}
	
	downtime[w] = t;
	var c = sfc(w),k ='AWSEDFTGYHUJ'.indexOf(c);
	if(k >-1){
		generateSound(k);
	}
},false);
