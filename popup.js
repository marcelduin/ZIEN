//Add Inactive Class To All Accordion Headers
$('.accordion-header').toggleClass('inactive-header');

// The Accordion Effect
$('.accordion-header a').click(function () {
	if($(this).parent().is('.inactive-header')) {
		$('.active-header').toggleClass('active-header').toggleClass('inactive-header').next().slideToggle(300).toggleClass('open-content');
		$(this).parent().toggleClass('active-header').toggleClass('inactive-header')
			.next().slideToggle(300).toggleClass('open-content');
	}
	else {
		$(this).parent().toggleClass('active-header').toggleClass('inactive-header')
			.next().slideToggle(300).toggleClass('open-content');
	}
	return false;
});

$('input[data-role=set-color]').change(changeCD);
$('input[data-role=set-cover]').change(setCover);

refreshSliders();

function setCover(){
	var img = null;
	if(this.value*1) {
		switch(this.id) {
			case 'ret-pigmentosa': img = 'Retinitis-pigmentosa'; break;
			case 'diabetic-ret': img = 'diabetische-retinopathie'; break;
			case 'glaucoom': img = 'glaucoom'; break;
			case 'macula-deg': img = 'macula-degeneratie'; break;
		}
		if(img) img = 'images/'+img+'-'+this.value+'.png';
	}
	chrome.extension.sendMessage({action:'cover',value:img},parseFilters);
};
function changeCD(p) {var p=this.id.replace('slider-','');chrome.extension.sendMessage({action:p,value:this.value});refreshSliders()};
function giveElementFocus(elt){$('[tabindex="0"]').attr('tabindex','');elt.attr('tabindex','0')};
function refreshSliders() {chrome.extension.sendMessage({action:'getCurrentSettings'},parseFilters)};
function parseFilters(d){
	for(var x in d) {
		var $e = null;
		if(x=='cover') {
			if(/^\"/.test(d[x]))d[x]=d[x].substr(1,d[x].length-2);
			var n = 0;
			if(d.cover) {
				n = d.cover.replace(/^.*-(\d)\.png$/,'$1');
				if(/pigmentosa/.test(d.cover)) $e=$('#ret-pigmentosa');
				else if(/diabetische/.test(d.cover)) $e=$('#diabetic-ret');
				else if(/glaucoom/.test(d.cover)) $e=$('#glaucoom');
				else if(/macula/.test(d.cover)) $e=$('#macula-deg');
			}
			else $e = $('input[data-role=set-cover]');
			if($e) $e.val(n)
		}
		else ($e=$('#slider-'+x))[0].value=d[x];
		if($e&&d[x]) {
			var $ct = $e.closest('.accordion-content');
			if(!$ct.hasClass('open-content')) $ct.prev().children('a').click();
		}
	}
};

// Key navigation
document.onkeyup = function(e){if (e.keyCode==8||e.keyCode==46)chrome.extension.sendMessage({action:'cover',value:null},parseFilters)};
