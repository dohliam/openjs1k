			var canvas = document.body.children[0];
			
			var WIDTH = 800;
			var HEIGHT = 600;
			//var WIDTH = window.innerWidth;
			//var HEIGHT = window.innerHeight;
			
			
			canvas.width = WIDTH;
			canvas.height = HEIGHT;
			
			var stats = new Stats();
			document.body.appendChild(stats.domElement);
			
			var c = [canvas,0,0,0,0,0];
			var C = [context,0,0,0,0,0];
			
			for(var i = 0; i < 5; ++i)
			{
				c[i] = (i == 0) ? canvas : document.createElement('canvas');
				c[i].width = c[i].w = (i == 0) ? WIDTH : (WIDTH >> (i+2));
				c[i].height = c[i].h = (i == 0) ? HEIGHT : (HEIGHT >> (i+2));
				
				C[i] = c[i].getContext('2d');
			}
			var context = C[0];
			
			frame = 0;
			
			function copyCanvas(i,j)
			{
				C[j].drawImage(c[i], 0, 0, c[i].w, c[i].h, 0, 0, c[j].w, c[j].h);
			}
			
			function copyCanvas4(i,j)
			{
				C[j].drawImage(c[i], 0, 0, c[i].w, c[i].h, 0, 0, c[j].w/2, c[j].h/2);
				C[j].drawImage(c[i], 0, 0, c[i].w, c[i].h, 0, c[j].h/2, c[j].w/2, c[j].h/2);
				C[j].drawImage(c[i], 0, 0, c[i].w, c[i].h, c[j].w/2, 0, c[j].w/2, c[j].h/2);
				C[j].drawImage(c[i], 0, 0, c[i].w, c[i].h, c[j].w/2, c[j].h/2, c[j].w/2, c[j].h/2);
			}
			
			function color(r,g,b)
			{
				context.fillStyle="rgb("+r+","+g+","+b+")";
			}
			
			function draw()
			{			
				frame++;								
				
				
				context.globalCompositeOperation = 'source-over';
				context.globalAlpha = 0.65;
				context.fillStyle = "#000";
				context.fillRect(0, 0, WIDTH, HEIGHT);				
				
				context.globalAlpha = 1.0;
				
				
				var x = 128 * Math.cos(frame * 0.1);
				var y = 128 * Math.cos(frame * 0.1);
					
				context.shadowBlur    = 6;
				context.shadowColor   = "#000";

				for (var i = 9; i >= 0; --i)
				{	
					var t = frame * 0.131 - i * 0.4;							
					color(255,128 - i * 10,64);
					
					circle4(50 + 230 * Math.cos( t/2), 40 + 130 * Math.sin(t/4), 10 - i);
					
					
					t = frame * 0.1 - i * 0.4;
					color(255-i * 30,255 - i * 10,0);					
					circle4(30 * Math.cos( t/2), 150 * Math.sin(t/2), 15 - i * 1);
					
					t = frame * 0.0254 - i * 0.7;
					color(i * 16, 0,192 * (i%2) + i);					
					circle4(30 * i * Math.cos( t), 30 * i * Math.sin(t), 30 - 1 * i);
										
				}			
				
				context.shadowBlur    = 0;
				
				
				
				
				// mipmap
				
				for (var i = 1; i < 5; ++i)
				{
					copyCanvas(i-1,i);
				}				
				
				context.globalCompositeOperation = 'lighter';
				
				var w=[0.0,0.3,0.4,0.4,0.3];
				for (var i = 1; i < 5; ++i)
				{					
					
					context.globalAlpha = w[i];
					if (i <= 2)
					{
						copyCanvas4(i, 0);					
					}
					else
					{
						copyCanvas(i, 0);					
					}
				}				
				stats.update();
			}
			
			function circle4(x,y,r)
			{
				circle(x, y, r);
				circle(-x, y, r);
				circle(-x, -y, r);
				circle(x, -y, r);
				circle(y, -x, r);
				circle(-y, -x, r);
				circle(-y, x, r);
				circle(y, x, r);
			}
			
			function circle(x,y,r)
			{
				//draw a circle
				context.beginPath();
				context.arc(WIDTH/2+x, HEIGHT/2+y, r, 0, Math.PI*2, true);
				context.closePath();
				context.fill();
			}
			
			setInterval(draw, 20); 
