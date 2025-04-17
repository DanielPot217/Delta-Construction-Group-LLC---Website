"use strict";

$(document).ready(function () 
{
    //Pulls the Logged in User from Memeory to load profile
    let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    //Redirects Home if there is no logged in user 
    if (!loggedInUser) 
    {
        window.location.href = "index.html";
    }

    //Logout Button Functionality, On click, removes the logged in user from memory, saves user profile
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
    

    //Quote Object
    function ElectricalQuote(id, name, date, address, numberplugs, numberswitches)
    {
        this.id = id;
        this.name = name;
        this.date = date;
        this.address = address;
        this.numberplugs = numberplugs;
        this.numberswitches = numberswitches;
    }
    //If quotes array exists in memory, load the array into loggedin user
    if (!loggedInUser.quotes) 
    {
        loggedInUser.quotes = [];
    }

    //Loads quotes, and counter of quote ids
    let quotes = loggedInUser.quotes;    
    let counter = loggedInUser.counter || 0;

    //Displays Quotes from the quotes array 
    $('fieldset').html("");
    if(quotes.length === 0)
        {
            $('fieldset').append(
                '<p class="center-text">No Current Quotes</p>'
            );       
        }else{
            quotes.forEach(quote => {
                $('fieldset').append(
                    `<div class="quote-div" data-id="${quote.id}">
                        <p>QuoteID:${quote.id} | ElectricalQuote | Pending | Price:$${(quote.numberplugs * 3) + (quote.numberswitches * 5)}</p>
                        <button class="deleteB">Delete</button>
                    </div>`
                );
            });
        }
    
    //Delete Button Functionallity
    $('fieldset').on('click', '.deleteB', function() {
        const quoteDiv = $(this).closest('.quote-div');
        const id = parseInt(quoteDiv.data('id'), 10);
      
        //Searches the quote array based on the id, and filters it out
        quotes = quotes.filter(quote => quote.id !== id);
        
        loggedInUser.quotes = quotes;
        localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

        location.reload();
      });

      
    //Creates New Quote
    $('#new-quote').hide();

    $('#new-quoteB').click(function(){
        $('#new-quoteB').hide();
        $('#new-quote').show();
    });

    //DatePicker Plugin
    $('input[name="date"]').datepicker({ minDate: 0, showAnim: "show",
        beforeShow: function(input, inst) {
          setTimeout(function() {
            $("#ui-datepicker-div").hide().effect("slide", {
              direction: "up",
              mode: "show"
            }, 100);
          }, 10);
    }});

    $('#new-quote').submit(function(event)
    {
        //Creates New Quote object with details entered by user
        counter++;
        loggedInUser.counter = counter;

        let elecQuote = new ElectricalQuote(
            counter, 
            'Electrical Quote',
            $('input[name="date"]').val(),
            $('input[name="address"]').val(),
            $('input[name="numberplugs"]').val(),
            $('input[name="numberswitches"]').val()
        );

        //Displays on Screen, Adds to Quotes Array, Saves into Memory
        $('fieldset').append(`<p>QuoteID:${counter} | ElectricalQuote | Pending | Price:$${(elecQuote.numberplugs * 3) + (elecQuote.numberswitches * 5)}</p>`);
        
        quotes.push(elecQuote);

        loggedInUser.quotes = quotes;
        localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

        $('#new-quoteB').show();
        $('#new-quote-div').show();
    });
});

