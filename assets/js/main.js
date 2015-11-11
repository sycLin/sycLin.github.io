var config = function() {
	// after getting response
	var onResponse = function(raw) {
		var config = JSON.parse(raw);
		/* deal with website title */
		document.getElementsByTagName('title')[0].innerHTML = config.title;
		/* deal with navigation bar */
		// 1) navigaion title
		document.getElementById('nav-title').innerHTML = config['nav-title'];
		document.getElementById('nav-title').setAttribute('href', window.location.origin + window.location.pathname);
		// 2) navigation links
		var navNode = document.getElementById('nav-mobile');
		while(navNode.children.length > 0) navNode.removeChild(navNode.children[0]);
		for(var key in config.structure.pages) {
			var newLi = document.createElement('li');
			var newA = document.createElement('a');
			var newText = document.createTextNode(key);
			newA.setAttribute('onclick', 'navLink(this, \'' + config.structure.pages[key] + '\')');
			newA.setAttribute('href', '#');
			newA.appendChild(newText);
			newLi.appendChild(newA);
			navNode.appendChild(newLi);
		}
	}
	doAJAX('GET', window.location.href + 'config.json', '', onResponse);
}

var navLink = function(navItem, jsonLocation) {
	// hide all other sections
	var sections = document.getElementsByClassName('sections');
	for(var i=0; i<sections.length; i++)
		sections[i].style.display = "none";
	// display the designated item
	var target = navItem.innerHTML;
	if(target == "about") {
		console.log('displaying about section with json located at: ' + jsonLocation);
		getAbout(jsonLocation);
	} else if(target == "publication") {
		console.log('displaying publication section with json located at: ' + jsonLocation);
		getPublication(jsonLocation);
	} else if(target == "projects") {
		console.log('displaying projects section with json located at: ' + jsonLocation);
		getProjects(jsonLocation);
	} else if(target == "skills") {
		console.log('displaying skills section with json located at: ', jsonLocation);
		getSkills(jsonLocation);
	} else if(target == "contact") {
		console.log('displaying contact section with json located at: ' + jsonLocation);
		getContact(jsonLocation);
	} else {
		console.log('this sections: ' + target + ' is not implemented yet!');
		return;
	}
	document.getElementById(target).style.display = "block";
}

var getAbout = function() {
	console.log('under construction...');
}

var getPublication = function() {
	console.log('under construction...');
}

var getProjects = function() {
	console.log('under construction...');
}

var getSkills = function(jsonLocation) {
	// get response from json file
	var onResponse = function(raw) {
		var skills = JSON.parse(raw);
		// fill in the advanced skills
		var advSkillsDiv = document.getElementById('advanced-skills');
		for(var i=0; i<advSkillsDiv.children.length; i++) {
			if(advSkillsDiv.children[i].tagName == "DIV") {
				advSkillsDiv.removeChild(advSkillsDiv.children[i]);
				i -= 1;
			}
		}
		for(var i=0; i<skills.advanced.length; i++) {
			var newSkillDiv = document.createElement('div');
			newSkillDiv.setAttribute('class', 'col s4 m3 l2');
			var thumbnail = document.createElement('img');
			thumbnail.setAttribute('src', skills.advanced[i].thumbnail);
			thumbnail.setAttribute('class', 'responsive-img');
			thumbnail.setAttribute('alt', 'skill thumbnail');
			var title = document.createElement('h6');
			title.setAttribute('class', 'center');
			var link = document.createElement('a');
			link.setAttribute('href', skills.advanced[i].link);
			var titleText = document.createTextNode(skills.advanced[i].title);
			link.appendChild(titleText);
			title.appendChild(link);
			newSkillDiv.appendChild(thumbnail);
			newSkillDiv.appendChild(title);
			advSkillsDiv.appendChild(newSkillDiv);
		}
		// fill in the strong skills
		var strongSkillsDiv = document.getElementById('strong-skills');
		for(var i=0; i<strongSkillsDiv.children.length; i++) {
			if(strongSkillsDiv.children[i].tagName == "DIV") {
				strongSkillsDiv.removeChild(strongSkillsDiv.children[i]);
				i -= 1;
			}
		}
		for(var i=0; i<skills.strong.length; i++) {
			var newSkillDiv = document.createElement('div');
			newSkillDiv.setAttribute('class', 'col s4 m3 l2');
			var thumbnail = document.createElement('img');
			thumbnail.setAttribute('src', skills.strong[i].thumbnail);
			thumbnail.setAttribute('class', 'responsive-img');
			thumbnail.setAttribute('alt', 'skill thumbnail');
			var title = document.createElement('h6');
			title.setAttribute('class', 'center');
			var link = document.createElement('a');
			link.setAttribute('href', skills.strong[i].link);
			var titleText = document.createTextNode(skills.strong[i].title);
			link.appendChild(titleText);
			title.appendChild(link);
			newSkillDiv.appendChild(thumbnail);
			newSkillDiv.appendChild(title);
			strongSkillsDiv.appendChild(newSkillDiv);
		}
		// fill in the experienced skills
		var expSkillsDiv = document.getElementById('experienced-skills');
		for(var i=0; i<expSkillsDiv.children.length; i++) {
			if(expSkillsDiv.children[i].tagName == "DIV") {
				expSkillsDiv.removeChild(expSkillsDiv.children[i]);
				i -= 1;
			}
		}
		for(var i=0; i<skills.experienced.length; i++) {
			var newSkillDiv = document.createElement('div');
			newSkillDiv.setAttribute('class', 'col s4 m3 l2');
			var thumbnail = document.createElement('img');
			thumbnail.setAttribute('src', skills.experienced[i].thumbnail);
			thumbnail.setAttribute('class', 'responsive-img');
			thumbnail.setAttribute('alt', 'skill thumbnail');
			var title = document.createElement('h6');
			title.setAttribute('class', 'center');
			var link = document.createElement('a');
			link.setAttribute('href', skills.experienced[i].link);
			var titleText = document.createTextNode(skills.experienced[i].title);
			link.appendChild(titleText);
			title.appendChild(link);
			newSkillDiv.appendChild(thumbnail);
			newSkillDiv.appendChild(title);
			expSkillsDiv.appendChild(newSkillDiv);
		}
	}
	doAJAX("GET", window.location.origin + window.location.pathname + jsonLocation, "", onResponse);
}

var getContact = function() {
	console.log('under construction...');
}

var doAJAX = function(method, url, data, funcOnSuc, asyncOrNot) {
	// asyncOrNot is an optional parameter
	if(asyncOrNot == undefined)
		asyncOrNot = true; // default asynchronous!
	var req;
	if(window.XMLHttpRequest) {
		// for IE7+, Firefox, Chrome, Opera, Safari
		req = new XMLHttpRequest();
	} else{
		// for IE6- and ... worse
		req = new ActiveXObject("Microsoft.XMLHTTP");
	}
	req.onreadystatechange = function() {
		if(req.readyState == 4 && req.status == 200) { // success
			var res = req.responseText;
			for(var i=0; i<res.length; i++) {
				if(res[i] != "" && res[i] != "\n" && res[i] != "\r")
					break;
			}
			res = res.substring(i);
			funcOnSuc(res);
		}
	}
	if(method == "GET") {
		req.open("GET", url, asyncOrNot);
		req.send();
	} else if(method == "POST") {
		req.open("POST", url, asyncOrNot);
		req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		req.send(data);
	} else {
		console.log("doAJAX(): ERROR!!");
	}
}

config();
