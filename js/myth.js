"use strict";


const Myth = {


    screen:null,
    viewport:null,
    audio:null,
    closeButton:null,


    init(){


        this.screen =
            document.getElementById("mythScreen");


        this.viewport =
            document.getElementById("mythViewport");


        this.audio =
            document.getElementById("mythAudio");


        this.closeButton =
            document.getElementById("mythClose");



        if(
            !this.screen ||
            !this.viewport
        ){

            return;

        }


        this.build();
        this.bind();


    },



    build(){


        this.viewport.innerHTML = `


<svg
class="myth-map"
viewBox="0 0 700 1200"
xmlns="http://www.w3.org/2000/svg">


<defs>


<radialGradient id="sky">

<stop
offset="0%"
stop-color="#172744"/>

<stop
offset="100%"
stop-color="#050812"/>

</radialGradient>



<filter id="glow">

<feGaussianBlur
stdDeviation="5"/>

</filter>


</defs>




<rect
width="700"
height="1200"
fill="url(#sky)"
/>





<!-- PATH -->


<path
class="myth-road"
d="
M180 1000
C280 850 400 760 350 600
C300 450 500 300 470 120
"
/>






<!-- THEO -->


<g
class="myth-place theo">


<circle
class="myth-dot"
cx="180"
cy="1000"
r="12"/>



<text
x="100"
y="1080">

THEO

</text>



<!-- scarecrow -->


<g
class="scarecrow"
transform="translate(180 850)">



<path
d="
M-45 -20
Q0 -60 45 -20
"/>


<line
x1="-60"
y1="-15"
x2="60"
y2="-15"/>



<circle
cy="25"
r="25"/>



<line
y1="50"
y2="140"/>



<line
x1="-45"
y1="80"
x2="45"
y2="80"/>


</g>



</g>






<!-- DREAMER -->


<g
class="myth-place dreamer">


<circle
class="myth-dot"
cx="350"
cy="600"
r="12"/>



<text
x="260"
y="700">

DREAMER

</text>



<g
class="dreamer-figure"
transform="translate(350 500)">



<circle
cy="0"
r="25"/>



<path
d="
M-35 40
Q0 15 35 40
L50 110
L-50 110
Z"/>



</g>


</g>


// ==================================================
// DARKEST HOUR
// ==================================================


<g
class="myth-place darkest">


<circle
class="myth-dot"
cx="250"
cy="360"
r="12"/>



<text
x="80"
y="300">

THE DARKEST HOUR

</text>



<g
class="stars">


<path
d="
M180 350
l8 18
20 2
-15 13
5 20
-18-10
-18 10
5-20
-15-13
20-2z"/>



<path
d="
M250 320
l8 18
20 2
-15 13
5 20
-18-10
-18 10
5-20
-15-13
20-2z"/>



<path
d="
M320 350
l8 18
20 2
-15 13
5 20
-18-10
-18 10
5-20
-15-13
20-2z"/>


</g>


</g>






<!-- ==================================================
     IO
================================================== -->


<g
class="myth-place io">


<circle
class="myth-dot"
cx="470"
cy="120"
r="12"/>




<text
x="430"
y="230">

IO

</text>



<text
class="dawn-text"
x="310"
y="270">

The Dawn has come

</text>






<!-- SUN -->


<g
class="sun"
transform="translate(470 80)">



<circle
r="45"/>



<line
y1="-75"
y2="-55"/>


<line
y1="75"
y2="55"/>


<line
x1="-75"
x2="-55"/>


<line
x1="75"
x2="55"/>


</g>





<!-- BIRDS -->


<g
class="birds">


<path
d="
M520 130
Q540 110 560 130"/>


<path
d="
M570 150
Q590 130 610 150"/>


<path
d="
M620 120
Q640 100 660 120"/>


</g>


</g>





</svg>


`;



    },





    bind(){



        this.closeButton?.addEventListener(
            "click",
            ()=>{
                this.close();
            }
        );



        document.addEventListener(
            "keydown",
            e=>{


                if(e.key==="Escape"){

                    this.close();

                }


            }
        );



        this.viewport
        .querySelector(".io")
        ?.addEventListener(
            "click",
            ()=>{

                this.close();

            }
        );



    },





    open(){


        this.screen
        ?.classList.remove(
            "hidden"
        );



        if(this.audio){

            this.audio.currentTime=0;

            this.audio.play()
            .catch(()=>{});

        }


    },





    close(){


        this.screen
        ?.classList.add(
            "hidden"
        );



        if(this.audio){

            this.audio.pause();

            this.audio.currentTime=0;

        }


    }



};




document.addEventListener(
"DOMContentLoaded",
()=>{

    Myth.init();

});
