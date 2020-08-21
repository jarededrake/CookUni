var authToken;

//Click function to make sign up appear

document.getElementById("register").addEventListener("click", function() {
    document.getElementById("signup").hidden = false;
    if(document.getElementById("sign-in").hidden == false) {
        document.getElementById("sign-in").hidden = true;
    }
});

//Click function to submit new sign up 

document.getElementById("signupbutton").addEventListener("click", function(){
    // document.getElementById("signupusername").value = "";
    // document.getElementById("signuppassword").value = "";
    // document.getElementById("signupfirstname").value = "";
    // document.getElementById("signuplastname").value = "";
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
           document.getElementById("loadingBox").style.display = "none";
           document.getElementById("userIdAlreadyExists").style.display = "block";
           setTimeout(function(){
            document.getElementById("userIdAlreadyExists").style.display = "none"
            }, 2000);
        }
        if(response.ok) {
            document.getElementById("loadingBox").style.display = "none";
            document.getElementById("userRegistration").style.display = "block"
            setTimeout(function(){
            document.getElementById("userRegistration").style.display = "none"
            }, 2000);

            response.json().then(data => {
                authToken = data._kmd.authtoken;
            });

            const loggedIn = storage.getData('userInfo') !== null;
            if(loggedIn){
                const username = JSON.parse(storage.getData('userInfo')).username;
                context.loggedIn = loggedIn;
                context.username = username;
            }

            var welcomeusername = document.getElementById("welcomeusername");
            var text = document.createTextNode(`Welcome, ${data.username}`);
            welcomeusername.appendChild(text);
            document.getElementById("signup").hidden = true;
            document.getElementById("register").hidden = true;
            document.getElementById("loginorsignup").hidden = true;
            document.getElementById("signin").hidden = true;
            document.getElementById("sharerecipe").hidden = false;
            document.getElementById("logoutuser").hidden = false;
            document.getElementById("foodNotFound").hidden = false;

        }else {
            document.getElementById("loadingBox").style.display = "none";
        }
        return response.json();
    })
});

//Click function to make log in appear
document.getElementById("signin").addEventListener("click", function() {
    document.getElementById("sign-in").hidden = false;
    if(document.getElementById("signup").hidden == false) {
        document.getElementById("signup").hidden = true;
    }
});

//Click function for log in 

document.getElementById("signInButton").addEventListener("click", function() {
    // document.getElementById("defaultRegisterFormUsername").value = "";
    // document.getElementById("defaultRegisterFormPassword").value = "";
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
            document.getElementById("loginsuccessful").style.display = "block"
            setTimeout(function(){
            document.getElementById("loginsuccessful").style.display = "none"
            }, 2000);
            document.getElementById("sign-in").hidden = true;
            response.json().then(data => {
                userID = data._id;
                authToken = data._kmd.authtoken;
                window.sessionStorage.setItem('user',data.username);
                window.sessionStorage.setItem("loggedIn",data._kmd.authtoken);
            })
            var welcomeusername = document.getElementById("welcomeusername");
            var text = document.createTextNode(`Welcome, ${data.username}`);
            welcomeusername.appendChild(text);
            document.getElementById("signup").hidden = true;
            document.getElementById("register").hidden = true;
            document.getElementById("loginorsignup").hidden = true;
            document.getElementById("signin").hidden = true;
            document.getElementById("sharerecipe").hidden = false; 
            document.getElementById("logoutuser").hidden = false;

                        
        }else if(response.status = 401) {
            document.getElementById("invalidcredentials").style.display = "block"
            setTimeout(function(){
            document.getElementById("invalidcredentials").style.display = "none"
            }, 2000);
        }
        return response.json()
    })
})

//Click function for logout

document.getElementById("logoutuser").addEventListener("click", function() {
    document.getElementById("loadingBox").style.display = "block";
    fetch("https://baas.kinvey.com/user/kid_SJqu6rsWD/_logout", {
        method: "POST",
        headers: {
            "Authorization": "Kinvey " + authToken,
            'Content-type': 'application/json; charset=UTF-8'
        }
    }).then(response => {
        if(response.ok) {
            document.getElementById("loadingBox").style.display = "none";
            response.json().then(data => {
                authToken = data._kmd.authtoken;
            })
        document.getElementById("sharerecipe").hidden = true;
        document.getElementById("welcomeusername").hidden = true;
        document.getElementById("logoutuser").hidden = true;
        document.getElementById("signin").hidden = false;
        document.getElementById("register").hidden = false;
        document.getElementById("logoutsuccessful").style.display = "block"
            setTimeout(function(){
            document.getElementById("logoutsuccessful").style.display = "none"
            }, 2000);
        }
    })
    
})

//Click function to make share recipe appear
document.getElementById("sharerecipe").addEventListener("click", function() {
    console.log(authToken);
    document.getElementById("foodNotFound").hidden = true;
    document.getElementById("share-receipt-form").hidden = false;
});

//Click function to share/create recipe
document.getElementById("shareit").addEventListener("click", function() {
console.log(authToken);
let data = {
    "meal": document.getElementById("defaultRecepieShareMeal").value,
    "ingredients": document.getElementById("defaultRecepieShareIngredients").value,
    "prepMethod": document.getElementById("defaultRecepieShareMethodOfPreparation").value,
    "description": document.getElementById("defaultRecepieShareDescription").value,
    "category": document.getElementById("category").value,
    "foodImageURL": document.getElementById("defaultRecepieShareFoodImageURL").value,
}
fetch("https://baas.kinvey.com/appdata/kid_SJqu6rsWD/recipes", {
method: "POST", 
body: JSON.stringify(data),
headers: {
    "Authorization": "Kinvey " + authToken,
    'Content-type': 'application/json; charset=UTF-8'
}
}).then(response => {
        return response.json()
    })
})


    





