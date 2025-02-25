import {buildExternalHelpers} from "@babel/core";

/**
 * @returns HTMLElement
*/
function create(element)
{
	return document.createElement(element)
}

export class Validator
{
	#form
	#executable
	#executableS
	#singleExecution
	#isValid
	#conditions
	/**
	 *
	 * @param form {HTMLElement}
	 * @param executableFailure {Function}
	 * @param executableSuccess {Function}
	 * @param singleExecution {Boolean}
	 * @param conditions {Object}
	 */
	constructor(form, executableFailure, executableSuccess = null, singleExecution= false, conditions = {})
	{
		this.#form = form;
		this.#executable = executableFailure;
		this.#executableS = executableSuccess
		this.#singleExecution = singleExecution;
		this.#conditions = conditions
	}

	#isInputAndRequired(item)
	{
		return (item.tagName.toLowerCase() === 'input'
			&& item.type.toLowerCase() !== 'button'
			&& item.type.toLowerCase() !== 'submit'
			&& item.type.toLowerCase() !== 'reset'
			&& item.type.toLowerCase() !== 'image'
			&& item.getAttribute('required') !== null);
	}


	validate()
	{
		let globalValidity = true
		for(const item of this.#form.getElementsByTagName('input'))
		{
			const type = item.type;
			this.#isValid = true
			if (this.#isInputAndRequired(item))
			{
				if (item.type.toLowerCase() === 'file' && item.files.length === 0)
					this.#isValid = globalValidity = false
				else if ((item.type.toLowerCase() === 'radio' || item.type.toLowerCase() === 'checkbox') && !item.checked)
					this.#isValid = globalValidity = false
				else if (item.value === '')
					this.#isValid = globalValidity = false
				if (item.getAttribute('condition') !== null && !this.#conditions[item.getAttribute('condition')](item))
					this.#isValid = globalValidity = false

				if (!this.#isValid)
				{
					if (!this.#singleExecution)
						this.#executable(item, type)
					else
						break
				}
				if (this.#isValid)
				{
					if (!this.#singleExecution && this.#executableS !== null)
						this.#executableS(item, type)
					else
						break
				}
			}
		}
		if (!globalValidity)
		{
			if (this.#singleExecution)
				this.#executable()
			return false
		} else
			return true
	}
}

export class Preferences
{
	static instance = null
	/**
	 * @type {object}
	 * **/
	#userPreference;
	constructor() {
		this.#userPreference = {}
		if (localStorage.getItem('b_preferences') !== null)
			this.#userPreference = JSON.parse(localStorage.getItem('b_preferences'))
		if (Preferences.instance !== null)
			return Preferences.instance
		Preferences.instance = this;
	}

	/**
	 * @param {String} name
	 * @param {String} value
	 */
	add(name, value)
	{
		this.#userPreference[name]=value;
		localStorage['b_preferences'] = JSON.stringify(this.#userPreference)
	}

	/**
	 * @param {String} name
	 * @returns {String|null}
	 */
	get(name)
	{
		if (this.#userPreference.hasOwnProperty(name))
			return this.#userPreference[name]
		return null
	}

	delete(name)
	{
		if (this.#userPreference.hasOwnProperty(name))
		{
			delete this.#userPreference[name]
			localStorage['b_preferences'] = JSON.stringify(this.#userPreference)
			return true
		}
		return false
	}
}

export async function Fingerprint() {
	// Canvas fingerprinting
	const canvasFingerprint = getCanvasFingerprint();
  
	// WebGL fingerprinting
	const webglFingerprint = getWebGLFingerprint();
  
	// System information
	const systemInfo = [
	  navigator.userAgent,
	  [screen.width, screen.height, screen.colorDepth].join('x'),
	  navigator.language,
	  Intl.DateTimeFormat().resolvedOptions().timeZone,
	  navigator.platform,
	  navigator.hardwareConcurrency,
	  navigator.deviceMemory,
	  navigator.maxTouchPoints,
	];
  
	// Browser plugins
	const plugins = Array.from(navigator.plugins).map(p => p.name).join(',');
  
	// Installed fonts (limited detection)
	const fonts = detectFonts();
  
	// Battery status (if available)
	const batteryInfo = await getBatteryInfo();
  
	const fingerprintComponents = [
	  ...systemInfo,
	  canvasFingerprint,
	  webglFingerprint,
	  plugins,
	  fonts,
	  batteryInfo,
	];
  
	const fingerprintString = fingerprintComponents.join('###');
	const encoder = new TextEncoder();
	const data = encoder.encode(fingerprintString);
	const hashBuffer = await crypto.subtle.digest('SHA-256', data);
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	const fingerprintHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
	return fingerprintHash;
  }
  
  function getCanvasFingerprint() {
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');
	ctx.textBaseline = 'top';
	ctx.font = '14px Arial';
	ctx.textBaseline = 'alphabetic';
	ctx.fillStyle = '#f60';
	ctx.fillRect(125, 1, 62, 20);
	ctx.fillStyle = '#069';
	ctx.fillText('fingerprint', 2, 15);
	ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
	ctx.fillText('fingerprint', 4, 17);
	return canvas.toDataURL();
  }
  
  function getWebGLFingerprint() {
	const canvas = document.createElement('canvas');
	const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
	if (!gl) return 'WebGL not supported';
  
	const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
	return debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : 'WebGL fingerprint not available';
  }
  
  function detectFonts() {
	const baseFonts = ['monospace', 'sans-serif', 'serif'];
	const fontList = [
	  'Arial', 'Helvetica', 'Times New Roman', 'Courier', 'Verdana', 'Georgia', 'Palatino', 'Garamond',
	  'Bookman', 'Comic Sans MS', 'Trebuchet MS', 'Arial Black', 'Impact'
	];
  
	const d = document.createElement('div');
	d.style.visibility = 'hidden';
	d.style.position = 'absolute';
	d.style.top = '-10000px';
	d.style.left = '-10000px';
	d.style.fontSize = '12px';
	d.innerHTML = 'abcdefghijklmnopqrstuvwxyz0123456789';
	document.body.appendChild(d);
  
	const detectedFonts = fontList.filter(font => {
	  let detected = false;
	  for (let i = 0; i < baseFonts.length; i++) {
		d.style.fontFamily = `${font},${baseFonts[i]}`;
		if (d.offsetWidth !== baseFonts.map(baseFont => {
		  d.style.fontFamily = baseFont;
		  return d.offsetWidth;
		})[i]) {
		  detected = true;
		  break;
		}
	  }
	  return detected;
	});
  
	document.body.removeChild(d);
	return detectedFonts.join(',');
  }
  
  async function getBatteryInfo() {
	if ('getBattery' in navigator) {
	  try {
		const battery = await navigator.getBattery();
		return `${battery.charging},${battery.level}`;
	  } catch (e) {
		return 'Battery API not supported';
	  }
	}
	return 'Battery API not available';
  }

export let prefs = new Preferences();

if (!prefs.get('language'))
	prefs.add("language", navigator.language.split('-')[0])
export const app = getId("App");
export const api = "http://localhost:3000";

export function getId(id)
{
	return document.getElementById(id)
}

export function getSelector(selector)
{
	return document.querySelectorAll(selector);
}

export function list(data=[], styleClass, unordered = true, id = null)
{
	let lst;
	if (unordered)
		lst =  create('ul');
	else
		lst =  create('ol');

	if (id !== null)
		lst.id = id

	lst.className = styleClass
	for (const i of data) {
		const li = create('li');
		li.textContent = i;
		lst.appendChild(li);
	}

	return lst
}

export function object(data, type)
{
	let obj = create('object');

	obj.data = data;
	obj.type = type;

	return obj
}

export function paragraph(id, styleClass, textContent)
{
	let p = create('p');

	if (textContent.substring(0, 7).toLowerCase() === '%bcode%')
	{
		textContent = textContent.substring(7, textContent.length)
		p = bcode(textContent)

	}
	else if (textContent.substring(0, 6).toLowerCase() === '%html%')
		p.innerHTML = textContent.substring(6, textContent.length)
	else
		p.textContent = textContent
	if (id)
		p.id = id;
	if(styleClass)
		p.className = styleClass;
	return p;
}

export function jsonFile(path, success, error)
{
	let xhr = new XMLHttpRequest();
	xhr.open('GET', path, false);
	xhr.onreadystatechange = ()=>{
		if (xhr.status === 200)
			success(xhr.responseText);
		else
			error(xhr.statusText, xhr.responseText)
	}
	xhr.send()
}

export function	textBox(id ,hint, type, styleClass)
{
	let text = create("input");

	text.type = type;
	if (id !== null)
		text.id = id;
	text.placeholder = hint;
	text.className = styleClass;

	return text;
}

export function image(id, styleClass, source)
{
	let img = create("img");

	if (id !== null)
		img.id = id;
	img.className = styleClass;
	img.src = source;
	img.alt = ''

	return img;
}

export function block(id, styleClass, childs)
{
	let block = create("div");

	if (id !== null)
		block.id = id;
	block.className = styleClass;
	if (childs !== null && childs !== undefined)
	{
		childs.forEach(child => {
			block.append(child);
		});
	}
	return block;
}

export function button(id, styleClass, textValue, html)
{
	let button = create("button");

	if (id !== null)
		button.id = id;
	button.className = styleClass;
	if(textValue !== null)
		button.textContent = textValue;
	else if (html !== null)
		button.innerHTML = html;

	button.title = '';
	return button;
}

export function heading(number, styleClass, textContent)
{
	let heading = create("h"+number);

	if (styleClass !== null)
		heading.className = styleClass;
	heading.textContent = textContent;

	return heading;
}

export function anchor(id, styleClass, href, textContent)
{
	let a = create('a');

	if (id)
		a.id = id;
	if (styleClass)	
		a.className = styleClass;
	a.href = href;
	a.textContent = textContent

	return a;
}

export function textArea(id, styleClass, hint)
{
	let ta = create("textarea");

	if (id)
		ta.id = id;
	ta.className = styleClass;
	ta.placeholder = hint;

	return ta;
}

export function brdige(endpoint, method, formdata, success, err) {
	let xhr = new XMLHttpRequest();

	if (method === "GET" || method === "DELETE") {
		let params = new URLSearchParams();
		formdata.forEach((value, key) => {
			params.append(key, value);
		});

		endpoint += "?" + params.toString();
		xhr.open(method, api + endpoint);
		xhr.withCredentials = true;

		xhr.onload = function() {
			if (xhr.status === 200 && xhr.readyState === 4) {
				success(xhr.responseText);
			} else {
				err(xhr.status);
			}
		};

		xhr.send();  // No need to send formdata for GET/DELETE
	} else if (method === "POST" || method === "PUT") {
		xhr.open(method, api + endpoint);
		xhr.withCredentials = true;

		xhr.onload = function() {
			if (xhr.status === 200 && xhr.readyState === 4) {
				success(xhr.responseText);
			} else {
				err(xhr.status);
			}
		};

		xhr.send(formdata);  // formdata is sent as the request body for POST/PUT
	} else {
		throw new Error("Unsupported HTTP method");
	}
}


export function Option(value, text)
{
	let option = create("option");

	option.value = value;
	option.textContent = text;

	return option;
}

export function select(id, styleClass, options = null)
{
	let sel = create("select");

	if (id !== null)
		sel.id = id;
	if (styleClass !== null)
		sel.className = styleClass;
	if (options !== null)
	{
		options.forEach(opt => {
			let option = Option(opt.value, opt.text);
			sel.append(option);
		})
	}
	return sel;
}

export function table(id, styleclass, rows)
{
	let t = create('table');

	if (id)
		t.id = id
	t.className = styleclass;

	if (rows)
		rows.forEach(row=>{
			t.append(row);
		})

	return t;
}

export function tableRow(id, styleclass, data)
{
	let t = create('tr');

	if (id)
		t.id = id
	t.className = styleclass;

	if (data)
		data.forEach(d=>{
			t.append(d);
		})

	return t;
}

export function tableData(id, styleclass, value)
{
	let t = create('td');

	if (id)
		t.id = id
	t.className = styleclass;
	if (typeof value === 'string')
		t.textContent = value;
	else
		t.append(value)

	return t;
}

export function label(styleClass, value)
{
	let lab = document.createElement("span");

	lab.textContent = value;
	lab.className = styleClass;

	return lab;
}

export function audio(id, styleClass, src)
{
	let aud = create('audio');

	if (id)
		aud.id = id;
	if (styleClass)
		aud.className = styleClass;
	aud.src = src;
	return aud;
}

export function canvas(styleClass)
{
	let canv = document.createElement("canvas");
	canv.className = styleClass;

	return canv;
}

export function isArabic(str)
{
	var arabic = /[\u0600-\u06FF]/;

	if(arabic.test(str))
		return true;
	return false;
}
export function toBase64(file, callback)
{
	let reader = new FileReader();
	reader.onload = function(evt)
	{
		callback(evt.target.result);
	}
	reader.readAsDataURL(file);
}

export function resizeImage(base64, callback,options = {width: 200})
{
	let canv = canvas('builderSpecialCanvas'),
		image = new Image();

	canv.width = options.width;
	image.onload = function(){
		canv.height = options.width * (image.height/image.width);
		let height = canv.height;
		canv.getContext('2d').drawImage(image, 0, 0, options.width, height);
		callback(canv.toDataURL('image/jpeg', 1));
	}
	image.src = base64;
}

export function entrypoit(callback)
{
	document.onreadystatechange = function()
	{
		if (document.readyState === "complete")
			callback()
	}
}

export function alert(message, yesText, noText, okCallback, noCallback)
{
	let messageText = label('alertMessage', message),
		ok = button(null, 'alertOKEY alertButton', yesText, null),
		no = button(null, 'alertNO alertButton', noText, null),
		alertContainer = block('alertContainer', 'alertContainer', [messageText, ok, no]),
		platform = block('alertPlatform', 'builderAlert', [alertContainer]);

	app.append(platform);
	no.onclick = ()=>{
		noCallback(platform);
	}
	ok.onclick = ()=>{
		okCallback(platform);
	}
}

export function insertStyle(path)
{
	let link = document.createElement('link');

	link.rel = "stylesheet";
	link.href = path+"?v="+Math.random();

	document.head.append(link);
}
export function insertScript(path, type)
{
	let script = document.createElement('script');

	script.type = type;
	script.src = path+"?v="+Math.random();

	document.body.append(script);
}


export class Errors
{
	static exists = 100;
    static wrongCredential = 101;
	static failure = 102;
	static invalidSession = 103;
	static validSession = 104;
}

/**
 * 
 * @param {Component} component 
 * @param {string} textContent
 * @param {string} path
 * @param {string} id 
 * @param {string} styleClass 
 * @param {string} mode 
 * @returns {HTMLElement}
 */
export function toRoute(path, textContent, mode=null, id=null, styleClass=null)
{
	let a = create('a');

	if (id)
		a.id = id;
	if (styleClass)
		a.className = styleClass;
	if (mode === 'append')
	{
		path = location.pathname + path
	}

	a.textContent = textContent;
	a.onclick = (e)=>{

		e.preventDefault()
		history.pushState('', '', path);
	}

	return a;
}

export class Component
{
	/**
	 * @type {HTMLElement} component
	 * @type {string} path
	 * @type {Component []} subroutes
	 * @type {Component []} connectedComponents
	 * @type {HTMLElement} implementationPoint
	 */
	component;
	path;
	subroutes;
	connectedComponents;
	implementationPoint;
	subrouteOnPath
	hasQueryParams

	constructor()
	{
		this.component = null;
		this.path = null;
		this.hasQueryParams = false
		this.subroutes = [];
		this.implementationPoint = null
		this.subrouteOnPath = false
		this.connectedComponents = {}
	}

	/**
	 * 
	 * @param {Component} subroute 
	 */
	addSubroute(subroute)
	{
		this.subroutes.push(subroute);
	}

	create()
	{this.component = null;}

	getHTML(){return this.component;}

	rerender()
	{
		let old = this.component
		this.create()
		old.replaceWith(this.component)
		if (old.parentNode)
		old.parentNode.removeChild(old)
	}

	findRoute(route)
	{
		const path = route
		if (this.path === path)
			return this
		else
		{
			for (const sub of this.subroutes)
			{
				if (sub.path === path)
					return sub
				else if (sub.hasQueryParams === true)
					return sub
			}
		}
		return null
	}

	/**
	 * 
	 * @param {string []} routes 
	 */
	hasRoute(routes)
	{
		let path = routes[0];

		this.subroutes.forEach(sub =>{
			if (sub.component.parentNode === this.component)
				this.component.removeChild(sub.component);
		})

		if (routes.length > 1)
		{
			routes = routes.slice(1);
			for (let i = 0; i < this.subroutes.length; i++) {
				routes.forEach(route=>{
					if (this.subroutes[i].path === route)
					{
						this.component.append(this.subroutes[i].getHTML());
						return this.subroutes[i];
					}
				})
				let res = (this.subroutes[i]).hasRoute(routes);
				if (res){
					this.component.append(res)
					return this;
				}
			}
			return null
		}
		else if (this.path === path)
		{
			this.subroutes.forEach(sub =>{
				if (sub.component.parentNode === this.component)
					this.component.removeChild(sub.component);
			})
			return this;
		}
		else
			return null;
	}
}

function riseEvent(target, eventName, ...params)
{
	target[eventName](...params)
}

export class Dropdown extends Component
{
	#id;
	#styleClass;
	#icon
	#state;
	#value;
	#htmlItems;
	#Items
	#currentValue;
	#adapter
	static OPEN = 1
	static CLOSE = 0

	constructor(id=null, styleClass, dropIcon = null, Items=[], adapterCallback=null) {
		super();
		if (styleClass === null)
		{
			console.error('styleClass attribute must be defined.');
			return undefined;
		}
		if (Items.length === 0)
		{
			console.error('Items must be defined.');
			return undefined;
		}
		if (!adapterCallback && typeof adapterCallback !== Function)
		{
			console.error('An adapter must be specified');
			return undefined;
		}
		if (!dropIcon){
			console.error('The dropdown icon must be specified [innerHTML]');
			return undefined;
		}

		this.#id = id;
		this.#styleClass = styleClass;
		this.#value = Items[0].value;
		this.#htmlItems = []
		this.#state = Dropdown.CLOSE
		this.#icon = dropIcon
		this.#Items = Items
		this.#adapter = adapterCallback
		this.#Items.forEach(item=>{
			this.#htmlItems.push(adapterCallback(item))
		})
		this.create()
	}

	rerender()
	{
		let old = this.component
		this.create()
		if (old.parentNode)
		old.parentNode.replaceChild(this.component, old)
	}

	#getValue(value)
	{
		return this.#htmlItems.find(item => item.getAttribute('itemValue') === value)
	}

	setValue(value)
	{
		const item = this.#getValue(value)
		if (this.#getValue(value) !== undefined)
		{
			this.#currentValue.replaceChildren(item.cloneNode(true))
			riseEvent(this, 'onChange', item.getAttribute('itemValue'), item.textContent)
		}
	}

	updateItems(items = [])
	{
		if (items.length > 0)
		{
			this.#Items = items
			this.#htmlItems = []
			this.#Items.forEach(item=>{
				this.#htmlItems.push(this.#adapter(item))
			})
			this.rerender()
		}
	}

	// Here I have to check if the cookie is set to a lang other than the default
	// then implement the adapterCallback to create list of items from [Items]
	create() {
		let icon = button(null, 'b_dropIcon', null, this.#icon),
			currentItem = block(null, 'b_currentItem', null),
			selectedItem = block(null, 'b_selectedValue', [currentItem, icon]),
			listItems = block(null, 'b_listItems', []),
			dropDown = block(this.#id, 'b_dropdown', [selectedItem, listItems]);

		dropDown.classList.add(...this.#styleClass.split(' '))

		this.#currentValue = currentItem;
		listItems.append(...this.#htmlItems)
		selectedItem.onclick = ()=>{
			if (this.#state === Dropdown.CLOSE)
			{
				listItems.style = 'display: block !important;';
				this.#state = Dropdown.OPEN
			}
			else if (this.#state === Dropdown.OPEN)
			{
				listItems.removeAttribute('style')
				this.#state = Dropdown.CLOSE
			}
		}
		this.#htmlItems.forEach(item =>{
			item.onclick = ()=>{
				currentItem.replaceChildren(item.cloneNode(true))
				selectedItem.click()
				riseEvent(this, 'onChange', item.getAttribute('itemValue'), item.textContent)
			}
		})
		currentItem.append(this.#htmlItems[0].cloneNode(true))
		this.component = dropDown;
	}
}

export class router
{
	/**
	 * @type {Component}
	 */
	#entry;
	/**
	 * @type {Component}
	 */
	#oldCompo;
	/**
	 * @type {Component} #theDefault
	 */
	#theDefault;
	
	static old;

	/**
	 * @param {Component} entry
	 * @param {Component} theDefault
	 */
	constructor(entry, theDefault)
	{
		this.#theDefault = theDefault;
		this.#entry = entry;
		this.old = entry.path;
		this.#oldCompo = null
	}


	updateOLD()
	{
		this.old = document.location.pathname;
	}

	watch()
	{
		this.resolve('/')
		window.onpopstate = ()=>{
			if (this.#oldCompo !== null && this.#oldCompo.component.parentNode !== null)
			{
				this.#oldCompo.component.parentNode.removeChild(this.#oldCompo.component)
				this.#oldCompo = null;
			}
		}

		setInterval(()=>{
			let newPath = document.location.pathname;
			if (newPath !== this.old)
			{
				if (this.#oldCompo !== null && this.#oldCompo.component.parentNode !== null)
				{
					this.#oldCompo.component.parentNode.removeChild(this.#oldCompo.component)
					this.#oldCompo = null;
				}
				this.old = newPath;
				this.resolve(newPath);
			}
		}, 60)
	}


	/**@param {string []} path */
	#purify(paths)
	{
		let pure = [];
		for (let i = 0; i < paths.length; i++) {
			const path = paths[i];

			if (path !== '' || i === 0)
				pure.push('/' + path);
		}
		return pure;
	}


	/**
	 * @param {String} path
	 */
	resolve(path, mode='default', compo = null)
	{
		let paths
		let component
		let parent
		if (mode === 'default')
		{
			paths = this.#purify(path.split('/'));
			component = this.#entry.findRoute(paths[0])
			this.resolve(['/'], 'beta', component)
			parent = app;
		} else if (mode === 'alpha'){
			component=compo
			paths = path
			component = component.findRoute(paths[0])
			parent = app;
		} else if (mode === 'beta'){
			component=compo
			paths = path
			let found = null;
			for(const c of component.subroutes)
			{
				if (c.path === paths[0])
				{
					found = c
					break
				}
			}
			if (found !== null)
				component = found
			else
				return 0
			parent = app;
		}

		if (this.#oldCompo !== null && component)
		{
			if (this.#oldCompo.component.parentNode && this.#oldCompo.subroutes.includes(component.path))
			{
				this.#oldCompo.component.parentNode.removeChild(this.#oldCompo.component)
				this.#oldCompo = null;
			}
		}
		
		if (component !== null)
		{
			if (component !== this.#entry)
				this.#oldCompo = component
			if (component.implementationPoint)
				parent = component.implementationPoint;
		}

		if (!component && mode !== 'beta')
		{
			if (app === this.#entry.component.parentNode)
				app.removeChild(this.#entry.component)
			app.append(this.#theDefault.component);
		}
		else
		{
			if (app === this.#theDefault.component.parentNode)
				app.removeChild(this.#theDefault.component)
			parent.append(component.component);
			if (paths.length > 1 && mode !== 'beta')
			{
				paths = paths.splice(1)
				this.resolve(paths, 'alpha', component)
			}
		}	
	}

	static push(path)
	{
		history.pushState('', '', path)
	}

}

function provisory()
{
	let prov = create('span');

	prov.className = 'provisory'
	return prov
}

/**
 * @param {String} input
 * **/
function bcode(input) {
	const placeholderRegex = /%([^%:]+):([^%]+)%/g;
	let calls = []
	const result = input.replace(placeholderRegex, (match, functionName, paramStr) => {
		const params = paramStr.split(':');

		calls.push({func: functionName, args: params})
		let prov = provisory().outerHTML
		return prov;
	});

	let p = paragraph(null, null, '')

	p.innerHTML = result
	let provs = p.querySelectorAll('.provisory');
	provs.forEach((e, i) =>{
		e.replaceWith(eval(calls[i].func)(...(calls[i].args)))
	})
	return p;
}