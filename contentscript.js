var vp = document.createElement('div');
vp.id = 'sight-cover';
document.body.appendChild(vp);

var See = {};

See.fps = 50;

var targetX = 0;
var targetY =0;

See.run = function() {
	vp.style.left = (0.2*mcoo[0]*ws[0])+'px';
	vp.style.top = (-0.2*mcoo[1]*ws[1])+'px';
};

(function loop(){
       See.run();
       webkitRequestAnimationFrame(loop);
})();

var vp_width = 0, vp_height = 0; 

function CursorCrosshair(val){
	//console.log('change cursor');
	var currentClass = String(document.body.getAttribute("class"));
	if(val == true && currentClass.indexOf("re-cursor")<0){
		var newClass = currentClass + " re-cursor";
		if(currentClass=="null") {
			var newClass = "re-cursor";
		}
		document.body.setAttribute("class", newClass);
	}else if(val == false && currentClass.indexOf("re-cursor")>=0){
		console.log(currentClass);
		var newClass = currentClass.replace("re-cursor","");
		document.body.setAttribute("class", newClass);
	}
}

function setCover(u){
	if(!u) return killSightCover();
	u = chrome.extension.getURL(u);
	vp.style.backgroundImage = 'url('+u+')';
	vp.style.display = 'block';
}

function diabeticRet(imgURL){
	vp.className = 'diabetic-ret';
	setCover(imgURL);
}

function retPigmentosa(imgURL){
	vp.className = 'ret-pigmentosa';
	setCover(imgURL);
}

function glaucoom(imgURL){
	vp.className = 'glaucoom';
	setCover(imgURL);
}


function maculaDeg(imgURL){
	vp.className = 'macula-deg';
	setCover(imgURL);
}

function killSightCover(){
	vp.style.display = 'none';
	CursorCrosshair(false);
}

window.document.onkeyup = function (e)
{
	if (!e)
		e = event;

	if (e.keyCode == 27)
		killSightCover();
}