      var 	
        sz = 512,
        line = a.getImageData(0, 0, sz, sz),
        xp,
        yp,
        cp,
        cycC = 1200,
        cyc,
        A,
        B,
        C,
        i0 = 0,
        i1 = 1,
        i2 = 0,
        max,
        ra,
        rb,
        rc,
        x_p,
        ival,
        idx,
        mn = 3,
        xmp;
      c.setAttribute('width', sz);
      c.setAttribute('height', sz);

      ival = setInterval(function(){
        i0 += 0.002;
        i1 -= 0.002;
        i2 += 0.005;
        var mul = Math.sin(i0) * 4,
        mul2 = Math.cos(i1) * 4,
        max = (Math.sin(3 + i2) + 1) * 4;
        x_p = sz/(2*max);
        xmp = max * x_p;

        for(A = 0; A < line.data.length; A+=4) {
          line.data[A] *= 0.9;
          line.data[A + 1] *= 0.9;
          line.data[A + 2] *= 0.9;
          line.data[A + 3] = 1000;
        }
        var iter = 100;

        while(iter--) {	
          A = C = iter;
          B = -iter;
          cyc = cycC;

          while(cyc--) {
            if(B == C) { continue }

            A = (A - C) / (-A + mul2 * B + C);
            B = (A - C) / (B - C + A);
            C = (A - C) / (mul * A - B + C);

            ra = A * Math.cos(i2) - B * Math.sin(i2);
            rb = A * Math.sin(i2) + B * Math.cos(i2);

            if(ra < max   &&
               ra > -max  &&
               rb < max   &&
               rb > -max ) {	
              
              xp = Math.floor(xmp - ra * x_p);
              yp = Math.floor(xmp - rb * x_p);	
              cp = Math.abs(C * 20);
              idx = 4 * (xp * sz + yp);

              line.data[idx] += 32;
              line.data[idx + 1] += 15;
              line.data[idx + 2] = 255;
            }
          }
        }

        a.putImageData(line, 0, 0);
      }, 5);
