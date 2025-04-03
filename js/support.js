"user strict";

$(document).ready(function () {

    //Question Obejct contains the email, nature of the question, and the text of the question
    function Question(email, nature, text)
    {
        this.email = email;
        this.nature = nature;
        this.text = text;
    }

    //Array for questions
    let questions = JSON.parse(localStorage.getItem('questions')) || [];

    //Saves the values eneterd into the text boxes into a new question object, and adds it to the list of questions
    $('#support-form').submit(function(event){
        
        let question = new Question(
            $('#support-email').val(),
            $('#support-select').val(),
            $('#support-question').val(),
        );

        questions.push(question);
        localStorage.setItem("questions", JSON.stringify(questions));
    });
});