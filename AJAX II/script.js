document.getElementById("login").onclick = function() {
    var url = 'https://reqres.in/api/login';   
    var body = JSON.stringify({
        email: 'eve.holt@reqres.in',
        password: 'cityslicka'
    });

    /*
    callback hell / piramid of doom --> Megoldás Promise 
    sendRequest(url, 'POST', body, function(token) {
         if(token) {
            console.log(token);
            sendRequest('https://reqres.in/api/users', 'GET', null, function(users) {
                if(users) {
                    console.log(users);
                }
                else {
                    alert('Error');
                }
         });
         }
         else {
            alert('Error');
         }
    }); */


    //Promise chain
    sendRequest2(url,  'POST', body)
        //Promise<string>
        //Promise<any> --> mindenképp egyszeresen becsomagolt Promise object lesz
    .then(function(response) {
        console.log(response);
        //return "Teszt";
        return sendRequest2("https://reqres.in/api/users", "GET", null);
    })
    .catch(function(error) {
        console.log("Hiba1");
    })
    .then(function(jovobeliErtek) {
        console.log(jovobeliErtek);
    })
    .catch(function(error) {
        console.log(error);
    });
}

function sendRequest(url, method, body, callback) {
    var xhr = new XMLHttpRequest;

    xhr.onreadystatechange = function() {
        if(xhr.readyState === 4 && xhr.status === 200) {
            callback(JSON.parse(xhr.responseText));          
        }
    }

    xhr.setRequestHeader('content-type', 'application/json');
    xhr.open(method, url);
    xhr.send(body);
}

//Promise<_>
function sendRequest2(url, method, body) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest;

        xhr.onreadystatechange = function() {
            if(xhr.readyState === 4) {
                if(xhr.status >= 200 && xhr.status < 300) {
                    resolve(JSON.parse(xhr.responseText));
                }
                else {
                    reject(JSON.parse(xhr.responseText));
                }
            }
        }
    
        xhr.open(method, url);
        xhr.setRequestHeader('content-type', 'application/json');
        xhr.send(body);
    });
}
