var s=6,S=30,m=[],Q=[],I=[],P=0,x,y,i,j,J=Math,r=J.random,f=J.floor,K="#",Z=window;

function u(v){return function(){eval(v)}};
function l(p,q,e,f){for(i=p;i--;){e();for(j=q;j--;)f()}};
function T(i,j){if(i<0||j<0||i>=x||j>=y)return-1;else return m[i][j]};
function R(V){return((V-1)/2)};
function W(i,j){Q[i][j]=P;for(var q=-1;q<2;q++)for(var n=-1;n<2;n++){if(n==0||q==0)continue;if(T(i+R(n),j+R(q))==-R(n/q)&&Q[i+n][j+q]==0)W(i+n,j+q)}};
function k(A){a.strokeStyle=I[Q[i+A][j]];a.moveTo((i+A)*s,j*s);a.lineTo((i+1-A)*s,s+j*s)};
e=u("");
J=u('x=f((Z.innerWidth-S)/s),y=f((Z.innerHeight-S)/s);c.height=y*s;c.width=x*s;l(x,y,u("m[i]=[]"),u("m[i][j]=f(r()*2)"));l(x+1,y+1,u("Q[i]=[]"),u("Q[i][j]=0"));l(x+1,y+1,e,u("if(Q[i][j]==0){P++;for(var z=3,G=K;z--;)G=G+f(r()*15).toString(16);I[P]=G;W(i,j)}"));a.lineWidth=s/2;a.lineCap="round";l(x,y,e,u("a.beginPath();k(T(i,j));a.stroke()"));');

b.style.textAlign="center";
J();
Z.onresize=J;
b.onkeydown=function(e){L=e.keyCode;if(L==38)s++;if(L==40&&s>2)s--;J()};