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
    console.log({
        headers: {
            Authorization: authToken,
            "Content-Type": "application/json"
        },
        method: "POST",
        body: data
    })
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

