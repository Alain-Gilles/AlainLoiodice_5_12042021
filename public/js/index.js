var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            var response = JSON.parse(this.responseText);
            console.log(JSON.parse(this.responseText));
            console.log((this.responseText));
            console.log(response[0]._id);
            console.log(response[0].name);
            console.log(response[0].description);
            console.log(response[0].price);
            console.log(response[0].imageUrl)
            console.log(response.length);

            for (i = 0; i < response.length; i++) {
                console.log(response[i]._id);
                console.log(response[i].name);
                console.log(response[i].description);
                console.log(response[i].price);
                console.log(response[i].imageUrl)
            }
            var img1 = response[1].imageUrl;
            elt = document.getElementById('result');
            elt.innerHTML = '<img  src="' + img1 +  '"/>';
            
        }
    };
    request.open("GET", "http://localhost:3000/api/furniture");
    request.send();