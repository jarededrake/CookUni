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

function login() {
    let userName = document.getElementById("defaultRegisterFormUsername").value;
    let password = document.getElementById("defaultRegisterFormPassword").value;
    console.log(userName);
    console.log(password);
    const data = {
        "username": userName, 
        "password": password
    }
    authToken = "Basic " + btoa("kid_SJqu6rsWD:d1f460b6f7da483982c14860a3bfeed4") //btoa converts to base 64
    const response = post("https://baas.kinvey.com/user/kid_SJqu6rsWD/login", data);

}

document.getElementById("signInButton").addEventListener("click", login)

//Click function to make sign up appear

document.getElementById("register").addEventListener("click", function() {
    document.getElementById("signup").hidden = false;
    if(document.getElementById("sign-in").hidden == false) {
        document.getElementById("sign-in").hidden = true;
    }
});

//Click function to submit new sign up 

document.getElementById("signupbutton").addEventListener("click", function(){
    let data = {"username": document.getElementById("signupusername").value,
                "password": document.getElementById("signuppassword").value,
                "firstName": document.getElementById("signupfirstname").value,
                "lastName": document.getElementById("signuplastname").value
            };
    console.log(data)
    fetch("https://baas.kinvey.com/user/kid_SJqu6rsWD/", {
    method: "POST", 
    body: JSON.stringify(data),
    headers: {
        "Authorization": "Basic " + btoa("kid_SJqu6rsWD:d1f460b6f7da483982c14860a3bfeed4"),
        'Content-type': 'application/json; charset=UTF-8'
    }
    }).then(response => {
        if(response.ok) {
            $.notify("Sign up succesful!", {
                position:"t c"
            });
        } else {
            $.notify("Sign up unsuccesful, please try again", {
                position:"t c"
            });
        }
        return response.json();
    })
});


//Click function to mkae sign in appear
document.getElementById("signin").addEventListener("click", function() {
    document.getElementById("sign-in").hidden = false;
    if(document.getElementById("signup").hidden == false) {
        document.getElementById("signup").hidden = true;
    }
});

