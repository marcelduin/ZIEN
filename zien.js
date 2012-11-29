//ZIEN
//by marcel@q42.nl

var ws = [0,0],mcoo = [0,0];
window.onmousemove = function(e){mcoo = [(e.clientX/ws[0])*2-1,-(e.clientY/ws[1])*2+1]};
function wResize(){ws = [window.innerWidth,window.innerHeight]};
window.addEventListener('resize',wResize);
wResize();
var blurNodes, imgControl;
var fu = chrome.extension?chrome.extension.getURL('anomalies.svg'):'anomalies.svg';
var ctype = 1;
var blurTypes = {
	random: 1,
	circle: 2
};
var html = document.getElementsByTagName('html')[0];

if(chrome.extension) {
	imgControl = new ImageControl();
	setTimeout(function(){
		chrome.extension.sendMessage({action:'getCurrentSettings'},function(d){
			for(var x in d) imgControl.filters[x]=d[x];
		})
	});
}
else addEventListener('DOMContentLoaded',function(){imgControl = new ImageControl()});

var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function(e){
	if(xhr.readyState==4){
		if(xhr.status!=200) return console.error('Your browser does not support cross-domain XHR!');
		var el = document.createElement('div');
		el.style.display = 'none';
		el.innerHTML = xhr.responseText;
		document.body.appendChild(el);
	}
};
xhr.open('GET',fu,true);
xhr.send(null);

function ImageControl() {
	var sliders = ['protanomaly','deuteranomaly','tritanomaly','cataract','achromatopsy'];

	function redraw(){
		changeColors(
			sls[0].value,
			sls[1].value,
			sls[2].value,
			sls[3].value,
			sls[4].value
		)
	};

	var _cnt = newEl('div','color-control',null,chrome.extension?null:document.body);
	var sls = [];
	var controller=this;
	for(var i=0;i<sliders.length;i++) {
		var _sl = newEl('input',null,null,_cnt);
		_sl.type = 'range';
		_sl.step = 0.1;
		_sl.min = 0;
		_sl.max = 1;
		_sl.title = sliders[i];
		_sl.value = 0;
		if(sliders[i]=='achromatopsy') _sl.value = 1;
		_sl.onchange = redraw;
		sls.push(_sl)
	}

	//this.blurNodes = new BlurNodes(100);

	var _btoggle = newEl('input',null,null,_cnt);
	_btoggle.title = 'blurry nodes';
	_btoggle.type = 'checkbox';
	_btoggle.onchange=function(){controller.blurNodes.running=_btoggle.checked};

	var _btype = newEl('select',null,null,_cnt);
	for(var x in blurTypes) newEl('option',null,x,_btype).value = blurTypes[x];
	_btype.onchange = function(){ctype=Number(_btype.value)};
	_btype.title = 'blurry node type';

	var cover = null;

	this.filters = {
		get protanomaly(){return sls[0].value},
		set protanomaly(v){sls[0].value=v;redraw()},
		get deutanomaly(){return sls[1].value},
		set deutanomaly(v){sls[1].value=v;redraw()},
		get tritanomaly(){return sls[2].value},
		set tritanomaly(v){sls[2].value=v;redraw()},
		get cataract(){return sls[3].value},
		set cataract(v){sls[3].value=v;redraw()},
		get achromatopsy(){return sls[4].value},
		set achromatopsy(v){sls[4].value=1-v*1;redraw()},
		get blurNodes(){return _btoggle.checked},
		set blurNodes(b){_btoggle.checked=b;_btoggle.onchange()},
		get cover(){return cover},
		set cover(u){
			u=u=='null'?null:u;
			if(cover==u) return; cover = u;
			if(u==null) vp.style.display='none';
			else if(/macula/.test(u)) maculaDeg(u);
			else if(/Retinitis/.test(u)) retPigmentosa(u);
			else if(/glaucoom/.test(u)) glaucoom(u);
			else if(/diabetische/.test(u)) diabeticRet(u);
			window[(u!=null?'add':'del')+'Class'](document.body,'re-cursor');
		}
	}
};

