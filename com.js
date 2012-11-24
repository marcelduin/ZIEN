//zien app communication script

chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
  	switch(request.action) {
  		case 'getCurrentSettings':
	  		sendResponse(filters);
	  		break;
	  	case 'setProtanomaly':
	  		setValue('protanomaly',request.value);
	  		break;
	  	case 'setDeutanomaly':
	  		setValue('deutanomaly',request.value);
	  		break;
	  	case 'setTritanomaly':
	  		setValue('tritanomaly',request.value);
	  		break;
	  	case 'setCataract':
	  		setValue('cataract',request.value);
	  		break;
	  	case 'setAchromatopsy':
	  		setValue('achromatopsy',request.value);
	  		break;
  	}
  }
);

function setValue(type,value) {
	chrome.windows.getAll({"populate" : true}, function(windows) {
    for(var i = 0; i < windows.length; i++) {
      for(var j = 0; j < windows[i].tabs.length; j++) {
      	var tab = windows[i].tabs[j];
      	if(/^https?\:\/\//.test(tab.url))
   				chrome.tabs.executeScript(tab.id, {code:"imgControl.filters."+type+" = "+(filters[type]=value*1)});
      }
    }
  });
};

var filters = {
	protanomaly: 0,
	deutanomaly: 0,
	tritanomaly: 0,
	cataract: 0,
	saturation: 1
};
