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
        this.quotes = [];
    }

    //Loads or Creates users array from/into memory
    let users = JSON.parse(localStorage.getItem('users')) || [];

    //Custom Method for Validator Plugin to Check if an email is in use 
    $.validator.addMethod("uniqueEmail", function (value, element) 
    {
        return !users.some(user => user.email === value);
    }, "This email is already in use");

    //Form Validator Plugin
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
                email: true,
                uniqueEmail: true,
            },
            "signup-password": {
                required: true,
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
                email: "Enter a valid Email Address",
                uniqueEmail: "This email is already in use"
            },
            "signup-password": {
                required: "Please enter a password",
            }
        },
        submitHandler: function (form, event) {
            event.preventDefault();

            //Creates User, adds to the users array
            let user = new User(
                $('input[name="signup-fname"]').val(), 
                $('input[name="signup-lname"]').val(), 
                $('input[name="signup-phone"]').val(), 
                $('input[name="signup-email"]').val(), 
                $('input[name="signup-password"]').val(),
            );

            users.push(user);
            localStorage.setItem("users", JSON.stringify(users));

            //Redirects to the login page
            $('.main-login').html('<h2>Account Created Successfully! You may now login on the Login Page! Redirecting...</h2>');
            setTimeout(() => {
                window.location.href = "login.html";
            }, 5000);
        }
    });
})
