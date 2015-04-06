/*
a = canvases
b = body
s = canvas size

T = tick

X, Y, Z, and _ are temporary
*/

// Style <html> and <body>.

document.documentElement.style.cssText = 'width:100%;height:100%;font-weight:100;display:table;background:#333;font-family:"Helvetica Neue",sans-serif;letter-spacing:.1em';
b.style.cssText = 'display:table-cell;vertical-align:middle;text-align:center';

// Take an array of intervals ('second', 'minute', etc) and turn them into an array of <canvas>es.

a = 'second minute hour day week month year'.split(' ').map(function(unit, index) {

  // Create the canvas and set some properties.
  _ = document.createElement('canvas');
  s = _.width = _.height = innerWidth / 8;  // Also sneak in a definition of the canvas size.

  // .m represents the number of milliseconds for each interval.
  _.m = [1000, 60000, 3600000, 86400000, 604800000, 2629800000, 31557600000][index];

  // .e() returns "end of {{interval}}". For example, if it's June 6 and the interval is 'month',
  // .e() will return July 1. This logic is stolen from Moment.js.
  _.e = function() {
    Z = new Date;
    switch (unit) {
      case 'year':
        Z.setMonth(0);
      case 'month':
        Z.setDate(1);
      case 'week':
      case 'day':
        Z.setHours(0);
      case 'hour':
        Z.setMinutes(0);
      case 'minute':
        Z.setSeconds(0);
      case 'second':
        Z.setMilliseconds(0);
    }
    if (unit === 'week') {
      Z.setDate(Z.getDate() - Z.getDay());
    }
    return Z.getTime() + this.m - 1;
  };

  // .c represents the context.
  _.c = _.getContext('2d');
  _.c.lineWidth = s * 0.01;

  // Create a container <div> and a <div> for the times. There's some trickery here
  // to ensure shorter declarations.
  (Y = document.createElement('div')).innerHTML = unit;
  (X = document.createElement('div')).appendChild(_);
  X.style.cssText = 'display:inline-block;color:' +
    (_.c.fillStyle = _.c.strokeStyle = '#fa8072 #faad72 #fada72 #acda72 #87ceeb #87aceb #a4b7eb'.split(' ')[index]) +
    ';font-size:' + (s / 8) + 'px';

  // Add the container to the body and the text to the container. There's some more
  // trickery here; appendChild returns the inserted element, which we then use.
  (b.appendChild(X)).appendChild(Y);

  // When done, return the canvas to the mapper.
  return _;

});

// T() is called once per frame.

(function T() {

  // For each <canvas>...

  a.forEach(function(canvas) {

    // Clear the canvas.
    canvas.c.clearRect(0, 0, s, s);

    // Draw the pie chart.
    // The bulk of the work is in the calculation of the angle (see the call to .arc()). In
    // pseudocode, the calculation for the hour interval might be:
    // ( (end_of_hour - now) / 3600000 ) * 2π
    canvas.c.beginPath();
    canvas.c.moveTo(s / 2, s / 2);
    canvas.c.arc(s / 2, s / 2, s * 0.45, 0, 2 * Math.PI * ((canvas.e() - new Date) / canvas.m));
    canvas.c.fill();

    // Draw the border of the pie chart.
    canvas.c.beginPath();
    canvas.c.moveTo(s / 2, s / 2);
    canvas.c.arc(s / 2, s / 2, s * 0.45, 0, 2 * Math.PI);
    canvas.c.stroke();

  });

  // Tick again!
  requestAnimationFrame(T);

})();
