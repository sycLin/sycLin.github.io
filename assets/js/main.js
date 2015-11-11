var config = function() {
	// after getting response
	var onResponse = function(raw) {
		var config = JSON.parse(raw);
		/* deal with website title */
		document.getElementsByTagName('title')[0].innerHTML = config.title;
		/* deal with navigation bar */
		// 1) navigaion title
		document.getElementById('nav-title').innerHTML = config['nav-title'];
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
	} else if(target == "publication") {
		console.log('displaying publication section with json located at: ' + jsonLocation);
	} else if(target == "projects") {
		console.log('displaying projects section with json located at: ' + jsonLocation);
	} else if(target == "skills") {
		console.log('displaying skills section with json located at: ', jsonLocation);
	} else if(target == "contact") {
		console.log('displaying contact section with json located at: ' + jsonLocation);
	} else {
		console.log('this sections: ' + target + ' is not implemented yet!');
		return;
	}
	document.getElementById(target).style.display = "block";
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