function changeColors(prot,deut,trit,cataract,sat) {
	var f = [];

	if(cataract!=0) f.push('blur('+cataract*10+'px) sepia('+cataract*100+'%)');
	if(sat!=1) f.push('saturate('+sat*100+'%)');
	
	//var videos = document.getElementsByTagName('video');
	//for(var i=0;i<videos.length;i++) videos[i].style.webkitFilter = f.length?f.join(' '):null;

	if(prot>0) f.push('url(#prot'+prot*100+')');
	if(deut>0) f.push('url(#deut'+deut*100+')');
	if(trit>0) f.push('url(#trit'+trit*100+')');
	
	var flt = f.length;
	html.style.webkitFilter = flt?f.join(' '):null;
	var allEls = document.getElementsByTagName('div');
	for(var i=0;i<allEls.length;i++) {
		var trans = getComputedStyle(allEls[i],null).getPropertyValue('-webkit-transform');
		if(trans && (flt && trans != 'none'))
			allEls[i].style.webkitTransform = flt?'none':null;
	}
};

function BlurNodes(num) {
	var running = false,
		els = [];

	for(var i=0;i<num;i++)
		els.push(new BlurNode());

	var pt=new Date()*1;
	function drawFrame() {
		if(!running) return;
		var d = new Date()*1;
		for(var i=0;i<els.length;i++) els[i].step(d-pt);
		pt=d;
		requestAnimationFrame(drawFrame)
	};

	this.__defineGetter__('running',function(){return running});
	this.__defineSetter__('running',function(b){
		if(b==running)return;
		if(running=b) drawFrame();
		for(var i=0;i<els.length;i++) els[i].shown = running
	})
};

function BlurNode() {
	var blur = this;
	this._el = newEl('div','blur');
	var shown=false;
	var isbig = Math.random()>0.2;
	var marg = isbig?128:64;
	if(isbig)this._el.className+=' big';
	var shadowRadius = 1+Math.random()*250;
	var size = 0.8+Math.random()*1.2;
	this.mLeft = Math.random();
	this.mTop = Math.random();
	this.depth = 0.05/(shadowRadius/110);
	//el.depth = 1;
	this.blue = Math.round(128*(1-this.depth));
	this.grey = 128-Math.round(Math.random()*128);

	//this._el.style.opacity = Math.random()*0.5;
	//this._el.style.webkitTransform = 'scale('+size+')';
	//this._el.style.boxShadow = '0 0 '+shadowRadius+'px 5px rgba('+this.grey+','+this.grey+','+this.blue+',0.5)';

	var mo = (1+Math.random()*5)*(Math.random()>0.5?1:-1),
		dst = 0.3+Math.random()*0.2,
		deg = Math.random()*360,
		sp = Math.random()/3,
		t=0;

	this.step = function(d) {
		var s = Math.sin((t+=d/200)*sp);
		var nxy = [s*mo,s*mo];
		switch(ctype) {
			case blurTypes.circle:
				nxy[0]+=((mcoo[0]+1)/2+dst*Math.sin(deg/180*Math.PI))*100;
				nxy[1]+=(-(mcoo[1]-1)/2-dst*Math.cos(deg/180*Math.PI))*100;
			break;
			case blurTypes.random:default:
				nxy[0]+=(blur.mLeft+mcoo[0]*blur.depth)*100;
				nxy[1]+=(blur.mTop+-mcoo[1]*blur.depth)*100;
			break
		}
		blur._el.style.left = nxy[0]+'%';
		blur._el.style.top = nxy[1]+'%'
	};

	function getDst(){
		var coo = [(Number(blur._el.style.left.replace(/\%/,''))/100)*2-1,-(Number(blur._el.style.left.replace(/\%/,''))/100)*2+1];
		return Math.sqrt(Math.pow(mcoo[0]-coo[0],2)+Math.pow(mcoo[1]-coo[1],2))
	};

	this.__defineGetter__('shown',function(){return shown});
	this.__defineSetter__('shown',function(b){if(b!=shown) document.body[((shown=b)?'append':'remove')+'Child'](blur._el)})
};

requestAnimationFrame = webkitRequestAnimationFrame;
function getEl(id){return document.getElementById(id)};
function newEl(name,cl,txt,par){var el = document.createElement(name);if(cl)el.className=cl;if(txt&&txt.length)el.textContent=txt;if(par instanceof Element)par.appendChild(el);return el};
function db(i,c,s){if((s=i)&&typeof i=='object'&&!(s=''))for(var x in i) try{s+=x+': '+(i[x] instanceof Function?'function(){..}':i[x])+'\n'}catch(e){};console.log(s)};
