"use strict";

$(document).ready(function () 
{
    let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!loggedInUser) 
    {
        window.location.href = "index.html";
    }

    $("#logout").click(function () 
    {
        let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (loggedInUser && loggedInUser.email) 
    { 
        localStorage.setItem(loggedInUser.email, JSON.stringify(loggedInUser));
    }

    localStorage.removeItem("loggedInUser");

    //Resave the updates User Info in to Storage
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let userIndex = users.findIndex(user => user.email === loggedInUser.email && user.password === loggedInUser.password);        
    users[userIndex] = loggedInUser;
    localStorage.setItem("users", JSON.stringify(users));
   
    window.location.href = "home.html";
    });

    //DELETE LATER 
    console.log(loggedInUser);
    

    function ElectricalQuote(id, name, address, date, numberplugs, numberswitches)
    {
        this.id = id;
        this.name = name;
        this.address = address;
        this.numberplugs = numberplugs;
        this.numberswitches = numberswitches;
    }
    if (!loggedInUser.quotes) 
    {
        loggedInUser.quotes = [];
    }

    let quotes = loggedInUser.quotes;    
    let counter = loggedInUser.counter || 0;

    $('fieldset').html("");
    quotes.forEach(quote => {
        $('fieldset').append(
            `<p>QuoteID:${quote.id} | ElectricalQuote | Pending | Price:$${(quote.numberplugs * 3) + (quote.numberswitches * 5)}</p>`
        );
    });


    $('#new-quote-div').hide();

    $('#new-quoteB').click(function(){
        $('#new-quoteB').hide();
        $('#new-quote-div').show();
    });

    $('#new-quote').submit(function(event)
    {
        event.preventDefault();

        counter++;
        loggedInUser.counter = counter;
        
        let elecQuote = new ElectricalQuote(
            counter, 
            'Electrical Quote',
            $('input[name="address"]').val(),
            $('input[name="date"]').val(),
            $('input[name="numberplugs"]').val(),
            $('input[name="numberswitches"]').val()
        );

        $('fieldset').append(`<p>QuoteID:${counter} | ElectricalQuote | Pending | Price:$${(elecQuote.numberplugs * 3) + (elecQuote.numberswitches * 5)}</p>`);
        
        quotes.push(elecQuote);

        loggedInUser.quotes = quotes;
        localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

        $('#new-quoteB').show();
        $('#new-quote-div').show();

        //DELETE LATER
        console.log(quotes);
    });
});

