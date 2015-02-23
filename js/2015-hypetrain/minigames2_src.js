function z(a){
  // UI
  b.innerHTML = "<font face=arial><center><p><b>MiniGames #2<p><button onclick=z(0)>MiniSimon<button onclick=z(1)>Mini2048</button> <a href=/2100 target=_blank>MiniGames #1</a> <a href=/2121 target=_blank>MiniApps</a><div id=P>";
  
  // 2048
  if(a){
    function M(c,d){for(i=H=16;i--;G|=p>>11)for(p=B[m=V(j=i%4+1)];--j?(q=B[n=V(j)])?p-q?0:h=c?0:B[p?S+=B[m]*=2:B[i++,m]=q,n]=d:0:0;);}
    function V(x){if(x)return(D>1?4-x:x-1)<<D%2*2|i-i%4>>D%2*2;for(i=H|Math.random()*H;B[--i%H];);B[i%H]=2<<Math.random()+.1}
    (onkeyup=function(e){D=e?e.which-37:B=[];D>>2||M()|V(e?h:V());for(D=h=4;D--;)M(1);for(h=(G|h?S:S)+"<table border>";H;P.innerHTML=h+="<th width=50 height=50>\xa0"+[B[H]])H--%4?0:h+="<tr>\xa0"})(S=G=0)
  }
  
  // Simon
  else{
    function h(){for(i=g=f.push(new Date%4);j=i;setTimeout(A=function(k,q){Z=["00F","FF0","F00","080"];~k&&new Audio((B="data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU")+Array(Z[(3+k)%4]=333).join(B.slice(60+k*2))).play(setTimeout(A,250,-1));P.style.borderColor="#"+Z.join("#");if(q)k^f[j]?alert(g):++j^g||h()},500*i--,f[i]));}
    h(f=[]);
    onkeyup=function(e){A(e.keyCode-37,1)}
    P.style.background="#000";
    P.style.width="5em";
    P.style.height="5em";
    P.style.borderRadius="55em";
    P.style.border="5em solid";
  }
}z()
