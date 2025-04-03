"use strict";

//Wait for the page to load before doing any functional work
$(document).ready(function() {

    let users = JSON.parse(localStorage.getItem('users')) || [];
    
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


    $("#login-form").validate({
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
                minlength: "Password must be at least 6 characters long"
            }
        },
        submitHandler: function (form, event) {
            event.preventDefault();
            
            let email = $('input[name="login-email"]').val();
            let password = $('input[name="login-password"]').val();

            let user = users.find(user => user.email === email && user.password === password);

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