

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
