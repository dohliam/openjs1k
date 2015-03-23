var width = a.width;
      var halfWidth = width / 2;
      var height = a.height;
      var halfHeight = height / 2;

      var trackWidth = width / 9;
      var railWidth = trackWidth / 5;

      var entitySize = halfWidth / 9;
      // trainPosition
      // -1 = left, 1 = right.
      // var P = 1;

      // 0 = false, -1 = left, 1 = right.
      // var peopleAtBottom = 0;

      // then
      // var T = 0;
      // 1000 / 30
      var interval = 33;
      // delta
      // var D = 0;

      // distance
      // var d = 0;
      var speed = 20;

      // score
      //var s = 0;
      var peopleAtBottom = T = D = d = s = 0;

      // -1 = spare lives, 1 = kill for scoreMethod.
      // 1 = right, -1 = left for F.
      // firstEncounter
      var scoreMethod = F = P = 1;

      var colorBackground = '#eda'; // '#e5ddac'
      var colorFar = '#eec'; // '#efe9cd'
      var colorSky = '#fff';
      var colorEntity = '#602'; // '#61001d'
      var colorOther = '#944'; // '#8d494d'

      // for (e in c) c[e[0]+e[2]+(e[6]||'')] = c[e];
      // with(c) {}
      // function signatures

      a.ontouchstart = onclick = onkeydown = function() {
        // Can be reset here, check is done when people approach.
        peopleAtBottom = 0;
        P = -P;
      };

      B = c.createLinearGradient(0, 0, 0, height);
      B.addColorStop(0, colorBackground);
      // B.addColorStop(0.45, colorFar);
      B.addColorStop(0.5, colorSky);
      B.addColorStop(0.52, colorBackground);
      // B.addColorStop(1, colorFar);

      // I'm going to draw a lot of rectangles.
      function drawRect(position, x, y, w, h) {
        c.fillStyle = position;
        c.fillRect(x, y, w, h);
        c.globalAlpha = x ? 1 : 0.8;
      }

      function drawCircle(position, x, y, w, h) {
        c.beginPath();
        c.arc(position, x, y, 0, 9);
        c.fill();
      }

      // Draws the level background.
      function drawBackground() {
        drawRect(B, 0, 0, width, height);
      }

      function drawSky() {
        // Bitwise OR to round the value.
        n = entitySize | 0;
        for (i = n; i--;) {
          drawRect(colorSky);
          // Sky weather (particles).
          //drawRect(colorSky, Math.random() * width, Math.random() * halfHeight, 1, 1);

          // Clouds.
          c.globalAlpha = 0.3;
          drawCircle(i * 20,  Math.sin(i + T / 1e3) * 5, Math.sin(i % 3) * trackWidth);
        }
      }

      function drawGround() {
        // Horizon.
        //drawRect(colorFar, 0, halfHeight, width, 2);
        //drawRect(colorSky, 0, halfHeight, width, 1);

        // Depth effect.
        //c.globalAlpha = 0.9;
        n = 70;
        for (i = n; i--;) {
          if ((d * 1e3 + 9 * Math.sin((90 - i) / 57) / Math.sin(i / 57)) % 18 > 9) {
            drawRect(colorFar, 0, halfHeight * (1 + i / n), width, halfHeight / n);
          }
        }
      }

      function drawSide(position, x, y, w, h) {
        var startX = halfWidth + position * halfWidth / 2;
        var horizonX = halfWidth + position * halfWidth / 9;
        // Calculate line equation.
        var a = halfHeight / (startX - horizonX);
        var b = height - startX * a;

        drawRect(colorOther);

        // Draw persons on the railway.
        n = 50;
        for (i = n; i--;) {
          if ((d * 1e3 + 9 * Math.sin((55 + position * i) / 19) / Math.sin(i / 19) + position * 2) % 20 > 19) {

            var w = entitySize * ((railWidth / 6 + i) / n);
            var h = w + halfHeight / n;

            var y = halfHeight * (1 + (i / n)) - h / 2;
            var x = (y - b) / a - w / 2;

            //drawRect(colorEntity, x, y, w, h);
            drawCircle(x, y, w);

            if (i == n - 1 && y > halfHeight * 0.9) {
              peopleAtBottom = position;
            }
          }
        }

        // Draw tracks.
        c.beginPath();

        position = -1;
        c.moveTo(startX + position * trackWidth + position * railWidth, height);
        c.lineTo(horizonX + position * (railWidth / 4), halfHeight);
        c.lineTo(startX + position * trackWidth, height);

        position = 1;
        c.moveTo(startX + position * trackWidth + position * railWidth, height);
        c.lineTo(horizonX + position * (railWidth / 4), halfHeight);
        c.lineTo(startX + position * trackWidth, height);

        c.fill();

        // Debug rail
        // c.moveTo(startX - 2, height);
        // c.lineTo(horizonX, halfHeight);
        // c.lineTo(startX + 2, height);
        // c.fill();

        // Moving planks: Depth effect.
        n = 70;
        for (i = n; i--;) {
          if ((d * 1e3 + 9 * Math.sin((90 - i) / 57) / Math.sin(i / 57)) % 4 > 3) {

            var w = (trackWidth + railWidth * 2) * 2 * ((railWidth / 6 + i) / n);
            var h = halfHeight / n;

            var y = halfHeight * (1 + (i / n)) - h / 2;
            var x = (y - b) / a - w / 2;

            drawRect(colorOther, x, y, w, h);

            // Debug rail
            // c.beginPath();
            // c.moveTo(horizonX, halfHeight);
            // c.lineTo(x, y);
            // c.lineTo(startX, height);
            // c.stroke();
          }
        }
      }

      function drawTrain() {
        drawRect(colorEntity, 1);
        drawCircle(halfWidth + P * (halfWidth / 2), height + entitySize , entitySize * 3);
      }

      function drawScore(size, x, y) {
        drawRect(colorSky);
        c.font = size + 'vw mono';
        c.fillText(s, x, y);
      }

      function gameOver() {
        // Draw shock.
        drawRect(colorEntity, 0, 0, width, height);
        // Makes the game stop.
        interval = 1e9;

        // 7 / 9
        drawScore(20, halfWidth * 0.8, halfHeight);
      }

      setInterval(function() {
        D = new Date - T;

        if (D > interval) {
          T = new Date - (D % interval);

          d += speed * (D / 36e5);

          drawBackground();
          drawSky();
          drawGround();
          drawSide(-1);
          drawSide(1);
          drawTrain();
          drawScore(5, 9, 50);

          // Bottom screen cleaning code.
          // drawRect(colorOther, 0, height, width, a.height);

          // Success, score points.
          if (P == scoreMethod * peopleAtBottom) {
            F = peopleAtBottom = 0;
            s += 10;
            speed++;

            // If kill, draw shock.
            if (scoreMethod > 0) {
              drawRect(colorEntity, 0, 0, width, height);
            }
          }
          // Failure, game over.
          // P == -scoreMethod * peopleAtBottom && ((F && (F = scoreMethod = -scoreMethod)) || gameOver());
          if (P == -scoreMethod * peopleAtBottom) {
            if (F > 0) {
              F = scoreMethod = -scoreMethod;
            }
            else {
              gameOver();
            }
          }
        }
      }, 1);
