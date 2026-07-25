"use strict";

window.Myth=(function(){

let svg;

function init(){

const svg =
document.querySelector("#mythMap svg");

const path =
document.getElementById("pathTheoDreamer");

path.style.strokeDashoffset = 0;

if(!object)return;

object.addEventListener(

"load",

()=>{

svg=

object.contentDocument;

start();

});

}

function start(){

console.log(

"Myth loaded"

);

}

return{

init

};

})();
