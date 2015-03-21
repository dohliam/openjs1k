var screenHeight = a.height;
var screenWidth = a.width;
var textureSize = 128;
var angleTable = [];
var depthTable = [];

var ctx = a.getContext('2d');
var imageData = ctx.getImageData(0, 0, screenWidth, screenHeight);

// mostly to save bytes
var M = Math;
var pi2 = 2 * M.PI;

// you always need a setPixel, even in 13h
function setPixel(x, y, colour, a) {
    var index = (y * screenWidth * 4) + (x * 4);
    imageData.data[index + 0] = imageData.data[index + 1] = imageData.data[index + 2] = colour;
    imageData.data[index + 3] = a;
}

// precalculate the angle and depth tables for the tunnel
var angle;
for (var y = 0; y < screenHeight; y++) {
    angleTable[y] = [];
    depthTable[y] = [];
    for (var x = 0; x < screenWidth; x++) {
        var relX = x - (screenWidth / 2);
        var relY = (screenHeight / 2) - y;

        var tmpRy = relY | 1;
        angle = M.atan(relX / tmpRy);

        angle = angle / pi2 + 180;

        angleTable[y][x] = angle * 1024 | 0;

        var depth = 4388608 / ((relX * relX) + (relY * relY));
        depthTable[y][x] = depth;
    }
}

// perlin ideas from here, slightly mashed to save bytes
// http://freespace.virgin.net/hugo.elias/models/m_perlin.htm
var persistence = .70;
var octaves = 18;
var baseScale = .05
function noise(x, y) {
    return values[x % textureSize][y % textureSize];
}
function smoothing(x, y) {
    return noise(x, y) / 4;
}
function interpolate(a, b, x) {
    var ft = x * 3.14;
    var f = (1 - M.cos(ft)) * .5;
    return a * (1 - f) + b * f;
}
function interpolatenoise(x, y) {
    var integerX = M.floor(x);
    var fractionalX = x - integerX;

    var integerY = M.floor(y);
    var fractionalY = y - integerY;

    var v1 = smoothing(integerX, integerY);
    var v2 = smoothing(integerX + 1, integerY);
    var v3 = smoothing(integerX, integerY + 1);
    var v4 = smoothing(integerX + 1, integerY + 1);

    var i1 = interpolate(v1, v2, fractionalX);
    var i2 = interpolate(v3, v4, fractionalX);

    return interpolate(i1, i2, fractionalY);
}
function perlin2d(x, y) {
    var total = 0;

    var p = persistence;
    var n = octaves - 1;

    for (var i = 0; i <= n; i++) {
        var frequency = M.pow(2, i);
        var amplitude = M.pow(p, i);

        total = total + interpolatenoise(x * baseScale * frequency, y * baseScale * frequency) * amplitude;
    }
    return total;
}

// random data into the texture first
var textureData = [];
var values = [];
for (var y = 0; y < textureSize; y++) {
    values[y] = [];
    for (var x = 0; x < textureSize; x++) {
        values[y][x] = M.random() * 2 - 1;
    }
}

// smooth (perlin2d) the texture and make it wrap nicely
for (var y = 0; y <= textureSize; y++) {
    textureData[y] = [];
    for (var x = 0; x <= textureSize; x++) {
        if (y <= textureSize / 2) {
            if (x < textureSize / 2) {
                textureData[y][x] = perlin2d(y, x);
            } else {
                textureData[y][x] = textureData[y][textureSize - x - 1]
            }
        } else {
            textureData[y][x] = textureData[textureSize - y][x]
        }
    }
}

// animate the tunnel
// keep zooming, and rotate nicely back and forth
var zoom = 0;
var spin = 0;
var ctr = 0.0;
var drawTunnel = function() {
    for (var y = 0; y < screenHeight; y++) {
        for (var x = 0; x < screenWidth; x++) {
            var depth = depthTable[y][x];
            var textureX = (angleTable[y][x] + spin) % textureSize;
            var textureY = ((depth + zoom) % textureSize) | 0;
            var colour = textureData[textureY][textureX] * 355;
            var alpha = 486 - depth | 0
            setPixel(x, y, colour, alpha);
        }
    }
    ctx.putImageData(imageData, 0, 0);
    zoom += 2;
    spin += (M.sin(ctr) * 4 | 0);
    ctr += 0.01;
    requestAnimationFrame(drawTunnel);
}

drawTunnel();
