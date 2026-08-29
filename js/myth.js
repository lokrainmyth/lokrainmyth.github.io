"use strict";

/* ==========================================================
   LO.KRAIN MYTH MAP
========================================================== */

const Myth = {

    initialized:false,

    screen:null,
    viewport:null,

    step:0,


    init(){

        if(this.initialized) return;

        this.initialized=true;


        this.screen =
            document.getElementById("mythScreen");


        this.viewport =
            document.getElementById("mythViewport");


        if(!this.screen || !this.viewport) return;


        this.build();

    },


    build(){

        this.viewport.innerHTML = `

<svg
class="myth-map"
viewBox="0 0 1200 900"
xmlns="http://www.w3.org/2000/svg">


<defs>


<!-- night atmosphere -->

<radialGradient id="mythSky">

<stop offset="0%" stop-color="#26304d"/>

<stop offset="45%" stop-color="#101526"/>

<stop offset="100%" stop-color="#05060c"/>

</radialGradient>



<radialGradient id="worldGlow">

<stop offset="0%" stop-color="#dcecff"/>

<stop offset="40%" stop-color="#789bd8"/>

<stop offset="100%" stop-color="#18233d"/>

</radialGradient>



<linearGradient id="dawnRoad"
x1="0"
x2="0"
y1="0"
y2="1">

<stop offset="0%" stop-color="#fff2b0"/>

<stop offset="100%" stop-color="#d69b45"/>

</linearGradient>



<filter id="softGlow">

<feGaussianBlur
stdDeviation="8"/>

</filter>



<filter id="blueGlow">

<feGaussianBlur
stdDeviation="4"/>

</filter>


</defs>



<!-- BACKGROUND -->


<rect
class="myth-background"
width="1200"
height="900"
fill="url(#mythSky)"
/>



<!-- STARS -->


<g class="myth-stars">


<path d="
M120 160
l5 14
14 5
-14 5
-5 14
-5-14
-14-5
14-5z"/>


<path d="
M1000 220
l5 14
14 5
-14 5
-5 14
-5-14
-14-5
14-5z"/>


<path d="
M930 120
l4 12
12 4
-12 4
-4 12
-4-12
-12-4
12-4z"/>


</g>




<!-- PATH -->

<g class="myth-route">


<path
class="route-line"
d="
M180 450
C360 300
500 350
600 450
C720 560
820 470
1020 300
"/>


<path
class="route-line"
d="
M600 450
C600 620
600 700
600 780
"/>


</g>





<!-- CENTRAL WORLD -->


<g class="myth-world"
data-action="world">


<circle
cx="600"
cy="450"
r="90"
fill="url(#worldGlow)"
/>


<circle
cx="600"
cy="450"
r="90"
class="world-ring"
/>



<!-- chess surface -->


<g class="world-grid">


<path d="
M520 430
H680
M520 470
H680
M560 370
V530
M600 360
V540
M640 370
V530
"/>


</g>



</g>





<!-- THEO -->


<g
class="myth-place theo"
data-action="theo">


<circle
class="portal"
cx="180"
cy="450"
r="16"/>



<!-- hat -->

<path
class="scare-hat"
d="
M120 360
Q180 320 240 360
L220 390
L140 390Z"
/>



<!-- head -->

<circle
cx="180"
cy="420"
r="30"
class="scare-head"
/>



<!-- body -->


<path
class="scare-body"
d="
M150 455
L210 455
L230 600
L130 600Z"
/>


<!-- arms -->


<path
class="scare-line"
d="
M90 500
L270 500"
/>


</g>





<!-- DREAMER -->


<g
class="myth-place dreamer"
data-action="dreamer">


<circle
class="portal"
cx="1020"
cy="300"
r="16"/>



<circle
class="dream-head"
cx="1020"
cy="360"
r="24"/>



<path
class="dream-body"
d="
M995 390
L1045 390
L1060 520
L980 520Z"
/>


</g>





<!-- NIGHT -->


<g
class="myth-place night"
data-action="night">


<circle
class="portal"
cx="600"
cy="780"
r="16"/>


<circle
cx="520"
cy="720"
r="35"
class="moon"/>


<g class="night-stars">

<path d="
M600 720
l8 20
20 8
-20 8
-8 20
-8-20
-20-8
20-8z"/>


<path d="
M690 760
l6 15
15 6
-15 6
-6 15
-6-15
-15-6
15-6z"/>


<path d="
M760 700
l5 12
12 5
-12 5
-5 12
-5-12
-12-5
12-5z"/>


</g>


</g>






<!-- DAWN -->


<g
class="myth-place dawn"
data-action="dawn">


<circle
class="portal"
cx="600"
cy="120"
r="16"/>



<circle
class="sun"
cx="600"
cy="120"
r="45"/>



<path
class="sun-road"
d="
M600 170
L500 900
L700 900
Z"
/>



<g class="birds">

<path d="
M450 200
Q470 180 490 200
"/>

<path d="
M710 200
Q730 180 750 200
"/>


</g>


</g>



</svg>

`;



this.bind();


},



bind(){


this.viewport
.querySelectorAll("[data-action]")
.forEach(node=>{


node.addEventListener(
"click",
()=>{

this.activate(
node.dataset.action
);

});


});


},




activate(action){


if(action==="theo"){

this.reveal(".dreamer");

}


if(action==="dreamer"){

this.reveal(".night");

}


if(action==="night"){

this.reveal(".dawn");

}


if(action==="dawn"){

this.complete();

}


},



reveal(selector){


document
.querySelector(selector)
?.classList.add("visible");


},




complete(){


this.screen
.classList.add("myth-complete");


setTimeout(()=>{


this.close();


unlockAfterMyth();


document
.querySelector(".world")
?.classList.remove("hidden");


},1500);


},




open(){


this.step=0;


this.screen
?.classList.remove("hidden");


this.screen
?.setAttribute(
"aria-hidden",
"false"
);


this.build();


},




close(){


this.screen
?.classList.add("hidden");


this.screen
?.setAttribute(
"aria-hidden",
"true"
);


}


};
