"use strict";


emailjs.init({

    publicKey:"ERryTDaq2vefa_Fop"

});


document.addEventListener(
"click",
(event)=>{


if(
event.target.id !== "sendMessageButton"
){

    return;

}


const name =
document.getElementById("contactName").value;


const email =
document.getElementById("contactEmail").value;


const message =
document.getElementById("contactMessage").value;



emailjs.send(

"service_x28p0ve",

"template_7x2kupb",

{

from_name:name,

reply_to:email,

message:message

}

)

.then(()=>{


document.getElementById(
"communicationStatus"
).textContent =
"Message sent";


})

.catch(()=>{


document.getElementById(
"communicationStatus"
).textContent =
"Error sending message";


});


});
