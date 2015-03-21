        //W = innerWidth-21;
       //H = innerHeight-21;
//       D = Math.min(W,H);
            c.width=W=innerWidth-21;
            c.height=H=innerHeight-21;         
            D=W<H?W:H;            
            a.shadowBlur=43;
            a.shadowColor='#000';        
            a.translate(W/2,H/2);   
            C="789abcdef";                        
            function F(g,h,j,d,e,f,n)
            {
                s=0.64;
                g*=s;
                h*=s;
                j*=s;
                d*=s;
                e*=s;
                f*=s;
                
                if (n){A=(j-e)*0.6;B=(d-f)*0.6;function G(g,h,j,d,e,f){F(3*g-j-e,3*h-d-f,g+A,h+B,g-A,h-B,n-1)}G(g,h,j,d,e,f);G(j,d,e,f,g,h);G(e,f,g,h,j,d)}
                
                for (i = 0; i < 2; ++i)
                {
                    ip1 = i + 1;
                    U = C[n+1-i];
                    V="#"+U+U+U;
                    a.fillStyle = V;
                    a.strokeStyle = V;
                    
                    a.beginPath();
                    a.lineTo(g/ip1,h/ip1);
                    a.lineTo(j/ip1,d/ip1);
                    a.lineTo(e/ip1,f/ip1);    
                    a.closePath();
                    a.stroke();
                    a.fill();     
                    
                }
            }
            
            F(-93, -93, +93, -93, 0, 1, 6);
