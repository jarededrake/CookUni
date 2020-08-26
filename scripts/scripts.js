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
    if(document.getElementById("signupusername").value.length < 3) {
        alert("username needs to be at least 3 characters long");
    } if(document.getElementById("signuppassword").value.length < 6) {
        alert("password needs to be at least 6 characters long");
    } if(document.getElementById("signupfirstname").value.length < 2) {
        alert("first name needs to be at least 2 characters long")
    } if(document.getElementById("signuplastname").value.length < 2) {
        alert("last name needs to be at least 2 characters long")
    }
    else {
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
                sessionStorage.setItem('session', JSON.stringify(data));
                let user = sessionStorage.getItem('session')
                console.log(user)  
                updateLoggedIn(data.firstName + " " + data.lastName);
            });

        }else {
            document.getElementById("loadingBox").style.display = "none";
        }
        return response.json();
    })
}
    document.getElementById("signupusername").value = "";
    document.getElementById("signuppassword").value = "";
    document.getElementById("signupfirstname").value = "";
    document.getElementById("signuplastname").value = "";
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
                'Content-type': 'application/json'
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
                authToken = data._kmd.authtoken; 
                // console.log(authToken)
                sessionStorage.setItem('session', JSON.stringify(data));
                let user = sessionStorage.getItem('session')
                // console.log(user) 
                updateLoggedIn(data.username);
            })
            
                        
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
        document.getElementById("foodNotFound").hidden = true;
        document.getElementById("sharedRecipes").hidden = true;
        document.getElementById("logoutsuccessful").style.display = "block"
            setTimeout(function(){
            document.getElementById("logoutsuccessful").style.display = "none"
            }, 2000);
        }
        sessionStorage.removeItem("session");
    })
    
})

//Click function to make share recipe appear
document.getElementById("sharerecipe").addEventListener("click", function() {
    // console.log(authToken);
    document.getElementById("foodNotFound").hidden = true;
    document.getElementById("share-receipt-form").hidden = false;
});

//Click function to share/create recipe
document.getElementById("shareit").addEventListener("click", function(event) {
event.stopPropagation();
event.preventDefault();
let data = {
    "meal": document.getElementById("defaultRecepieShareMeal").value,
    "ingredients": document.getElementById("defaultRecepieShareIngredients").value.split(','),
    "prepMethod": document.getElementById("defaultRecepieShareMethodOfPreparation").value,
    "description": document.getElementById("defaultRecepieShareDescription").value,
    "category": document.getElementById("category").value,
    "categoryImageURL": document.getElementById("defaultRecepieShareFoodImageURL").value,
    "foodImageURL": document.getElementById("defaultRecepieShareFoodImageURL").value,
    "likesCounter": "0"
    }
document.getElementById("loadingBox").style.display = "block";
fetch("https://baas.kinvey.com/appdata/kid_SJqu6rsWD/recipes", {
method: "POST", 
body: JSON.stringify(data),
headers: {
    "Authorization": "Kinvey " + authToken,
    'Content-type': 'application/json; charset=UTF-8'
}
}).then(response => {
    if(response.ok) {
        document.getElementById("loadingBox").style.display = "none";
        document.getElementById("recipeSuccessfullyCreated").style.display = "block"
        setTimeout(function(){
            document.getElementById("recipeSuccessfullyCreated").style.display = "none"
        }, 2000);
        document.getElementById("share-receipt-form").hidden = true;
        response.json().then(data => {
            let recepie = JSON.parse(sessionStorage.getItem('recipes'));
            if(!recepie) {
                recepie = [];
            }
            recepie.push(data);
            sessionStorage.setItem("recipes", JSON.stringify(recepie));
            // console.log(user) 
            createdRecipes()
            
        })
    }
    return response.json()
    })
})

//Function to checked if already logged in

function alreadyLoggedIn() {
    if(sessionStorage.getItem("session")) {
        const session = JSON.parse(sessionStorage.getItem("session"));
        updateLoggedIn(session.username);
        authToken = session._kmd.authtoken;
        createdRecipes()
    }
    
}

alreadyLoggedIn();



