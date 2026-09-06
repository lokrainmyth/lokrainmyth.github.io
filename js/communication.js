"use strict";


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
    translations[
        document.documentElement.lang
    ].sending;


    button.disabled = true;

    form.querySelectorAll("input, textarea, button")
.forEach(element=>{

    element.style.opacity="0";

    element.style.transform="translateY(-10px)";

});
    
    setTimeout(()=>{

    button.textContent =
    translations[
        document.documentElement.lang
    ].sent;

},2000);

    status.style.opacity = "0";



    setTimeout(()=>{


        status.textContent =
        translations[
            document.documentElement.lang
        ].messageSent;

        status.style.opacity =
            "1";


    },2000);



    const params = {

    from_name:
    document.getElementById("contactName").value,


    contact:
    document.getElementById("contactContact").value,


    message:
    document.getElementById("contactMessage").value

};



    console.log(
        "PARAMS:",
        params
    );

console.log(
    "CONTACT FIELD:",
    document.getElementById("contactContact").value
);

console.log(
    "MESSAGE FIELD:",
    document.getElementById("contactMessage").value
);

console.log(
    "TEXTAREA:",
    document.getElementById("contactMessage")
);

console.log(
    "TEXT VALUE:",
    document.getElementById("contactMessage").value
);

console.log(
"BEFORE SEND:",
document.getElementById("contactMessage").value
);
    
    emailjs.send(

        "service_x28p0ve",

        "template_7x2kupb",

        params

    )
    .then(()=>{

    button.textContent =
        translations[
            document.documentElement.lang
        ].sent;


    setTimeout(()=>{

        status.textContent =
            translations[
                document.documentElement.lang
            ].messageSent;


        status.style.opacity = "1";


    },2500);



    setTimeout(()=>{

        Panels.close();

    },8000);


})


    .catch((error)=>{


        console.log(error);


        status.textContent =
translations[
    document.documentElement.lang
].error;


        button.disabled =
            false;


        button.textContent =
translations[
    document.documentElement.lang
].send;


    });


});
