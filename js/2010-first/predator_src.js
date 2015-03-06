/*
 * Predator on acid - JS1K submission
 * - Compress using closure compiler <http://closure-compiler.appspot.com/>
 * 
 * Released under WTFPL license <http://sam.zoy.org/wtfpl/>.
 * 
 * @author Miller Medeiros <http://millermedeiros.com/>
 * @version 0.1 (2010/08/06)
 */

(function(){
	
	var doc = document,
		body = doc.body,
		N_BLOBS = 256,
		WID = 800,
		HEI = 600,
		ZOOM = 8,
		PAN = ZOOM/2 * -1,
		canvas = body.children[0],
		context = canvas.getContext('2d'),
		n = N_BLOBS,
		_blobs = [],
		_x,
		_y,
		_rw,
		_math = Math,
		_random = _math.random;
	
	body.style.cssText = 'margin:0;text-align:center;background-color:#000';
	canvas.width = WID;
	canvas.height = HEI;
	
	/** Limit values */
	function cap(curValue, minValue, maxValue){
		return _math.min( _math.max(curValue, minValue), maxValue);
	}
	
	//blob[_x, _y, _rw]
	while(n--) _blobs.push([ WID * _random(), HEI * _random(), _random() - 0.5 ]);
	
	//render
	setInterval(function(){
		
		context.drawImage( canvas, PAN, PAN, WID + ZOOM, HEI + ZOOM );

		n = N_BLOBS;
		while(n--){
			_rw = (_rw > -5)? _blobs[n][2] : 0;
			_rw += _random() - 0.5;
			_x = cap(_blobs[n][0] + _math.cos(_rw) * _rw, 0, WID);
			_y = cap(_blobs[n][1] + _math.sin(_rw) * _rw, 0, HEI);
			
			context.beginPath();
			context.fillStyle = (_rw > 0)? ((_rw > 0.25)? 'rgba(0,0,0,0.02)' : 'rgba(0,0,255,0.03)') : ((_rw < -0.75)? 'rgba(0,255,255,0.01)' : 'rgba(255,0,0,0.02)');
			context.rect(_x, _y, 64, 128);
			context.fill();
		
			_blobs[n][0] = _x;
			_blobs[n][1] = _y;
			_blobs[n][2] = _rw;
		}
		
	}, 9);
	
}());
