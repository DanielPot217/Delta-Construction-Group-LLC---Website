"use strict";

$(document).ready(function() {

    //Loads array of users from memory 
    let users = JSON.parse(localStorage.getItem('users')) || [];
    
    //Creates Admin account if it doesn't exist, and saves to memory
    if (!users.some(user => user.email === "admin@gmail.com")) {
        users.push({
            firstName: "Admin",
            lastName: "Admin",
            phone:'555',
            email: "admin@gmail.com",
            password: "admin",
            
        });
        localStorage.setItem("users", JSON.stringify(users)); 
    }


    //Validator Plugin to check Email and Password
    $("#login-form").validate({
        errorClass: 'error',
        rules: {
            "login-email": {
                required: true,
                email: true
            },
            "login-password": {
                required: true,
            }
        },
        messages: {
            "login-email": {
                required: "Please enter your email",
                email: "Enter a valid email address"
            },
            "login-password": {
                required: "Please enter your password",
            }
        },
        submitHandler: function (form, event) {
            event.preventDefault();
            
            //Finds the User from Users Array in memory, based on user input
            let email = $('input[name="login-email"]').val();
            let password = $('input[name="login-password"]').val();

            let user = users.find(user => user.email === email && user.password === password);

            //If found, loads all the user information and saves under loggedIn user to load in the client portal
            if (user) 
            {
                let savedUserData = JSON.parse(localStorage.getItem(email));

                if (savedUserData) 
                {
                    user.quotes = savedUserData.quotes || [];  
                    user.counter = savedUserData.counter || 0; 
                } else {
                    user.quotes = [];
                    user.counter = 0;
                }
        
                localStorage.setItem("loggedInUser", JSON.stringify(user));
                localStorage.setItem(email, JSON.stringify(user)); 

                //Checks if the loggin User is supposed to be Admin or not, and redirects accordginly
                if(user.email === 'admin@gmail.com' && user.password === 'admin')
                {
                    window.location.href = 'admin-portal.html';   
                }else{
                    window.location.href = 'client-portal.html';
                }
            }else {
                console.log(users);
                alert("Invalid email or password.");
            }
        }
    });
});