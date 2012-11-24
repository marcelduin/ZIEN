/*chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log('red = ' + request.redColor);
    imgControl.filters.red = parseFloat(request.redColor);
    console.log('blue = ' + request.blueColor);
    imgControl.filters.blue = request.blueColor;
    console.log('green = ' + request.greenColor);
    imgControl.filters.green = request.greenColor;
  });*/

var vp = document.createElement('div');
vp.id = 'sight-cover';
vp.style.position = 'fixed';
vp.style.zIndex = 999;
vp.style.top = 0;
vp.style.left = 0;
vp.style.width = '100%';
vp.style.height = '100%';
document.body.appendChild(vp);

//var mcoo = [0,0];
//window.onmousemove = function(e){mcoo = [(e.clientX/ws[0])*2-1,-(e.clientY/ws[1])*2+1]};

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
	vp.style.backgroundImage = 'url('+u+')';
	vp.style.display = 'block';
	vp.style.zIndex = 2147483647;
	vp.style.width = '100%';
	vp.style.height = '100%';
	vp.style.margin = '0px';

}

function diabeticRet(imgURL){
	var u = chrome.extension.getURL(imgURL);
	vp.className = 'diabetic-ret';
	setCover(u);
	vp.style.width = 1.5*ws[0]+'px';
	vp.style.height = 1.5*ws[1]+'px';
	vp.style.margin = (-0.25*ws[1])+'px 0 0 '+(-0.25*ws[0])+'px';
}

function retPigmentosa(imgURL){
	var u = chrome.extension.getURL(imgURL);
	vp.className = 'ret-pigmentosa';
	setCover(u);
}

function glaucoom(imgURL){
	var u = chrome.extension.getURL(imgURL);
	vp.className = 'glaucoom';
	setCover(u);
}


function maculaDeg(imgURL){
	var u = chrome.extension.getURL(imgURL);
	vp.className = 'macula-deg';
	setCover(u);
	//vp_width = document.getElementById("viewport-img").offsetWidth;
	//vp_height = document.getElementById("viewport-img").offsetHeight;
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