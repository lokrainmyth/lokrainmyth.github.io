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


    form.addEventListener("submit", function(event){

    event.preventDefault();


    const button =
        form.querySelector("button");


    button.textContent = "Sending...";

    button.disabled = true;


    const successMessage = 
        "Your words have reached Lo.Krain.";


    status.style.opacity = "0";


    setTimeout(()=>{

        status.textContent = successMessage;

        status.style.opacity = "1";


    },300);



    emailjs.send(
        "service_x28p0ve",
        "template_7x2kupb",
        {
            from_name:
            document.getElementById("contactName").value,

            reply_to:
            document.getElementById("contactContact").value,

            message:
            document.getElementById("contactMessage").value
        }
    )
    .then(()=>{


        setTimeout(()=>{

            Panels.close();

        },1200);


    })
    .catch((error)=>{

        console.log(error);

        status.textContent =
        "Something went wrong.";

        button.disabled=false;

        button.textContent="Send";

    });


});
