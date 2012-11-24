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

function CursorCrosshair(val){
	var currentClass = String(document.body.getAttribute("class"));
	if(val == true && currentClass.indexOf("re-cursor")<0){
		var newClass = currentClass + " re-cursor";
		if(currentClass=="null") newClass = "re-cursor";
		document.body.setAttribute("class", newClass);
	}else if(val == false && currentClass.indexOf("re-cursor")>=0){
		console.log(currentClass);
		var newClass = currentClass.replace("re-cursor","");
		document.body.setAttribute("class", newClass);
	}
};

function setCover(u){
	if(!u) return killSightCover();
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

function retPigmentosa(imgURL){
	vp.className = 'ret-pigmentosa';
	setCover(imgURL);
};

function glaucoom(imgURL){
	vp.className = 'glaucoom';
	setCover(imgURL);
};

function maculaDeg(imgURL){
	vp.className = 'macula-deg';
	setCover(imgURL);
};

function killSightCover(){
	vp.style.display = 'none';
	chrome.extension.sendMessage({action:'setCover',value:null});
	CursorCrosshair(false);
};

function killFilters(){
	imgControl.filters.protanomaly = 0;
	chrome.extension.sendMessage({action:'setProtanomaly',value:0});
	imgControl.filters.deutanomaly = 0;
	chrome.extension.sendMessage({action:'setDeutanomaly',value:0});
	imgControl.filters.tritanomaly = 0;
	chrome.extension.sendMessage({action:'setTritanomaly',value:0});
	imgControl.filters.saturation = 0;
	chrome.extension.sendMessage({action:'setAchromatopsy',value:0});
	imgControl.filters.cataract = 0;
	chrome.extension.sendMessage({action:'setCataract',value:0});
};

window.document.onkeyup = function (e) {
	if (!e) e = event;
	if (e.keyCode == 27){
		killSightCover();
		killFilters();
	}
};
