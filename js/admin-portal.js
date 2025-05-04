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

    //Logout Button, Removes the logged in Users from Temporary Memory(Logs Out)
    $("#logout").click(function () 
    {
        localStorage.removeItem("loggedInUser");
        window.location.href = "index.html";
        localStorage.setItem('users', JSON.stringify(users));
    });

    //Loads the Users Array from Local Storage
    let users = JSON.parse(localStorage.getItem('users')) || [];

    //Checks if there are any Client Profiles,if not found displayes a text
    if(users.length === 1)
    {
        $('#quotes').append(
            `<h1>No New Clients<h1>`
        );   
    }else{
        //Loops the the list of current user accounts and displays them and their quote information
        users.forEach(user => {
            //Makes sure it doesn't display the admin user in the client list
            if(user.firstName != 'Admin')
            {
                //Dsiplayes the information of the current User
                $('#quotes').append(
                    `<h1>Client: ${user.firstName} ${user.lastName}</h1>
                    <h3>Phone: ${user.phone} &emsp; Email: ${user.email}</h3>
                    <hr class="white-line">`,
                );

                //Displays Quote Information Based On the Current User Selected, if no quotes display no quote text
                if(user.quotes.length === 0)
                {
                    $('#quotes').append('<p class="center-text">No Current Quotes</p><hr class="white-line">');
                }else{
                    user.quotes.forEach(quote => {
                        //Checks what css style to add to the status of the quote
                        let statusClass;
                        if(quote.status === 'Approved')
                        {
                            statusClass = 'quote-approved';
                        }else if(quote.status === 'Rejected')
                        {
                            statusClass = 'quote-rejected';
                        }else   
                        {
                            statusClass = 'quote-pending';
                        }

                        //Displays The quote info
                        $('#quotes').append(`<div class="quote-div" data-id="${quote.id}" data-email="${user.email}"><h2>ID: ${quote.id} | Type: ${quote.name} | Address: ${quote.address} | Plugs:${quote.numberplugs} 
                        | Switches: ${quote.numberswitches} <br> Status: <span class="${statusClass}">${quote.status}</span></h2>
                        <button class="adminQuoteB" id="ApproveB">Approve</button> 
                        <button class="adminQuoteB" id="RejectB">Reject</button> 
                        <button class="adminQuoteB" id="deleteB">Delete</button></div>`);
                    });
        
                    $('#quotes').append(`<hr class="white-line">`);
                }

                //Approve Button Functionality
                $('#quotes').on('click', '#ApproveB', function() {
                    //Searches for the correct quote div and find the quote in the array to edit
                    const quoteDiv = $(this).closest('.quote-div');
                    const id = parseInt(quoteDiv.data('id'), 10);
                    let quote = user.quotes.find(quote => quote.id === id);

                    //Edits the quote status and resaves it into memory
                    quote.status = 'Approved';

                    localStorage.setItem('users', JSON.stringify(users));
                    location.reload();
                });

                //Reject Button Functionality
                $('#quotes').on('click', '#RejectB', function() {
                    //Searches for the correct quote div and find the quote in the array to edit
                    const quoteDiv = $(this).closest('.quote-div');
                    const id = parseInt(quoteDiv.data('id'), 10);
                    let quote = user.quotes.find(quote => quote.id === id);

                    //Edits the quote status and resaves it into memory
                    quote.status = 'Rejected';

                    localStorage.setItem('users', JSON.stringify(users));
                    location.reload();
                });

                //Delete Button Functionality
                $('#quotes').on('click', '#deleteB', function() {
                    //Searches for the correct quote div, ID, and Email of the correct quote 
                    const quoteDiv = $(this).closest('.quote-div');
                    const id = parseInt(quoteDiv.data('id'), 10);
                    const email = quoteDiv.data('email');
            
                    //Filters out the quote that needs to be deleted form the quotes array, and saves to memory
                    user.quotes = user.quotes.filter(quote => quote.id !== id);

                    localStorage.setItem('users', JSON.stringify(users));
                    location.reload();
                });
            }
        });
    }

    //Load The Questions Array from Local Sotrage
    let questions = JSON.parse(localStorage.getItem('questions')) || [];

    //Checks if there are any Questions, if not found displayes a text
    if(questions.length === 0)
        {
            $('#questions').append('<p class="center-text">No New Questions</p>');   
        }

    //Displays every question from the question array. Creates a quick snippet of the question text, and adds a read more for more info.
    questions.forEach(question => {
        $('#questions').append(`<div class="question" data-email="${question.email}"><h1>Email: ${question.email} Nature: ${question.nature}</h1>
        <p class="question-text">Question: ${question.text}</p> 
        <button class="deleteB">Delete</button></div>`);

        //Expander Plugin, shortens questions longer than 200 characters, adds a read more to expand to full length of the questions
        $('.question-text').expander({slicePoint: 200, expandEffect:'slideDown', expandSpeed: 250,});
    });

    //Delete Question Button Functionallity
    $('#questions').on('click', '.deleteB', function() 
    {
        //Finds the question closets to the delete button, Filters out of array, saves to memeory, and refreshes
        const questionDiv = $(this).closest('.question');
        const email = questionDiv.data('email');
        
        questions = questions.filter(question => question.email !== email);
        
        localStorage.setItem("questions", JSON.stringify(questions));

        location.reload();
    });
});