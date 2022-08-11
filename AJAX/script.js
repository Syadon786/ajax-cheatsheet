//http://jsonplaceholder.typicode.com/posts

document.getElementById("fetch-posts").onclick = function() {
    var url = 'http://jsonplaceholder.typicode.com/posts';
    var method = 'GET';
    sendRequest(url, method, null, renderPosts);
}

function sendRequest(url, method, body, callback) {
    var xhr = new XMLHttpRequest;

    xhr.onreadystatechange = function() {
        if(xhr.readyState === 4 && xhr.status === 200) {
            //console.log(JSON.parse(xhr.responseText));
            callback(JSON.parse(xhr.responseText));          
        }
    }

    xhr.setRequestHeader('content-type', 'application/json');
    xhr.open(method, url);
    xhr.send(body);
}

function renderPosts(posts) {
    var postListHTML = '';
    for(var post of posts) {
        postListHTML += `<p>${post.title}</p><small>${post.body}</small>`;
    }
    document.getElementById("post-list-container").innerHTML = postListHTML;
}