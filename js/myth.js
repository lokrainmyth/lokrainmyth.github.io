"use strict";


const Myth = {


    initialized:false,

    screen:null,

    viewport:null,

    sound:null,

    step:0,



    init(){


        if(this.initialized)
            return;


        this.initialized = true;


        this.screen =
            document.getElementById("mythScreen");


        this.viewport =
            document.getElementById("mythViewport");


        this.sound =
            document.getElementById("mythSound");



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
xmlns="http://www.w3.org/2000/svg"
viewBox="0 0 1200 1200">


<defs>


<!-- BACKGROUND -->

<radialGradient id="bg">

    <stop
    offset="0%"
    stop-color="#253858"/>

    <stop
    offset="55%"
    stop-color="#101827"/>

    <stop
    offset="100%"
    stop-color="#050812"/>

</radialGradient>



<!-- SPHERE LIGHT -->

<radialGradient id="sphere">

    <stop
    offset="0%"
    stop-color="#ffffff"/>

    <stop
    offset="35%"
    stop-color="#d5e5ff"/>

    <stop
    offset="75%"
    stop-color="#6f86ad"/>

    <stop
    offset="100%"
    stop-color="#26334b"/>

</radialGradient>



<!-- SUN -->

<radialGradient id="sun">

    <stop
    offset="0%"
    stop-color="#fff8cf"/>

    <stop
    offset="50%"
    stop-color="#ffd76a"/>

    <stop
    offset="100%"
    stop-color="#e59b36"/>

</radialGradient>



<!-- GLOW -->

<filter id="glow">

    <feGaussianBlur
    stdDeviation="12"/>

</filter>



</defs>





<!-- =========================
     DEEP MAP BACKGROUND
========================= -->


<rect

width="1200"
height="1200"

fill="url(#bg)"/>





<!-- AIRPORT MAP LINES -->

<g

fill="none"

stroke="#a9c7ff"

stroke-opacity=".14"

stroke-width="2">


<path

d="
M80 300
C300 160 420 260 600 180
C820 80 980 260 1120 140"/>



<path

d="
M120 850
C300 720 500 850 720 730
C950 600 1080 760 1160 650"/>



<path

d="
M200 540
C360 430 500 560 650 500
C820 420 980 540 1100 430"/>



<path

d="
M350 80
C430 260 250 430 420 650
C500 760 470 900 600 1080"/>



<path

d="
M900 100
C820 300 1000 420 850 650
C760 760 830 920 720 1080"/>



</g>





<!-- SMALL STARS -->


<g fill="#ffffff">


<circle cx="160" cy="180" r="3"/>

<circle cx="320" cy="320" r="2"/>

<circle cx="960" cy="190" r="3"/>

<circle cx="1050" cy="520" r="2"/>

<circle cx="220" cy="900" r="2"/>

<circle cx="980" cy="850" r="3"/>


</g>








<!-- =========================
     CENTRAL WORLD
========================= -->


<g>


<circle

cx="600"

cy="600"

r="170"

fill="#9bc7ff"

opacity=".25"

filter="url(#glow)"/>



<circle

cx="600"

cy="600"

r="120"

fill="url(#sphere)"/>





<!-- chess surface -->


<g

fill="none"

stroke="rgba(255,255,255,.35)"

stroke-width="3">


<ellipse

cx="600"

cy="600"

rx="120"

ry="35"/>


<ellipse

cx="600"

cy="600"

rx="120"

ry="75"/>


<ellipse

cx="600"

cy="600"

rx="120"

ry="110"/>



<path

d="
M480 600
H720"/>


<path

d="
M600 480
V720"/>


<path

d="
M520 520
L680 680"/>


<path

d="
M680 520
L520 680"/>


</g>


</g>






<!-- =========================
     PATH START
========================= -->


<g

fill="none"

stroke="#d8e7ff"

stroke-opacity=".5"

stroke-width="3">


<path

d="
M260 600
C390 500 470 560 600 600"/>


<path

d="
M600 600
C740 560 820 500 940 600"/>


<path

d="
M600 600
C600 760 600 820 600 930"/>


<path

d="
M600 600
C600 430 600 340 600 200"/>


</g>

<!-- =========================
     THEO
========================= -->


<g>


<!-- activation point -->


<circle

cx="260"

cy="600"

r="14"

fill="#bcd8ff"/>


<circle

cx="260"

cy="600"

r="28"

fill="none"

stroke="#bcd8ff"

stroke-opacity=".25"

stroke-width="2"/>





<!-- scarecrow -->


<g

transform="translate(260 390)"

stroke="#dceaff"

stroke-width="5"

fill="none">



<!-- hat -->


<path

d="
M-65 10
Q0 -55 65 10
Z"/>



<line

x1="-80"

y1="10"

x2="80"

y2="10"/>





<!-- head -->


<circle

cx="0"

cy="60"

r="38"/>





<!-- eyes -->


<circle

cx="-12"

cy="55"

r="3"

fill="#dceaff"/>


<circle

cx="12"

cy="55"

r="3"

fill="#dceaff"/>





<!-- body -->


<path

d="
M0 100
L0 240"/>





<!-- arms -->


<path

d="
M-100 150
L100 150"/>





<!-- coat -->


<path

d="
M-60 120
L60 120
L90 240
L-90 240
Z"/>




<!-- straw lines -->


<path

d="
M-60 150
L-95 190"/>


<path

d="
M60 150
L95 190"/>



</g>





<text

x="160"

y="760"

fill="#ffffff"

font-family="Inter, sans-serif"

font-size="46"

letter-spacing="12">

THEO

</text>



<text

x="105"

y="820"

fill="#bfd4ff"

font-family="Inter, sans-serif"

font-size="22">

When you are alone

</text>


</g>









<!-- =========================
     DREAMER
========================= -->


<g>



<circle

cx="940"

cy="600"

r="14"

fill="#bcd8ff"/>


<circle

cx="940"

cy="600"

r="28"

fill="none"

stroke="#bcd8ff"

stroke-opacity=".25"

stroke-width="2"/>







<g

transform="translate(940 390)"

stroke="#dceaff"

stroke-width="5"

fill="none">



<!-- head -->


<circle

cy="0"

r="38"/>





<!-- hair -->


<path

d="
M-38 -5
Q0 -55 38 -5"/>





<!-- body -->


<path

d="
M0 40
L0 180"/>





<!-- arms -->


<path

d="
M-80 90
L80 90"/>





<!-- legs -->


<path

d="
M0 180
L-45 260"/>


<path

d="
M0 180
L45 260"/>


</g>





<text

x="790"

y="760"

fill="#ffffff"

font-family="Inter, sans-serif"

font-size="46"

letter-spacing="12">

DREAMER

</text>



<text

x="730"

y="820"

fill="#bfd4ff"

font-family="Inter, sans-serif"

font-size="22">

When you dream of connection

</text>



</g>









<!-- =========================
     DARKEST HOUR
========================= -->


<g>


<circle

cx="600"

cy="930"

r="14"

fill="#bcd8ff"/>


<circle

cx="600"

cy="930"

r="28"

fill="none"

stroke="#bcd8ff"

stroke-opacity=".25"

stroke-width="2"/>







<!-- stars -->


<g

fill="#ffffff">


<circle

cx="530"

cy="850"

r="7"/>


<circle

cx="600"

cy="820"

r="10"/>


<circle

cx="670"

cy="850"

r="7"/>


</g>





<text

x="320"

y="1030"

fill="#ffffff"

font-family="Inter, sans-serif"

font-size="42"

letter-spacing="8">

THE DARKEST HOUR IS BEFORE THE DAWN

</text>



<text

x="470"

y="1080"

fill="#bfd4ff"

font-family="Inter, sans-serif"

font-size="22">

When you lost the way

</text>



</g>

<!-- =========================
     DAWN / IO
========================= -->


<g>



<!-- activation point -->


<circle

cx="600"

cy="200"

r="14"

fill="#ffe7a3"/>


<circle

cx="600"

cy="200"

r="30"

fill="none"

stroke="#ffe7a3"

stroke-opacity=".35"

stroke-width="2"/>







<!-- sun glow -->


<circle

cx="600"

cy="120"

r="95"

fill="#ffd86b"

opacity=".18"

filter="url(#glow)"/>





<!-- sun -->


<circle

cx="600"

cy="120"

r="55"

fill="url(#sun)"/>







<!-- rays -->


<g

stroke="#ffd86b"

stroke-width="5"

stroke-linecap="round">


<line

x1="600"

y1="35"

x2="600"

y2="0"/>


<line

x1="520"

y1="70"

x2="480"

y2="35"/>


<line

x1="680"

y1="70"

x2="720"

y2="35"/>


<line

x1="490"

y1="120"

x2="450"

y2="120"/>


<line

x1="710"

y1="120"

x2="750"

y2="120"/>


</g>







<!-- road -->


<path

d="
M600 200
C600 350 600 430 600 520
"

fill="none"

stroke="url(#sunRoad)"

stroke-width="8"/>







<!-- birds -->


<g

stroke="#ffffff"

stroke-width="3"

fill="none">


<path

d="
M450 160
Q470 140 490 160"/>


<path

d="
M720 180
Q740 160 760 180"/>


<path

d="
M820 120
Q840 100 860 120"/>


</g>








<text

x="500"

y="320"

fill="#ffffff"

font-family="Inter, sans-serif"

font-size="52"

letter-spacing="16">

IO

</text>





<text

x="410"

y="380"

fill="#ffe7a3"

font-family="Inter, sans-serif"

font-size="22">

When the dawn has come

</text>



</g>










<!-- =========================
     FINAL LABELS
========================= -->


<g

fill="#ffffff"

font-family="Inter, sans-serif"

text-anchor="middle">


<text

x="600"

y="760"

font-size="18"

opacity=".45"

letter-spacing="6">

THE JOURNEY

</text>


</g>






<!-- =========================
     END
========================= -->


</svg>

`;

    },

        addFigures(){


        const svg =
            this.viewport.querySelector("svg");


        if(!svg) return;



        svg.insertAdjacentHTML(
            "beforeend",
            `


<!-- THEO -->

<g
class="figure-theo"
opacity="0">


<g
transform="translate(250 350)">



<!-- hat -->

<path

d="
M-55 -30
Q0 -75 55 -30
"

fill="none"

stroke="#dbe8ff"

stroke-width="5"/>


<line

x1="-65"
y1="-30"
x2="65"
y2="-30"

stroke="#dbe8ff"

stroke-width="8"/>





<!-- head -->


<circle

cx="0"

cy="10"

r="35"

fill="none"

stroke="#dbe8ff"

stroke-width="4"/>





<!-- body -->


<path

d="
M0 45
L0 180
"

stroke="#dbe8ff"

stroke-width="5"/>



<!-- arms -->


<path

d="
M-80 85
L80 85
"

stroke="#dbe8ff"

stroke-width="5"/>





<!-- coat -->


<path

d="
M-45 70
L45 70
L65 170
L-65 170
Z
"

fill="none"

stroke="#dbe8ff"

stroke-width="4"/>




</g>


</g>







<!-- ==================================================
     DREAMER BOY
================================================== -->


<g

class="figure-dreamer"

opacity="0">


<g

transform="translate(950 260)">



<!-- head -->


<circle

cx="0"

cy="0"

r="30"

fill="none"

stroke="#dbe8ff"

stroke-width="4"/>





<!-- body -->


<path

d="
M0 35
L0 150

M-55 80
L55 80
"

stroke="#dbe8ff"

stroke-width="5"

fill="none"/>





<!-- legs -->


<path

d="
M0 150
L-35 220

M0 150
L35 220
"

stroke="#dbe8ff"

stroke-width="5"

fill="none"/>



</g>


</g>









<!-- ==================================================
     DARKEST HOUR
================================================== -->


<g

class="figure-night"

opacity="0">


<g

transform="translate(600 760)">



<!-- three stars -->


<circle

cx="-70"

cy="0"

r="8"/>


<circle

cx="0"

cy="-35"

r="8"/>


<circle

cx="70"

cy="0"

r="8"/>



</g>


</g>








<!-- ==================================================
     DAWN / IO
================================================== -->


<g

class="figure-dawn"

opacity="0">


<g

transform="translate(600 120)">



<!-- sun -->


<circle

r="55"

fill="#f5d98b"

filter="url(#mythGlow)"/>





<!-- rays -->


<g

class="sun-rays"

stroke="#f5d98b"

stroke-width="5">


<line
x1="0"
y1="-90"
x2="0"
y2="-130"/>


<line
x1="0"
y1="90"
x2="0"
y2="130"/>


<line
x1="-90"
y1="0"
x2="-130"
y2="0"/>


<line
x1="90"
y1="0"
x2="130"
y2="0"/>



</g>


</g>


</g>







<!-- ==================================================
     PATHS
================================================== -->


<g class="journey-lines">



<path

id="lineTheo"

d="
M250 500
C400 430 650 420 950 400
"

 />



<path

id="lineDreamer"

d="
M950 400
C820 600 720 730 600 820
"

 />



<path

id="lineDawn"

d="
M600 820
C580 600 590 350 600 140
"

 />



</g>

<g id="theoStage">

...

</g>


<g id="dreamerStage" class="hidden-stage">

...

</g>


<g id="darkStage" class="hidden-stage">

...

</g>


<g id="ioStage" class="hidden-stage">

...

</g>



`
        );

this.addFigures();

    },

        bind(){


        this.viewport
            .querySelectorAll(".myth-point")
            .forEach(point=>{


                point.addEventListener(
                    "click",
                    ()=>{


                        const step =
                            Number(
                                point.dataset.step
                            );


                        this.activate(step);


                    }
                );


            });



        document.addEventListener(
            "keydown",
            e=>{


                if(
                    e.key==="Escape" &&
                    !this.screen.classList.contains("hidden")
                ){

                    this.close();

                }


            }
        );



    },






    activate(step){


        if(
            step !== this.step + 1
        ){

            return;

        }



        this.step = step;



        if(step===1){

            this.showTheo();

        }


        if(step===2){

            this.showDreamer();

        }


        if(step===3){

            this.showNight();

        }


        if(step===4){

            this.showDawn();

        }


    },






    showTheo(){


        document
        .querySelector(".figure-theo")
        ?.classList.add("visible");



        document
        .querySelector(".stage-dreamer")
        ?.classList.remove("hidden-stage");



    },






    showDreamer(){



        document
        .querySelector(".figure-dreamer")
        ?.classList.add("visible");



        this.drawLine(
            "lineTheo"
        );



        document
        .querySelector(".stage-dark")
        ?.classList.remove("hidden-stage");



    },






    showNight(){



        document
        .querySelector(".figure-night")
        ?.classList.add("visible");



        this.drawLine(
            "lineDreamer"
        );



        document
        .querySelector(".stage-dawn")
        ?.classList.remove("hidden-stage");



    },








    showDawn(){



        document
        .querySelector(".figure-dawn")
        ?.classList.add("visible");



        this.drawLine(
            "lineDawn"
        );



    },







    drawLine(id){


        const line =
            document.getElementById(id);



        if(!line)
            return;



        line.classList.add(
            "draw"
        );


    },








    open(){


        this.step=0;



        this.screen
        ?.classList.remove(
            "hidden"
        );



        this.screen
        ?.setAttribute(
            "aria-hidden",
            "false"
        );



        this.build();



        this.sound
        ?.play()
        .catch(()=>{});



    },






    close(){



        this.screen
        ?.classList.add(
            "hidden"
        );



        this.screen
        ?.setAttribute(
            "aria-hidden",
            "true"
        );



        this.sound
        ?.pause();



        if(this.sound){

            this.sound.currentTime=0;

        }



    }



};
