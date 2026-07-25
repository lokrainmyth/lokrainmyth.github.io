"use strict";

window.Myth=(function(){

let svg;

function init(){

const object=

document.getElementById("mythSVG");

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
