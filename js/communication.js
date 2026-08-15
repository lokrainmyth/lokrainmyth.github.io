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


    event.preventDefault();


    console.log("SEND PRESSED");


    const form = event.target;


    const button =
        form.querySelector("button");


    const status =
        document.getElementById(
            "communicationStatus"
        );


    button.textContent =
        "Sending...";


    button.disabled = true;

    setTimeout(()=>{

    button.textContent =
        "Sent";

},2000);

    status.style.opacity = "0";



    setTimeout(()=>{


        status.textContent =
            "Your words have reached Lo.Krain.";


        status.style.opacity =
            "1";


    },3000);



    const params = {


        from_name:
        document.getElementById(
            "contactName"
        ).value,


        reply_to:
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


        setTimeout(()=>{


            Panels.close();


        },5000);


    })


    .catch((error)=>{


        console.log(error);


        status.textContent =
            "Something went wrong.";


        button.disabled =
            false;


        button.textContent =
            "Send";


    });


});
