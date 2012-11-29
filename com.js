//zien app communication script

chrome.extension.onMessage.addListener(
	function(request, sender, sendResponse) {
		switch(request.action) {
			case 'getCurrentSettings':
				sendResponse(filters);
				break;
			case 'setProtanomaly':
				setRValue('protanomaly',request.value);
				break;
			case 'setDeutanomaly':
				setRValue('deutanomaly',request.value);
				break;
			case 'setTritanomaly':
				setRValue('tritanomaly',request.value);
				break;
			case 'setCataract':
				setRValue('cataract',request.value);
				break;
			case 'setAchromatopsy':
				setRValue('achromatopsy',request.value);
				break;
			case 'setCover':
				setRValue('cover',request.value);
				break;
		}
	}
);

function setRValue(type,value) {
	for(var x in filters)
		setValue(x,x==type?value:type=='cover'?null:0);
};

function setValue(type,value) {
	if(filters[type]==value) return;
	chrome.windows.getAll({"populate" : true}, function(windows) {
		for(var i = 0; i < windows.length; i++) {
			for(var j = 0; j < windows[i].tabs.length; j++) {
				var tab = windows[i].tabs[j];
				if(/^https?\:\/\//.test(tab.url))
					chrome.tabs.executeScript(tab.id, {code:"imgControl.filters."+type+" = "+(filters[type]=(type!='cover'?value*1:'"'+value+'"'))});
			}
		}
	});
};

var filters = {
	protanomaly: 0,
	deutanomaly: 0,
	tritanomaly: 0,
	cataract: 0,
	achromatopsy: 0,
	cover: null
};
