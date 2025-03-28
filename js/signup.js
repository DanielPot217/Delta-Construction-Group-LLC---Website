"use strict";

//Wait for the page to load before doing any functional work
$(document).ready(function() {

    //User Profile Object 
    function User(firstName, lastName, phone, email, password)
    {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.email = email;
        this.password = password;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];

    $("#signup-form").validate({
        rules: {
            "signup-fname": {
                required: true,
            },
            "signup-lname": {
                required: true,
            },
            "signup-phone": {
                required: true,
            },
            "signup-email": {
                required: true,
                email: true
            },
            "signup-password": {
                required: true,
                minlength: 6
            }
        },
        messages: {
            "signup-fname": {
                required: "Please enter your First Name",
            },
            "signup-lname": {
                required: "Please enter your Last Name",
            },
            "signup-phone": {
                required: "Please enter your Phone Number",
            },
            "signup-email": {
                required: "Please enter your Email",
                email: "Enter a valid Email Address"
            },
            "signup-password": {
                required: "Please enter a password",
                minlength: "Password must be at least 6 characters long"
            }
        },
        submitHandler: function (form, event) {
            event.preventDefault();

            let user = new User(
                $('input[name="signup-fname"]').val(), 
                $('input[name="signup-lname"]').val(), 
                $('input[name="signup-phone"]').val(), 
                $('input[name="signup-email"]').val(), 
                $('input[name="signup-password"]').val());

            users.push(user);
            localStorage.setItem("users", JSON.stringify(users));

            console.log(JSON.parse(localStorage.getItem('users')));

            $('.main-login').html('<h2>Account Created Successfully! You may now login on the Login Page! Redirecting...</h2>');
            setTimeout(() => {
                window.location.href = "login.html";
            }, 5000);
        }
    });
})
