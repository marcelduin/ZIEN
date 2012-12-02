var currentFilter;

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

var $ret = $('#ret-pigmentosa a').bind('click focus', function(){return setCover('images/Retinitis-pigmentosa-'+this.textContent+'.png',this)});
var $dia = $('#diabetic-ret a').bind('click focus', function(){return setCover('images/diabetische-retinopathie-'+this.textContent+'.png',this)});
var $gla = $('#glaucoom a').bind('click focus', function(){return setCover('images/glaucoom-'+this.textContent+'.png',this)});
var $mac = $('#macula-deg a').bind('click focus', function(){return setCover('images/macula-degeneratie-'+this.textContent+'.png',this)});
$('#slider-protanomaly,#slider-deutanomaly,#slider-tritanomaly,#slider-achromatopsy,#slider-cataract').change(changeSlider);

refreshSliders();

function setCover(url,_) {
	chrome.extension.sendMessage({action:'cover',value:url},parseFilters);
	$(_).addClass('active').parent().siblings().children('a').removeClass('active');
	return false;
};
function changeSlider(p) {var p=this.id.replace('slider-','');chrome.extension.sendMessage({action:p,value:this.value});refreshSliders()};
function giveElementFocus(elt){$('[tabindex="0"]').attr('tabindex','');elt.attr('tabindex','0')};
function refreshSliders() {chrome.extension.sendMessage({action:'getCurrentSettings'},parseFilters)};
function parseFilters(d){
	console.log('parse..',d);
	for(var x in d) {
		var $e = null;
		if(x=='cover') {
			if(!d.cover) { $('a.active').removeClass('active'); continue; }
			var n = d.cover.replace(/^\".*-(\d)\.png\"$/,'$1');
			if(/pigmentosa/.test(d.cover)) $e=$ret;
			else if(/diabetische/.test(d.cover)) $e=$dia;
			else if(/glaucoom/.test(d.cover)) $e=$gla;
			else if(/macula/.test(d.cover)) $e=$mac;
			if(n&&$e&&d[x]) $e.filter('a:contains('+n+')').addClass('active');
		}
		else {
			$e = $('#slider-'+x);
			$e[0].value=d[x];
		}
		if(d[x]) {
			var $ct = $e.closest('.accordion-content');
			if(!$ct.hasClass('open-content')) $ct.prev().children('a').click();
		}
	}
};

// Key navigation
window.document.onkeyup = function (e) {
	e = e || event;
	if (e.keyCode == 8 || e.keyCode == 46)
		chrome.extension.sendMessage({action:'setCover',value:null});
}
