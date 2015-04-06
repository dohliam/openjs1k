/* By Tom Hargreaves <hex@freezone.co.uk> 2010, public domain. */
c=document.body.children[0];
C=c.getContext('2d');

/* 300x200; ideally it should be square, and centred */
c.height=200;
C.translate(99,99);

/* Draw 1e4/25-1 == 399 points from the outside in.  This algorithm is
from _The Algorithmic Beauty of Plants_. */
for(i=1e4;i-=25;) {
    C.rotate(4*Math.PI/((3+Math.sqrt(5)))); /* ==2.399963..., a coincidence way too good to pass up */

    C.fillText("\u25ca",0,Math.sqrt(i));
    /* 
       Alignment can be tweaked by swapping the coordinates and/or their signs.
       Other fun characters to try:
       \u29eb (black lozenge; my first choice, if only it worked everywhere)
       \u2b2e (black vertical ellipse; my second choice, ditto)
       \u25ca (lozenge; what I had to settle for in the end)
       \u2666 (black diamond suit)
       \u25cf (black circle)
       \u25b2 (black up-pointing triangle)
     */
}
