"use strict";

console.log("COMMUNICATION ACTIVE");


emailjs.init(
    "ERryTDaq2vefa_Fop"
);


document.addEventListener(
"submit",
function(event){


    if(
        event.target.id !== "communicationForm"
    ){
        return;
    }


    console.log("SEND PRESSED");


    event.preventDefault();


    const params = {


        from_name:
        document.getElementById(
            "contactName"
        ).value,


        contact:
        document.getElementById(
            "contactContact"
        ).value,


        message:
        document.getElementById(
            "contactMessage"
        ).value

    };


    console.log(
        "PARAMS:",
        params
    );


    emailjs.send(

        "service_x28p0ve",

        "template_7x2kupb",

        params

    )
    .then(()=>{


        console.log(
            "MESSAGE SENT"
        );


        alert(
        "Thank you. Your message has reached Lo.Krain."
        );


        document
        .getElementById(
            "communicationForm"
        )
        .reset();


    })


    .catch(error=>{


        console.log(
            "EMAIL ERROR:",
            error
        );


        alert(
        "Something went wrong."
        );


    });


});
