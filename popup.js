$(document).ready(function()
{
	//Add Inactive Class To All Accordion Headers
	$('.accordion-header').toggleClass('inactive-header');
	
	// The Accordion Effect
	$('.accordion-header a').click(function () {
		if($(this).parent().is('.inactive-header')) {
			$('.active-header').toggleClass('active-header').toggleClass('inactive-header').next().slideToggle(300).toggleClass('open-content');
			$(this).parent().toggleClass('active-header').toggleClass('inactive-header');
			$(this).parent().next().slideToggle(300).toggleClass('open-content');
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
};
document.getElementById('slider-deutanomaly').onchange = function(){
	chrome.extension.sendMessage({action:'setDeutanomaly',value:this.value});
};
document.getElementById('slider-tritanomaly').onchange = function(){
	chrome.extension.sendMessage({action:'setTritanomaly',value:this.value});
};
document.getElementById('slider-achromatopsy').onchange = function(){
	chrome.extension.sendMessage({action:'setAchromatopsy',value:this.value});
};
document.getElementById('slider-cataract').onchange = function(){
	chrome.extension.sendMessage({action:'setCataract',value:this.value});
};

chrome.extension.sendMessage({action:'getCurrentSettings'},function(d){
	for(var x in d) document.getElementById('slider-'+x).value=d[x];
});


var aClicked = false;
$('#diabetic-ret a').bind('click focus', function(e){
	var num = $(this).html();
	var img = 'images/diabetische-retinopathie-'+num+'.png';
	chrome.tabs.getSelected(null, function(tab) {
		chrome.tabs.executeScript(tab.id, {code:"diabeticRet('"+img+"')"});
		//chrome.tabs.update(tab.id, {selected: true});
	});
	chrome.extension.sendMessage({action:'setCover',value:img});
	//giveElementFocus($(this));
	return false;
});
$('#ret-pigmentosa a').bind('click focus', function(){
	var num = $(this).html();
	var img = 'images/Retinitis-pigmentosa-'+num+'.png';
	chrome.tabs.getSelected(null, function(tab) {
		chrome.tabs.executeScript(tab.id, {code:"retPigmentosa('"+img+"')"});
		//chrome.tabs.update(tab.id, {selected: true});
	});
	//giveElementFocus($(this));
	chrome.extension.sendMessage({action:'setCover',value:img});
	return false;
});
$('#glaucoom a').bind('click focus', function(){
	var num = $(this).html();
	var img = 'images/glaucoom-'+num+'.png';
	chrome.tabs.getSelected(null, function(tab) {
		chrome.tabs.executeScript(tab.id, {code:"glaucoom('"+img+"')"});
		//chrome.tabs.update(tab.id, {selected: true});
	});
	//giveElementFocus($(this));
	chrome.extension.sendMessage({action:'setCover',value:img});
	return false;
});
$('#macula-deg a').bind('click focus', function(){
	var num = $(this).html();
	var img = 'images/macula-degeneratie-'+num+'.png';
	chrome.tabs.getSelected(null, function(tab) {
		chrome.tabs.executeScript(tab.id, {code:"maculaDeg('"+img+"')"});
		//chrome.tabs.update(tab.id, {selected: true});
	});
	//giveElementFocus($(this));
	chrome.extension.sendMessage({action:'setCover',value:img});
	return false;
});

function giveElementFocus(elt){
	$('[tabindex="0"]').attr('tabindex','');
	elt.attr('tabindex','0');
}

// Key navigation
window.document.onkeyup = function (e)
{
	if (!e)
		e = event;

	if (e.keyCode == 8 || e.keyCode == 46) {
		chrome.tabs.getSelected(null, function(tab) {
			chrome.tabs.executeScript(tab.id, {code:"killSightCover()"});
			//chrome.tabs.update(tab.id, {selected: true});
		});
	}

}

$('.stadia a').click(function(){
	if($(this).parent().parent().hasClass('cursor-crosshair')) {
		chrome.tabs.getSelected(null, function(tab) {
			chrome.tabs.executeScript(tab.id, {code:"CursorCrosshair(true)"});
			//chrome.tabs.update(tab.id, {selected: true});
		});
		//$('*').css({cursor:'crosshair'});
	} else {
		chrome.tabs.getSelected(null, function(tab) {
			chrome.tabs.executeScript(tab.id, {code:"CursorCrosshair(false)"});
		});
		//$('*').css({cursor:'default'});
	}
	
});

