var xmlhttp = new XMLHttpRequest();

var url = "http://worldcup.sfg.io/matches"

xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var myArr = JSON.parse(this.responseText);
        console.log(myArr);

        var i;
			for(i = 0; i < myArr.length; i++) {
				var para = document.createElement("p");
				var node = document.createTextNode("Locatie = " + myArr[i]["venue"]);
				var node2 = document.createTextNode("Winnaar = " + myArr[i]["winner"])
				para.appendChild(node);	
				para.appendChild(node2);
				var element = document.getElementById("results");
				element.appendChild(para);
			}

    }
};

xmlhttp.open("GET", url, true);

xmlhttp.send();

