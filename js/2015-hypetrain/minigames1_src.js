(z=function(a){
    
      // Clear any timeout set by MiniPopTiles
      clearInterval(S);
      
      // Redraw buttons and table
      b.innerHTML="<center><p><table border id=t><p><button onclick=z(0)>MiniSweeper<button onclick=z(1)>MiniPopTiles<button onclick=z(2)>MiniGameOfLife";
      
      // Play MiniSweeper
      if(a==0){
        h=[v=[]];f=[l=g=0];n=[];r=function(d){for(M=!l;M;l=g)for(k=M=H="";s>++k;)for(j=s,H+="<tr>";~--j;H+="<th width=25 height=30 onclick=h[i="+I+"]?g--:v[i]=1;r() oncontextmenu=for(f["+I+"]^=g=1,k=0;k<s*s;)g&=h[k]^!f[k++];return!!r() "+(v[I]|g||"bgcolor=tan")+">"+(f[I]?"F":h[I]&g?"¤":v[I]|g&&n[I]||'\xa0'))for(I=k*s+j,T=d?h[I]=.1>Math.random():0,x=2;~x--;)for(y=2;~y--;~B&&B<s?(n[C]=~~n[C]+T)||v[I]|h[I]|!v[C]?0:v[I]=M=1:0)B=j+y,C=(k+x)*s+B;t.innerHTML=H};r(s=14)
      }
      
      // Play MiniPopTiles
      if(a==1){
        g=n=c=1;for(m=h=[],i=20;i;)h+=(i--&3?"":"<tr>")+"<th id=t"+i+" width=20 onclick=g&&(this[H]^c?g=0:m[this[H]='\xa0',m.indexOf(c++)]=0)>\xa0";t[H="innerHTML"]=h;S=setInterval(function(y){if(!g){clearInterval(S);alert(c-1)};if(g)if(n<c+20){for(;!y;)if(!m[k=20*Math.random()|0])y=m[k]=window["t"+k][H]=n++}else g=0},500)
      }
      
      // Play MiniGameOfLife
      if(a==2){
        o=onkeyup=function(){f=g;g=[h='<pre>'];for(i=30;i--;h+='\n')for(j=60;j--;){k=60*i+j;d=0;for(y in e=[1,59,60,61])d+=f[k+e[y]]+f[k-e[y]];h+='<a onclick=innerHTML=q[g['+k+']^=1]>'+q[g[k]=3==d|f[k]&2==d]};t.innerHTML=h};o(g=q='.@')
      }
    })(S=3)