function updateLoggedIn(userName) {
    var welcomeusername = document.getElementById("welcomeusername");
            var text = document.createTextNode(`Welcome, ${userName}`);
            welcomeusername.appendChild(text);
            document.getElementById("signup").hidden = true;
            document.getElementById("register").hidden = true;
            document.getElementById("loginorsignup").hidden = true;
            document.getElementById("signin").hidden = true;
            document.getElementById("sharerecipe").hidden = false; 
            document.getElementById("logoutuser").hidden = false;
            document.getElementById("foodNotFound").hidden = false;
}

function createdRecipes() {
    document.getElementById("sharedRecipes").innerHTML = ''
    const recipes = JSON.parse(sessionStorage.getItem("recipes"));
    for (let index in recipes) {
        let ingredients = ''
        for (const ingredient in recipes[index].ingredients){
            ingredients += '<li>' + recipes[index].ingredients[ingredient] + '</li>'
        }

        let recipesCreated = `<div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="our-team-main">
                        <div class="team-front">
                            <img src="https://cdn.pixabay.com/photo/2017/10/09/19/29/eat-2834549__340.jpg" />
                            <h3>${recipes[index].meal}</h3>
                            <p>${recipes[index].category}</p>
                        </div>
                        <div class="team-back">
                            <div class="back-side-info">
                                <h4>Ingredients</h4>
                                <ul>` + ingredients + `</ul>
                                <a id="clicktoviewdetials_${recipes[index]._id}" href="#">View the recepie</a>
                            </div>
                            <img class="foodImage"
                                src="${recipes[index].foodImageURL}"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
        let sharedRecipes = document.getElementById("sharedRecipes")
        sharedRecipes.innerHTML += recipesCreated;
        
        //Click function to make view recipe detials appear
    }



recepieDetails();
document.getElementById("sharedRecipes").hidden = false;
document.getElementById("foodNotFound").hidden = true;
}

function recepieDetails() {
    const recipes = JSON.parse(sessionStorage.getItem("recipes"));
    document.getElementById("viewrecepiedetails").innerHTML = ''
    for (const index in recipes) {
        let ingredients = ''
        for (const ingredient in recipes[index].ingredients){
            ingredients += '<li>' + recipes[index].ingredients[ingredient] + '</li>'
        }
        let details = `<div id='viewrecepiedetails_${recipes[index]._id}' class="col-md-12">
        <div class='row'>
            <div class='col-md-8 recepieInfo py-3'>
                <div class="detailsFoodImage">
                    <img src="https://t3.ftcdn.net/jpg/00/25/90/48/240_F_25904887_fhZJ692ukng3vQxzHldvuN981OiYVlJ1.jpg"
                        alt="">
                </div>
        
                <div class="infoPack">
                    <h3 class="my-3">${recipes[index].meal}</h3>
                    <p class="prep-method">${recipes[index].prepMethod}</p>
                    <p class="description">${recipes[index].description}</p>
                </div>
                <div class="actions">
                    <a class="btn btn-danger" href="#">Archive</a>
                    <a id="editRecepie" class="btn btn-info" href="#">Edit</a>
                    <a class="btn btn-success" href="#"> 900 likes</a>
                </div>
            </div>
        
            <div class='col-md-4 detailsIngredients py-3'>
                <h3 class="my-3 ingredient">Ingredients</h3>
                <ul>` + ingredients + `</ul>
            </div>
        </div>
    </div>`
    
        let recepieDetails = document.getElementById("viewrecepiedetails")
        recepieDetails.innerHTML += details;

        document.getElementById(`viewrecepiedetails_${recipes[index]._id}`).hidden = true

        document.getElementById(`clicktoviewdetials_${recipes[index]._id}`).addEventListener("click", function() {
            document.getElementById(`viewrecepiedetails_${recipes[index]._id}`).hidden = !document.getElementById(`viewrecepiedetails_${recipes[index]._id}`).hidden
            document.getElementById(`viewrecepiedetails`).hidden = document.getElementById(`viewrecepiedetails_${recipes[index]._id}`).hidden
        })
    
        document.getElementById("editRecepie").addEventListener("click", function() {
            console.log("good")
            if(document.getElementById("sharedRecipes").hidden == false) {
                document.getElementById("sharedRecipes").hidden = true;
            }
            if(document.getElementById("viewrecepiedetails").hidden == false) {
                document.getElementById("sharedRecipes").hidden = false;
            }
        })
    }
    
}










    





