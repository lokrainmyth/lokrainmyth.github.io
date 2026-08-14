console.log("COMMUNICATION ACTIVE");

"use strict";


emailjs.init(
    "ERryTDaq2vefa_Fop"
);


const form =
document.getElementById(
    "communicationForm"
);

const form =
document.getElementById(
    "communicationForm"
);


if(!form) return;


form.addEventListener(
"submit",
function(event){

    event.preventDefault();


    const params = {

        from_name:
        document.getElementById(
            "senderName"
        ).value,


        contact:
        document.getElementById(
            "senderContact"
        ).value,


        message:
        document.getElementById(
            "message"
        ).value

    };


    emailjs.send(
        "service_x28p0ve",
        "template_7x2kupb",
        params
    )
    .then(()=>{

        alert(
        "Thank you. Your message has reached Lo.Krain."
        );


        form.reset();


    })
    .catch(error=>{

        console.log(error);

        alert(
        "Something went wrong."
        );

    });


});
