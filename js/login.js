"use strict";

//On click event that is called when the login button 
document.getElementById("login-submit").onclick = function(event){

    event.preventDefault();

    //Check what value is entered and navigates the user to the specified page
    let email = document.getElementsByName("login-email")[0].value;

    if(email === "Admin" || email === "admin")
    {
        window.location.href = "admin-portal.html";
        console.log(email);
    }else if(email === "Client" || email === "client")
    {
        window.location.href = "client-portal.html";
        console.log(email);
    }else{
        alert("Invalid Email");
    }
}
