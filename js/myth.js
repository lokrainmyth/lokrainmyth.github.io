"use strict";


const Myth = {


    screen:null,
    viewport:null,
    audio:null,


    step:0,


    init(){

        this.screen =
            document.getElementById("mythScreen");


        this.viewport =
            document.getElementById("mythViewport");


        this.audio =
            document.getElementById("mythSound");


        if(!this.screen || !this.viewport)
            return;


        this.build();


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



    build(){


        this.viewport.innerHTML = `


<svg
class="myth-map"
viewBox="0 0 600 1200"
xmlns="http://www.w3.org/2000/svg">


<defs>


<filter id="glow">

<feGaussianBlur
stdDeviation="6"/>

</filter>


</defs>



<!-- PATHS -->


<path
id="line1"
class="myth-line"
d="
M300 980
C250 820 350 700 300 560
"/>


<path
id="line2"
class="myth-line"
d="
M300 560
C450 450 250 350 300 250
"/>


<path
id="line3"
class="myth-line"
d="
M300 250
C300 180 300 130 300 90
"/>




<!-- THEO -->


<g
id="theo"
class="myth-stage active"
data-step="1">


<circle
class="myth-point"
cx="300"
cy="980"
r="12"/>



<text
x="250"
y="1050">

THEO

</text>



<!-- scarecrow -->

<g
class="figure"
transform="translate(300 850)">


<path
d="
M-30 0
Q0-35 30 0
"/>


<circle
cy="35"
r="18"/>


<line
y1="55"
y2="120"/>


<line
x1="-35"
x2="35"
y1="80"
y2="80"/>


</g>


</g>





<!-- DREAMER -->


<g
id="dreamer"
class="myth-stage"
data-step="2">


<circle
class="myth-point"
cx="300"
cy="560"
r="12"/>



<text
x="190"
y="630">

DREAMER

</text>



<g
class="figure"
transform="translate(300 440)">


<circle
r="18"/>


<path
d="
M-25 30
L25 30
L35 100
L-35 100
Z"/>


</g>


</g>






<!-- DARK -->


<g
id="dark"
class="myth-stage"
data-step="3">


<circle
class="myth-point"
cx="300"
cy="250"
r="12"/>



<text
x="90"
y="320">

THE DARKEST HOUR

</text>


<text
x="170"
y="360">

BEFORE THE DAWN

</text>



<g class="stars">


<circle cx="260" cy="180" r="5"/>
<circle cx="300" cy="150" r="6"/>
<circle cx="340" cy="180" r="5"/>


</g>


</g>







<!-- IO -->


<g
id="io"
class="myth-stage"
data-step="4">


<circle
class="myth-point"
cx="300"
cy="90"
r="12"/>



<circle
class="sun"
cx="300"
cy="50"
r="30"/>



<text
x="270"
y="170">

IO

</text>



<text
class="dawn-text"
x="120"
y="220">

The Dawn has come

</text>


</g>



</svg>


`;


        this.bind();

    },




    bind(){


        this.viewport
        .querySelectorAll(".myth-stage")
        .forEach(stage=>{


            stage.addEventListener(
                "click",
                ()=>{


                    const step =
                    Number(stage.dataset.step);


                    this.activate(step);


                }
            );


        });


    },




    activate(step){


        if(step!==this.step+1)
            return;


        this.step=step;



        if(step===1){


            this.show("line1");

            this.show("dreamer");


        }


        if(step===2){


            this.show("line2");

            this.show("dark");


        }



        if(step===3){


            this.show("line3");

            this.show("io");


        }



    },




    show(id){


        document
        .getElementById(id)
        ?.classList.add("visible");


    },





    open(){


        this.step=0;


        this.screen
        .classList.remove("hidden");


        this.screen
        .setAttribute(
            "aria-hidden",
            "false"
        );


        if(this.audio){

            this.audio.currentTime=0;
            this.audio.play();

        }


    },




    close(){


        this.screen
        .classList.add("hidden");


        this.screen
        .setAttribute(
            "aria-hidden",
            "true"
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
