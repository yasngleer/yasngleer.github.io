if (window.innerWidth < window.innerHeight) {
	w3.addStyle('.margin','padding-left','0px');
	console.log("he");
} else {
    w3.addStyle('.margin','padding-left',window.innerWidth/7+'px');
}

window.onresize = function(event) 	{
	if (window.innerWidth < 800) {
			w3.addStyle('.margin','padding-left','0px');
			console.log("he");
	} 	
	else {
			w3.addStyle('.margin','padding-left',window.innerWidth/7+'px');
	}
									};



w3.addStyle('h1','font-size',window.innerHeight/13+'px')
w3.addStyle('pink','font-size',window.innerHeight/25+'px')
w3.addStyle('a','font-size',window.innerHeight/25+'px')
