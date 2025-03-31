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
        localStorage.removeItem("loggedInUser");
        window.location.href = "home.html";
    });
});