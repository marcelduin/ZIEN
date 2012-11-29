var vp = document.createElement('div');
vp.id = 'sight-cover';
document.body.appendChild(vp);

var See = {
	run: function(){
		vp.style.left = (0.2*mcoo[0]*ws[0])+'px';
		vp.style.top = (-0.2*mcoo[1]*ws[1])+'px';
	}
};

(function loop(){
	See.run();
	webkitRequestAnimationFrame(loop);
})();

function setCover(u){
	if(!u) return;
	u = chrome.extension.getURL(u);
	vp.style.backgroundImage = 'url('+u+')';
	vp.style.display = 'block';
	vp.style.width = null;
	vp.style.height = null;
	vp.style.margin = null;
};

function diabeticRet(imgURL){
	vp.className = 'diabetic-ret';
	setCover(imgURL);
	vp.style.width = 1.5*ws[0]+'px';
	vp.style.height = 1.5*ws[1]+'px';
	vp.style.margin = (-0.25*ws[1])+'px 0 0 '+(-0.25*ws[0])+'px';
};
function retPigmentosa(imgURL){vp.className = 'ret-pigmentosa';setCover(imgURL)};
function glaucoom(imgURL){vp.className = 'glaucoom';setCover(imgURL)};
function maculaDeg(imgURL){vp.className = 'macula-deg';setCover(imgURL)};

window.document.onkeyup = function (e) {
	if (!e) e = event;
	if (e.keyCode == 27){
		chrome.extension.sendMessage({action:'setCover',value:null});
		chrome.extension.sendMessage({action:'setProtanomaly',value:0});
		chrome.extension.sendMessage({action:'setDeutanomaly',value:0});
		chrome.extension.sendMessage({action:'setTritanomaly',value:0});
		chrome.extension.sendMessage({action:'setAchromatopsy',value:0});
		chrome.extension.sendMessage({action:'setCataract',value:0});
	}
};

function addClass(_,n) {if(hasClass(_,n))return;_.className+=' '+n.toLowerCase()};
function delClass(_,n) {n=n.toLowerCase();if(!hasClass(_,n))return;var c=_.className.split(' ');for(var i=0;i<c.length;i++)if(c[i].toLowerCase()==n){c.splice(i,1);break;}_.className = c.join(' ')};
function hasClass(_,n) {n=n.toLowerCase();var c=_.className.split(' ');for(var i=0;i<c.length;i++)if(c[i].toLowerCase()==n)return true;return false};
