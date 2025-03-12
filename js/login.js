"use strict";

document.getElementById("login-submit").onclick = function(event){

    event.preventDefault();

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
