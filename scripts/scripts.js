var authToken;

//GET Function

async function get(url) {
    const response = await fetch(url, {
        headers: {
            Authorization: authToken
        }
    })
    return response.json();
}

//POST Function 

async function post(url, data) {
    const response = await fetch(url, {
        headers: {
            Authorization: authToken,
            "Content-Type": "application/json"
        },
        method: "POST",
        body: data
    }) 
    return response.json();
} 

//PUT Function

async function put(url, data) {
    const response = await fetch(url, {
        headers: {
            Authorization: authToken,
            "Content-Type": "application/json"
        },
        method: "PUT",
        body: data
    })
    return response.json();
} 

//DELETE Function

async function deleteRequest(url) {
    const response = await fetch(url, {
        headers: {
            Authorization: authToken,
            "Content-Type": "application/json"
        },
        method: "DELETE",
    })
    return response.json();
} 

//LOGIN Function

// function login() {
//     let userName = document.getElementById("defaultRegisterFormUsername").value;
//     let password = document.getElementById("defaultRegisterFormPassword").value;
//     console.log(userName);
//     console.log(password);
//     const data = {
//         "username": userName, 
//         "password": password
//     }
//     authToken = "Basic " + btoa("kid_SJqu6rsWD:d1f460b6f7da483982c14860a3bfeed4") //btoa converts to base 64
//     const response = post("https://baas.kinvey.com/user/kid_SJqu6rsWD/login", data);

// }

// document.getElementById("signInButton").addEventListener("click", login)

//Click function to make sign up appear

document.getElementById("register").addEventListener("click", function() {
    document.getElementById("signup").hidden = false;
    if(document.getElementById("sign-in").hidden == false) {
        document.getElementById("sign-in").hidden = true;
    }
});

//Click function to submit new sign up 

document.getElementById("signupbutton").addEventListener("click", function(){
    //UNCOMMENT ONCE THIS PART IS FULLY DONE
    // let regex = /^[A-Za-z][A-Za-z0-9]*(?:_[A-Za-z0-9]+)*$/
    // if(document.getElementById("signupusername").value == "" || document.getElementById("signuppassword").value == "" || document.getElementById("signupfirstname").value == "" || document.getElementById("signuplastname").value == "") {
    //     alert('Please Fill Out All Fields');
    //   } else if(!document.getElementById("signupusername").value.match(regex) || document.getElementById("signupusername").value.length < 3 || document.getElementById("signupusername").value.length > 25) {
    //     alert('Invalid username, please make sure user name: \n -> starts with a letter \n -> is between 3 and 25 characters \n -> contains only letters, digits and underscores');
    //   } else if(document.getElementById("signuppassword").value !== document.getElementById("signuprepeatpassword")) {
    //     alert("Password does not match.")
    //   }
    let data = {"username": document.getElementById("signupusername").value,
                "password": document.getElementById("signuppassword").value,
                "firstName": document.getElementById("signupfirstname").value,
                "lastName": document.getElementById("signuplastname").value
            };
    document.getElementById("loadingBox").style.display = "block";
    fetch("https://baas.kinvey.com/user/kid_SJqu6rsWD/", {
    method: "POST", 
    body: JSON.stringify(data),
    headers: {
        "Authorization": "Basic " + btoa("kid_SJqu6rsWD:d1f460b6f7da483982c14860a3bfeed4"),
        'Content-type': 'application/json; charset=UTF-8'
    }
    }).then(response => {
        if(response.status == 409) {
            $.notify("Username already exists", {
                position:"t c",
                autoHideDelay: 2000
            });
        }
        if(response.ok) {
            document.getElementById("loadingBox").style.display = "none"
            document.getElementById("userRegistration").style.display = "block"
            setTimeout(function(){
            document.getElementById("userRegistration").style.display = "none"
            }, 2000);

            response.json().then(data => {
                authToken = data._kmd.authtoken;
            });

            var welcomeusername = document.getElementById("welcomeusername");
            var text = document.createTextNode(`Welcome, ${data.username}`);
            welcomeusername.appendChild(text);
            document.getElementById("signup").hidden = true;
            document.getElementById("register").hidden = true;
            document.getElementById("loginorsignup").hidden = true;
            document.getElementById("signin").hidden = true;
            document.getElementById("sharerecipe").hidden = false;
            document.getElementById("logoutuser").hidden = false;
        }else {
            $.notify("Login unsuccesful, please try again 1", {
                position:"t c",
                autoHideDelay: 2000
            });
        }
        return response.json();
    })
});

//Click function to make sign in appear
document.getElementById("signin").addEventListener("click", function() {
    document.getElementById("sign-in").hidden = false;
    if(document.getElementById("signup").hidden == false) {
        document.getElementById("signup").hidden = true;
    }
});

//Click function for log in 

document.getElementById("signInButton").addEventListener("click", function() {
    let data = {
        "username": document.getElementById("defaultRegisterFormUsername").value,
        "password": document.getElementById("defaultRegisterFormPassword").value
        }
    document.getElementById("loadingBox").style.display = "block";
    fetch("https://baas.kinvey.com/user/kid_SJqu6rsWD/login", {
        method: "POST", 
        body: JSON.stringify(data),
        headers: {
                "Authorization": "Basic " + btoa("kid_SJqu6rsWD:d1f460b6f7da483982c14860a3bfeed4"),
                'Content-type': 'application/json; charset=UTF-8'
        }
    }).then(response => {
        document.getElementById("loadingBox").style.display = "none"
        if(response.ok) {
            // authToken = response._kmd.authtoken;x
            // console.log(response.json())
            $.notify("Login succesful!", {
                position:"t c"
            });
            response.json().then(data => {
                authToken = data._kmd.authtoken;
            })
            var welcomeusername = document.getElementById("welcomeusername");
            var text = document.createTextNode(`Welcome, ${data.username}`);
            welcomeusername.appendChild(text);
            document.getElementById("signup").hidden = true;
            document.getElementById("register").hidden = true;
            document.getElementById("loginorsignup").hidden = true;
            document.getElementById("signin").hidden = true;
            document.getElementById("sharerecipe").hidden = false; //Share recipe and loutout are not showing up when loggin in
            document.getElementById("logoutuser").hidden = false;
        }else {
            $.notify("Login unsuccesful, please try again", {
                position:"t c"
            });
        }
        return response.json();
    })
})

//Click function for logout

document.getElementById("logoutuser").addEventListener("click", function() {
    fetch("https://baas.kinvey.com/user/kid_SJqu6rsWD/_logout", {
        method: "POST",
        headers: {
            "Authorization": "Kinvey " + authToken,
            'Content-type': 'application/json; charset=UTF-8'
        }
    }).then(response => {
        console.log(response)
    })
    //REMOVE stuff from nav bar
})








