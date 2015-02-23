// Texture generator and better commented (less hacked up source) located at http://somethinghitme.com/projects/cell/	
// MIT license, do whatever you please.
(function(){
			var imageData,
				w = h = 128,
				m=Math,
				r=m.random,
				wW = m.ceil(window.innerWidth/w) * w,
				wH = m.ceil(window.innerHeight/h) * h,
				i,p,rP=[],points=[],x,y,dist,curMinDist,dx,dy,
				g=0,a=m.abs,
				draw = function(){		
					// Check distance with all other points
					g-=.04;if(4==a(~~g)){g=-g};
					for(x = 0; x < w; x+=4){
						for(y = 0; y < h; y+=4){
								dist = 0;
								curMinDist = w * h;
							for(p=0; p < 9; p++){
								dx = a(x-rP[p].x);
								dy = a(y-rP[p].y);
								if (dx > w/2){ dx = w-dx;}
								if (dy > h/2){ dy = h-dy;}
								dist = m.sqrt(dx * dx + dy * dy);
								
								if(dist < curMinDist){
									points[y * w + x] = dist;
									curMinDist = dist;
								}
							}

							for(var pix = 0; pix < 4; pix++){
								for(var piy = 0; piy < 4; piy++){
									i = ((x + pix) + (y + piy) * imageData.width) * 4;
									var val = points[y * w + x];
									imageData.data[i] = ~~(val * 4);
									imageData.data[i+2] = ~~(val * a(g));
									imageData.data[i+3] = 255;
								}
							}
						}
					}

					for(x = 0; x<wW; x+= w){
						for(y = 0; y<wH; y+= h){
							ctxCopy.putImageData(imageData, x, y);
						}
					}						

					for(p=0; p < 9; p++){
						//rP[p].a+= .1;
						i = m.sin(rP[p].a);
						rP[p].x+=i;
						rP[p].y+=i;

						if(rP[p].x > w){
							rP[p].x = 0;
						}

						if(rP[p].x < 0){
							rP[p].x = w;
						}

						if(rP[p].y > h){
							rP[p].y = 0;
						}

						if(rP[p].y < 0){
							rP[p].y = h;
						}

					}
					var to = setTimeout(function(){draw()}, 20);

				};

				d=document;
				z=d.body;
				s=z.style;
				s.overflow = "hidden";
				s.margin = 0;
				var canvas = d.createElement("canvas");
				canvas.width = canvas.height = w;
				var ctx = canvas.getContext("2d");
				var canvasCopy = d.getElementById("c");
					canvasCopy.width = wW;
					canvasCopy.height = wH;

				var	ctxCopy = canvasCopy.getContext("2d");
				imageData = ctx.getImageData(0,0,w,h);

				// Setup the points
				for(i = 0; i < 9; i++){
						var t = [];
						t.x = ~~(r()* w);
						t.y = ~~(r()* h);
						t.a = r()*360;
						rP[i]=t;
				}
				draw();
		})();
