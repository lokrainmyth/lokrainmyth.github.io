"use strict";


const Myth = {


    screen:null,
    viewport:null,
    closeButton:null,
    audio:null,


    step:0,
    initialized:false,



    init(){


        if(this.initialized) return;


        this.initialized=true;



        this.screen =
            document.getElementById("mythScreen");


        this.viewport =
            document.getElementById("mythViewport");


        this.closeButton =
            document.getElementById("mythClose");


        this.audio =
            document.getElementById("mythAudio");



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



<!-- background glow -->


<radialGradient id="mythSky">


<stop
offset="0%"
stop-color="#182844"/>


<stop
offset="55%"
stop-color="#09111f"/>


<stop
offset="100%"
stop-color="#03050a"/>


</radialGradient>




<filter id="softGlow">


<feGaussianBlur
stdDeviation="7"
result="blur"/>


<feMerge>


<feMergeNode
in="blur"/>


<feMergeNode
in="SourceGraphic"/>


</feMerge>


</filter>





<linearGradient
id="pathGradient"
x1="0"
x2="1">


<stop
offset="0%"
stop-color="#d7c78d"/>


<stop
offset="50%"
stop-color="#eef0ff"/>


<stop
offset="100%"
stop-color="#f5d98a"/>


</linearGradient>



</defs>





<!-- ==================================================
     ATMOSPHERE
================================================== -->


<rect
x="0"
y="0"
width="700"
height="1200"
fill="url(#mythSky)"/>




<!-- subtle map lines -->


<g
class="myth-background-lines">


<path
d="
M40 200
C180 120 400 150 650 80
"/>


<path
d="
M20 900
C220 780 430 850 680 760
"/>


<path
d="
M100 1100
C300 980 500 1040 650 930
"/>



<circle
cx="120"
cy="280"
r="2"/>


<circle
cx="560"
cy="420"
r="2"/>


<circle
cx="180"
cy="780"
r="2"/>


</g>







<!-- ==================================================
     PATH
================================================== -->



<g
class="myth-paths">



<path
id="pathTheoDreamer"
class="myth-line"
d="
M180 1020
C250 900
390 820
430 680
"/>




<path
id="pathDreamerDark"
class="myth-line"
d="
M430 680
C520 560
260 470
300 330
"/>





<path
id="pathDarkIo"
class="myth-line"
d="
M300 330
C380 240
520 190
470 100
"/>



</g>





<!-- ==================================================
     THEO
================================================== -->


<g
id="stageTheo"
class="myth-stage active"
data-step="1">



<circle
class="myth-point"
cx="180"
cy="1020"
r="12"/>



<text
class="myth-title"
x="80"
y="1110">

THEO

</text>




<!-- scarecrow -->


<g
class="figure-theo"
transform="translate(180 860)">



<!-- hat -->


<path
d="
M-55 -30
Q0 -65 55 -30
Z"/>



<line
x1="-65"
y1="-25"
x2="65"
y2="-25"/>





<!-- head -->


<circle
cy="15"
r="28"/>




<!-- body -->


<line
y1="45"
y2="150"/>



<line
x1="-55"
y1="80"
x2="55"
y2="80"/>




</g>



// ==================================================
// DREAMER
// ==================================================


<g
id="stageDreamer"
class="myth-stage locked"
data-step="2">


<circle
class="myth-point"
cx="430"
cy="680"
r="12"/>


<text
class="myth-title"
x="340"
y="770">

DREAMER

</text>





<!-- sitting dreamer -->


<g
class="figure-dreamer"
transform="translate(430 570)">



<!-- head -->

<circle
cy="0"
r="24"/>



<!-- body -->

<path
d="
M-35 35
Q0 15 35 35
L45 95
L-45 95
Z"/>




<!-- legs -->

<line
x1="-25"
y1="95"
x2="-50"
y2="130"/>


<line
x1="25"
y1="95"
x2="50"
y2="130"/>




</g>



</g>





// ==================================================
// DARKEST HOUR
// ==================================================


<g
id="stageDark"
class="myth-stage locked"
data-step="3">



<circle
class="myth-point"
cx="300"
cy="330"
r="12"/>



<text
class="myth-title"
x="110"
y="250">

THE DARKEST HOUR

</text>





<!-- stars -->


<g
class="stars">



<path
d="
M240 290
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
M300 260
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
M360 290
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








// ==================================================
// IO
// ==================================================


<g
id="stageIo"
class="myth-stage locked"
data-step="4">





<circle
class="myth-point"
cx="470"
cy="100"
r="12"/>




<text
class="myth-title"
x="430"
y="190">

IO

</text>



<text
class="myth-subtitle"
x="360"
y="230">

The Dawn has come

</text>





<!-- SUN -->


<g
class="sun">



<circle
cx="470"
cy="55"
r="38"/>




<g
class="sun-rays">


<line
x1="470"
y1="0"
x2="470"
y2="20"/>


<line
x1="470"
y1="90"
x2="470"
y2="110"/>


<line
x1="415"
y1="55"
x2="435"
y2="55"/>


<line
x1="505"
y1="55"
x2="525"
y2="55"/>


</g>



</g>





<!-- birds -->


<g
class="birds">



<path
d="
M520 80
Q535 65 550 80
"/>


<path
d="
M560 100
Q575 85 590 100
"/>


<path
d="
M600 75
Q615 60 630 75
"/>



</g>



</g>





</svg>


`;

    },


    bind(){


        this.viewport
        .querySelectorAll(".myth-stage")
        .forEach(stage=>{


            stage.addEventListener(
                "click",
                ()=>{


                    const step =
                        Number(
                            stage.dataset.step
                        );


                    this.activate(step);


                }
            );


        });



        this.closeButton?.addEventListener(
            "click",
            ()=>{
                this.close();
            }
        );



        document.addEventListener(
            "keydown",
            event=>{


                if(
                    event.key==="Escape" &&
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


            this.reveal(
                "stageDreamer"
            );


            this.draw(
                "pathTheoDreamer"
            );


        }





        if(step===2){


            this.reveal(
                "stageDark"
            );


            this.draw(
                "pathDreamerDark"
            );


        }






        if(step===3){


            this.reveal(
                "stageIo"
            );


            this.draw(
                "pathDarkIo"
            );


        }





        if(step===4){


            this.showStreaming();



        }


    },






    reveal(id){


        const element =
            document.getElementById(id);


        element?.classList.remove(
            "locked"
        );


        element?.classList.add(
            "visible"
        );


    },







    draw(id){


        document
        .getElementById(id)
        ?.classList.add(
            "visible"
        );


    },






    showStreaming(){


        const text =
        document.createElement(
            "div"
        );


        text.className =
            "myth-streaming";



        text.innerHTML =
        `
        Listen on all streaming platforms
        `;



        this.screen.appendChild(
            text
        );



        setTimeout(
            ()=>{

                this.close();

            },
            3000
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



        this.screen
        ?.setAttribute(
            "aria-hidden",
            "true"
        );



        if(this.audio){


            this.audio.pause();


            this.audio.currentTime=0;


        }



        document
        .querySelector(".myth-streaming")
        ?.remove();



    }



};




document.addEventListener(
"DOMContentLoaded",
()=>{


    Myth.init();


});

    
