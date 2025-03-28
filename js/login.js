"use strict";

//Wait for the page to load before doing any functional work
$(document).ready(function() {
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

            let users = JSON.parse(localStorage.getItem('users')) || [];
            let user = users.find(user => user.email === email && user.password === password);

            if (user) {
                localStorage.setItem("loggedInUser", JSON.stringify(user));
                window.location.href = 'client-portal.html';
            } else {
                console.log(users);
                alert("Invalid email or password.");
            }
        }
    });
});