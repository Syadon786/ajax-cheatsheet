var state = {
    userData: [],
    isLoggedIn: false 
};

window.onload = function() {
    $("#login-form").on("submit", function(event) {
        event.preventDefault();
        toggleInputFields(true);
        togglePendingAnimation();
        var email = event.target.elements.email.value;
        var password = event.target.elements.password.value;
    
        var body = JSON.stringify({
            email: email,
            password: password
        });

        asyncLoginAndFetchUsers(body);
    }); 
}

async function asyncLoginAndFetchUsers(body) {
    //await megvárja míg a Promise resolválódik
    var loginResponse = await fetch('https://reqres.in/api/login', {
        method: 'POST',
        body: body,
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if(!loginResponse.ok) {
        alert("Login failed");
        toggleInputFields(false);
        toggleFailedInputBorder();
        togglePendingAnimation();
        return;
    }

    var token = await loginResponse.json();
    state.isLoggedIn = true;
    togglePendingAnimation();

    var usersResponse = await fetch('https://reqres.in/api/users');

    if(!usersResponse.ok) {
        alert("Could not reach servers");
        return;
    }
    var userPage = await usersResponse.json();
    state.userData = userPage.data;
    renderUsers();
}

function loginAndFetchUsers(body) {
    fetch('https://reqres.in/api/login', {
            method: 'POST',
            body: body,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(function (response) {
            if(!response.ok) {
                return Promise.reject("Login error");
            }
            return response.json();
        })
        .then(function(response) {
            return fetch('https://reqres.in/api/users');
        })
        .then(function(response) {
            if(!response.ok) {
                return Promise.reject("Users get data error");
            }
            return response.json();
        }) 
        .then(function(response) {
            //action
            state.userData = response.data;
            state.isLoggedIn = true;
            console.log(state);
            //render
           renderUsers();
        })
        .catch(function(error) {
            toggleInputFields(false);
            toggleFailedInputBorder();
            togglePendingAnimation();
            alert(error);
        });
}


function renderUsers() {
    var postsHTML = `<div class="col-lg-10">
        <div class="card">
        <div class="card-header"><h3>Posts</h3></div>
        <div class="card-body">
        <ul class="list-group">`;
    for(var userData of state.userData) {
        postsHTML += `<li class="list-group-item">
        <img class='post-avatar img-fluid'src='${userData.avatar}'>
        <div class='post-details-container'>
        <p class="post-text">${userData.first_name} ${userData.last_name}</p>
        <p class="post-text">${userData.email}</p>
        </div>
        </li>`;
    }
    postsHTML += `</ul></div></div></div>`;

    $("#content-container").html(postsHTML);
    $(".navbar-brand").text("Users");
}

function toggleInputFields(status) {
    $("input").prop("disabled", status);
    $("button").prop("disabled", status);
}

function togglePendingAnimation() {
    $("#pending-login").toggleClass("hidden");
}

function toggleFailedInputBorder() {
    $("input").toggleClass("failed-login");
}
