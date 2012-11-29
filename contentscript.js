var vp = document.createElement('div');
vp.id = 'sight-cover';
document.body.appendChild(vp);
var raf = false;

function loop(){
	if(!imgControl.filters.cover) return raf=false;
	vp.style.left = (0.2*mcoo[0]*ws[0])+'px';
	vp.style.top = (-0.2*mcoo[1]*ws[1])+'px';
	if(raf) webkitRequestAnimationFrame(loop);
};

function setCover(u){
	if(!u) return;
	u = chrome.extension.getURL(u);
	vp.style.backgroundImage = 'url('+u+')';
	vp.style.display = 'block';
	vp.style.width = null;
	vp.style.height = null;
	vp.style.margin = null;
	loop(raf=true);
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
