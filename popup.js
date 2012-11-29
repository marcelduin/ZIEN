var currentFilter;

$(function() {
	//Add Inactive Class To All Accordion Headers
	$('.accordion-header').toggleClass('inactive-header');
	
	// The Accordion Effect
	$('.accordion-header a').click(function () {
		if($(this).parent().is('.inactive-header')) {
			$('.active-header').toggleClass('active-header').toggleClass('inactive-header').next().slideToggle(300).toggleClass('open-content');
			$(this).parent().toggleClass('active-header').toggleClass('inactive-header');
			$(this).parent().next().slideToggle(300).toggleClass('open-content');
			currentFilter = $(this).parent().next().find('input[type="range"]').attr('id');
		}
		
		else {
			$(this).parent().toggleClass('active-header').toggleClass('inactive-header');
			$(this).parent().next().slideToggle(300).toggleClass('open-content');
		}
		return false;
	});
	
	return false;
});

document.getElementById('slider-protanomaly').onchange = function(){
	chrome.extension.sendMessage({action:'setProtanomaly',value:this.value});
	refreshSliders();
};
document.getElementById('slider-deutanomaly').onchange = function(){
	chrome.extension.sendMessage({action:'setDeutanomaly',value:this.value});
	refreshSliders();
};
document.getElementById('slider-tritanomaly').onchange = function(){
	chrome.extension.sendMessage({action:'setTritanomaly',value:this.value});
	refreshSliders();
};
document.getElementById('slider-achromatopsy').onchange = function(){
	chrome.extension.sendMessage({action:'setAchromatopsy',value:this.value});
	refreshSliders();
};
document.getElementById('slider-cataract').onchange = function(){
	chrome.extension.sendMessage({action:'setCataract',value:this.value});
	refreshSliders();
};

function refreshSliders() {
	chrome.extension.sendMessage({action:'getCurrentSettings'},function(d){
		var cover = d.cover;
		delete d.cover;
		for(var x in d) document.getElementById('slider-'+x).value=d[x];
	});
};
refreshSliders();

function setCover(url) {chrome.extension.sendMessage({action:'setCover',value:url});return false};

$('#ret-pigmentosa a').bind('click focus', function(){return setCover('images/Retinitis-pigmentosa-'+this.textContent+'.png')});
$('#diabetic-ret a').bind('click focus', function(){return setCover('images/diabetische-retinopathie-'+this.textContent+'.png')});
$('#glaucoom a').bind('click focus', function(){return setCover('images/glaucoom-'+this.textContent+'.png')});
$('#macula-deg a').bind('click focus', function(){return setCover('images/macula-degeneratie-'+this.textContent+'.png')});

function giveElementFocus(elt){
	$('[tabindex="0"]').attr('tabindex','');
	elt.attr('tabindex','0');
};

// Key navigation
window.document.onkeyup = function (e) {
	e = e || event;
	if (e.keyCode == 8 || e.keyCode == 46)
		chrome.extension.sendMessage({action:'setCover',value:null});
}

$('.stadia a').click(function(){
	var cross = $(this).parent().parent().hasClass('cursor-crosshair');
	chrome.tabs.getSelected(null, function(tab) {
		chrome.tabs.executeScript(tab.id, {code:"CursorCrosshair("+cross+")"});
	});
});

