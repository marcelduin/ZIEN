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
//vp.style.display = 'none';
vp.style.position = 'fixed';
vp.style.zIndex = 999;
vp.style.top = 0;
vp.style.left = 0;
vp.style.width = '100%';
vp.style.height = '100%';
//vp.style.border = '1px solid red';
document.body.appendChild(vp);

//var mcoo = [0,0];
//window.onmousemove = function(e){mcoo = [(e.clientX/ws[0])*2-1,-(e.clientY/ws[1])*2+1]};

var See = {};

See.fps = 50;

See.run = (function() {
  var loops = 0, skipTicks = 1000 / See.fps,
      maxFrameSkip = 10,
        nextGameTick = (new Date).getTime();

  return function() {
    
  	document.getElementById("sight-cover").style.left = (0.4*mcoo[0]*ws[0])+'px';
	document.getElementById("sight-cover").style.top = (-0.4*mcoo[1]*ws[1])+'px';
    
  };
  
})();

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
	document.getElementById("sight-cover").style.backgroundImage = 'url('+u+')';
	document.getElementById("sight-cover").style.display = 'block';
	document.getElementById("sight-cover").style.zIndex = 2147483647;

}

function diabeticRet(imgURL){
	var u = chrome.extension.getURL(imgURL);
	document.getElementById("sight-cover").className = 'diabetic-ret';
	setCover(u);
}

function retPigmentosa(imgURL){
	var u = chrome.extension.getURL(imgURL);
	document.getElementById("sight-cover").className = 'ret-pigmentosa';
	setCover(u);
}

function glaucoom(imgURL){
	var u = chrome.extension.getURL(imgURL);
	document.getElementById("sight-cover").className = 'glaucoom';
	setCover(u);
}


function maculaDeg(imgURL){
	var u = chrome.extension.getURL(imgURL);
	document.getElementById("sight-cover").className = 'macula-deg';
	setCover(u);
	//vp_width = document.getElementById("viewport-img").offsetWidth;
	//vp_height = document.getElementById("viewport-img").offsetHeight;
}

function killSightCover(){
	document.getElementById("sight-cover").style.display = 'none';
	CursorCrosshair(false);
}

window.document.onkeyup = function (e)
{
	if (!e)
		e = event;

	if (e.keyCode == 27)
		killSightCover();
}