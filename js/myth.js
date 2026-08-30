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

class="myth-map"

viewBox="0 0 1200 1000"

xmlns="http://www.w3.org/2000/svg"

aria-label="Lo.Krain Myth">



<defs>



<!-- ==========================
     ATMOSPHERE
========================== -->


<radialGradient id="mythBackground">


<stop
offset="0%"
stop-color="#1a3154"/>


<stop
offset="45%"
stop-color="#0b1425"/>


<stop
offset="100%"
stop-color="#020306"/>


</radialGradient>





<!-- ==========================
     SPHERE
========================== -->


<radialGradient id="sphereGradient">


<stop
offset="0%"
stop-color="#ffffff"/>


<stop
offset="35%"
stop-color="#d9e8ff"/>


<stop
offset="70%"
stop-color="#7f9bc4"/>


<stop
offset="100%"
stop-color="#26364d"/>


</radialGradient>





<filter id="mythGlow">


<feGaussianBlur

stdDeviation="10"

result="blur"/>


<feMerge>


<feMergeNode
in="blur"/>


<feMergeNode
in="SourceGraphic"/>


</feMerge>


</filter>



</defs>






<!-- ==========================
     BACKGROUND
========================== -->


<rect

width="1200"

height="1000"

fill="url(#mythBackground)"/>







<!-- ==========================
     MAP LINES
========================== -->


<g class="myth-map-lines">



<path

d="
M80 180
C260 90 420 160 620 120
C850 80 1010 150 1140 90
"/>



<path

d="
M60 760
C250 680 440 780 640 700
C850 620 1020 740 1160 650
"/>



<path

d="
M180 900
C380 760 720 860 1030 740
"/>



<path

d="
M300 80
C360 250 250 430 340 620
"/>



</g>








<!-- ==========================
     STARS
========================== -->


<g class="myth-stars">


<circle cx="180" cy="150" r="3"/>

<circle cx="320" cy="260" r="2"/>

<circle cx="980" cy="170" r="3"/>

<circle cx="1080" cy="420" r="2"/>

<circle cx="850" cy="820" r="3"/>

<circle cx="250" cy="760" r="2"/>


</g>








<!-- ==========================
     CENTRAL WORLD
========================== -->


<g class="io-sphere">



<circle

cx="600"

cy="500"

r="120"

fill="url(#sphereGradient)"

filter="url(#mythGlow)"/>






<!-- chess surface -->


<g class="sphere-grid">



<path

d="
M500 500
Q600 430 700 500
Q600 570 500 500
"

fill="none"

stroke="#ffffff"

stroke-opacity=".35"

stroke-width="3"/>




<path

d="
M530 445
L670 555

M670 445
L530 555

"

stroke="#ffffff"

stroke-opacity=".25"

stroke-width="2"/>




</g>



</g>









<!-- ==========================
     THEO FIRST STEP
========================== -->


<g

class="myth-stage stage-theo">



<circle

class="preview-point"

data-step="1"

cx="250"

cy="500"

r="14"/>




<text

class="myth-title"

x="195"

y="630">

THEO

</text>




<text

class="myth-subtitle"

x="150"

y="675">

When you are alone

</text>



</g>








<!-- ==========================
     HIDDEN STEPS
========================== -->


<g

class="myth-stage hidden-stage stage-dreamer">


<circle

class="preview-point"

data-step="2"

cx="950"

cy="400"

r="14"/>


<text

class="myth-title"

x="830"

y="530">

DREAMER

</text>


</g>





<g

class="myth-stage hidden-stage stage-dark">


<circle

class="preview-point"

data-step="3"

cx="600"

cy="820"

r="14"/>



<text

class="myth-title"

x="390"

y="900">

THE DARKEST HOUR

</text>


</g>






<g

class="myth-stage hidden-stage stage-dawn">


<circle

class="myth-point"

data-step="4"

cx="600"

cy="140"

r="14"/>



<text

class="myth-title"

x="550"

y="240">

IO

</text>


</g>




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



<!-- ==================================================
     THEO SCARECROW
================================================== -->


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
