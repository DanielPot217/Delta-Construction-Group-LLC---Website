"use strict";

$(document).ready(function () 
{
    //Looks for Logged IN User in memory
    let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    //Checks if there is a Logged In User in memory - Prevents being able to change the URL without loggin in
    if (!loggedInUser) 
    {
        window.location.href = "index.html";
    }

    //Logout Button, Removes the logged in Users from Temperary Memory(Logs Out)
    $("#logout").click(function () 
    {
        localStorage.removeItem("loggedInUser");
        window.location.href = "home.html";
    });

    //Loads the Users Array from Local Storage
    let users = JSON.parse(localStorage.getItem('users')) || [];

    //Checks if there are any Client Profiles,if not found displayes a text
    if(users.length === 1)
    {
        $('#quotes').append(
            `<h1>No New Clients<h1>`
        );   
    }

    //Loops the the list of current user accounts and displays them and their quote information
    users.forEach(user => {
        //Makes sure it doesn't display the admin user in the client list
        if(user.firstName != 'Admin')
        {
            //Dsiplayes the information of the current User
            //DELETE LATER
            console.log(user);
            $('#quotes').append(
                `<h1>Client: ${user.firstName} ${user.lastName}</h1>
                <h3>Phone: ${user.phone} &emsp; Email: ${user.email}</h3>
                <hr>`,
            );

            //Displays Quote Information Based On the Current User Selected
            user.quotes.forEach(quote => {
                $('#quotes').append(`<h2>ID: ${quote.id} Type: ${quote.name} Address: ${quote.address} Plugs:${quote.numberplugs} Switches: ${quote.numberswitches}</h2>`);
            });

            $('#quotes').append(`<hr>`);
        }
    });

    //Load The Questions Array from Local Sotrage
    let questions = JSON.parse(localStorage.getItem('questions')) || [];

    //Checks if there are any Questions, if not found displayes a text
    if(questions.length === 0)
        {
            $('#quotes').append(`<h1>No New Clients<h1>`);   
        }

    //Displays every question from the question array. Creates a quick snippet of the question text, and adds a read more for more info.
    questions.forEach(question => {
        $('#questions').append(`<h1>Email: ${question.email} Nature: ${question.nature}`);
        $('#questions').append(`<p class="question">Question: ${question.text}</p>`);
        $('.question').expander({slicePoint: 200, expandEffect:'slideDown', expandSpeed: 250,});
    });

    //DELETE LATER
    console.log(questions);
});