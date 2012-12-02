//zien app communication script
var filters = {
	protanomaly: 0,
	deutanomaly: 0,
	tritanomaly: 0,
	cataract: 0,
	achromatopsy: 0,
	cover: null
};

chrome.extension.onMessage.addListener(
	function(request, sender, sendResponse) {
		switch(request.action) {
			case 'protanomaly':
				setRValue('protanomaly',request.value);
				break;
			case 'deutanomaly':
				setRValue('deutanomaly',request.value);
				break;
			case 'tritanomaly':
				setRValue('tritanomaly',request.value);
				break;
			case 'cataract':
				setRValue('cataract',request.value);
				break;
			case 'achromatopsy':
				setRValue('achromatopsy',request.value);
				break;
			case 'cover':
				setRValue('cover',request.value);
				break;
		}
		if(sendResponse) sendResponse(filters);
	}
);

function setRValue(type,value) {
	for(var x in filters)
		setValue(x,x==type?value:x=='cover'?null:0);
};

function setValue(type,value) {
	if(filters[type]==value) return;
	filters[type]=(type!='cover'?value*1:value!=null?'"'+value+'"':null);
	chrome.windows.getAll({"populate" : true}, function(windows) {
		for(var i = 0; i < windows.length; i++) {
			for(var j = 0; j < windows[i].tabs.length; j++) {
				var tab = windows[i].tabs[j];
				if(/^https?\:\/\//.test(tab.url))
					chrome.tabs.executeScript(tab.id, {code:"imgControl.filters."+type+" = "+filters[type]});
			}
		}
	});
};
