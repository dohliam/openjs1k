/*! Animated Squares
 *
 * @author Livingston Samuel
 * @license MIT License
 * @url - http://gist.github.com/515271
 * Modified version of Squares - http://github.com/livingston/Squares
 * Original idea by squaredesign - http://squaredesign.com/lab/crazy-squares/
 *
 */

;(function (win, doc, Math) {
  var grid = doc.body,
      getSquare = (function () {
        var div = doc.createElement('div');
        div.style.width = '50px';
        div.style.height = '50px';
        div.style.cssFloat = 'left';
        div.style.marginLeft = '1px';
        
        return function () {
          return div.cloneNode(false);
        };
      }()),
      randomColor = function () {
        var hex = Math.round(0xffffff * Math.random());

        return 'rgb(' + (hex >> 16) + ',' + (hex >> 8 & 255) + ',' + (hex & 255) + ')';
      },
      getGrid = function (col, row) {
        var cols = col || 10,
            rows = row || 6,
            l = cols * rows,
            frag = doc.createDocumentFragment();
            
        while (l--) {
          temp = getSquare();
          temp.style.backgroundColor = randomColor();
          frag.appendChild(temp);
        }
        
        return frag;
      },
      pulsate = function () {
        var squares = grid.getElementsByTagName('div'),
            len = squares.length;
        
        return function () {
          var randomSquare = squares.item(Math.floor(len * Math.random()));

          randomSquare.style.backgroundColor = randomColor();
        };
      },
      initialize = function () {
        var row = Math.floor((win.innerHeight || doc.documentElement.clientHeight)/50),
            col = Math.floor((win.innerWidth || doc.documentElement.clientWidth)/50);

        grid.innerHTML = '';
        grid.style.backgroundColor = '#fff';
        grid.style.margin = '0';
        grid.style.padding = '0';
        grid.style.overflow = 'hidden';
        grid.appendChild(getGrid(col, row));
        
        grid.addEventListener('mouseover', pulsate(), false);
      };
      
      initialize();
}(window, document, Math));
