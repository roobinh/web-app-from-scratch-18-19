var xmlhttp = new XMLHttpRequest();

var url = "https://ipapi.co/json/";

xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var myArr = JSON.parse(this.responseText);
        console.log(myArr);

		var para = document.createElement("p");
		var div = document.getElementById("results");
		var node = document.createTextNode("IP = " + myArr["ip"]);
		para.appendChild(node);	
		node = document.createTextNode("Test2");
		para.appendChild(node);
		div.appendChild(para);
	}
};

xmlhttp.open("GET", url, true);

xmlhttp.send();

