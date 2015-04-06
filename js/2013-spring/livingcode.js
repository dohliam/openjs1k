

    // JS1K ヽ(*⌒∇⌒*)ﾉ

    S = b.querySelectorAll("script")[1].innerHTML.split("\n");

    so = 0; fs = "fillStyle";
    lo = 1; ln = "length";

    c.width = W = innerWidth;
    c.height = H = S.length*20;

    b.style.margin = 0;
    b.style.background = "#000";
    b.style.overflow = "hidden";

    a.textBaseline = "top";
    a.font = "12px monospace";

    x = setInterval(function() {
    	a.globalCompositeOperation = "source-over";
    	a.shadowBlur = 0; a[fs] = "rgba(0,0,0,0.4)";
    	a.fillRect(0,0,W,H);

    	a.shadowColor = "rgba(0,255,0,0.5)";
    	a.shadowBlur = 10; a[fs] = "#060";
    	a.globalCompositeOperation = "lighter";

    	S.forEach(function(v, i) {
    		if (i <= lo) {
    			if (i == lo) { v = v.substr(0, so); }
    			a.fillText(v, 100, 100+i*16);
    		}
    	});

    	a[fs] = "#0f0";
    	a.fillRect(100+a.measureText(S[lo].substr(0, so)).width, 102+lo*16, 10, 14);
    	so++;

    	if (so >= S[lo][ln]) { lo++; so = 0; }
    	if (lo*16 > innerHeight-200) { a.translate(0, -0.5); }
    	if (lo >= S[ln]-1) { window.clearInterval(x); }
    }, 25);