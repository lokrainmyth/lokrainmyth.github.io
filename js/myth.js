"use strict";


const Myth = {


    initialized:false,

    viewport:null,

    screen:null,

    step:0,


    init(){


        if(this.initialized)
            return;


        this.initialized=true;


        this.screen =
            document.getElementById("mythScreen");


        this.viewport =
            document.getElementById("mythViewport");


        if(!this.screen || !this.viewport)
            return;


        this.build();


    },



    build(){


        this.viewport.innerHTML = `


<svg
class="myth-map"
viewBox="0 0 1200 900"
xmlns="http://www.w3.org/2000/svg">


<defs>


<filter id="blueGlow">


<feGaussianBlur
stdDeviation="8"/>


</filter>


</defs>




<!-- STARS -->


<g class="stars">


<circle cx="150" cy="120" r="2"/>
<circle cx="300" cy="180" r="3"/>
<circle cx="850" cy="130" r="2"/>
<circle cx="1000" cy="220" r="3"/>
<circle cx="700" cy="90" r="2"/>
<circle cx="420" cy="250" r="2"/>


</g>




<!-- CENTRAL WORLD -->


<g
class="myth-sphere">


<circle
cx="600"
cy="450"
r="95"
fill="#121a2b"
stroke="#d9c58a"
stroke-width="3"/>


<!-- chess surface -->


<g
opacity=".25">


<path
d="
M510 450
H690

M520 410
H680

M520 490
H680

M550 355
V545

M600 355
V545

M650 355
V545
"
stroke="#fff"/>


</g>


</g>





<!-- PATHS -->


<path
id="pathTheo"
class="myth-path"
d="
M600 450
C480 450
380 430
250 300"
/>



<path
id="pathDreamer"
class="myth-path"
d="
M600 450
C720 450
820 400
960 320"
/>



<path
id="pathNight"
class="myth-path"
d="
M600 450
C600 600
600 680
600 760"
/>



<path
id="pathDawn"
class="myth-path"
d="
M600 450
C600 300
600 200
600 100"
/>






<!-- THEO POINT -->


<g
class="myth-node"
data-myth-action="theo">


<circle
class="myth-point"
cx="250"
cy="300"
r="12"/>


<text
class="myth-label"
x="180"
y="250">

THEO

</text>



<!-- scarecrow -->


<g
class="scarecrow">


<circle
cx="250"
cy="210"
r="25"/>


<path
d="
M220 240
L280 240
L300 390
L200 390
Z"/>


<path
d="
M190 280
L310 280"/>


<path
d="
M230 390
L210 470

M270 390
L290 470"/>


</g>


</g>







<!-- DREAMER -->


<g
class="myth-node"
data-myth-action="dreamer">


<circle
class="myth-point"
cx="960"
cy="320"
r="12"/>



<text
class="myth-label"
x="850"
y="270">

DREAMER

</text>



<g
class="dreamer">


<circle
cx="960"
cy="220"
r="22"/>


<path
d="
M940 250
L980 250
L1000 380
L920 380
Z"/>


</g>



</g>







<!-- NIGHT -->


<g
class="myth-node"
data-myth-action="night">


<circle
class="myth-point"
cx="600"
cy="760"
r="12"/>


<text
class="myth-label"
x="520"
y="830">

NIGHT

</text>


<g class="moon">


<circle
cx="600"
cy="680"
r="35"
fill="#dce8ff"/>


</g>



<g>


<circle cx="550" cy="620" r="3"/>
<circle cx="650" cy="630" r="3"/>
<circle cx="620" cy="580" r="3"/>


</g>


</g>







<!-- DAWN -->


<g
class="myth-node"
data-myth-action="dawn">


<circle
class="myth-point"
cx="600"
cy="100"
r="12"/>



<text
class="myth-label"
x="520"
y="70">

DAWN

</text>



<circle
cx="600"
cy="170"
r="45"
fill="#f5d98b"/>



<g class="birds">


<path d="
M450 230
Q470 210
490 230"/>


<path d="
M700 240
Q720 220
740 240"/>


</g>


</g>



</svg>


`;


        this.bind();


    },




    bind(){


        this.viewport
        .querySelectorAll("[data-myth-action]")
        .forEach(node=>{


            node.addEventListener(
                "click",
                ()=>{


                    this.activate(
                        node.dataset.mythAction
                    );


                }
            );


        });



    },




    activate(action){



        if(action==="theo")
            this.theo();



        if(action==="dreamer")
            this.dreamer();



        if(action==="night")
            this.night();



        if(action==="dawn")
            this.dawn();



    },





    revealPath(id){


        document
        .getElementById(id)
        ?.classList.add("draw");


    },




    theo(){


        if(this.step!==0)
            return;


        this.step=1;


        this.revealPath(
            "pathTheo"
        );


        document
        .querySelector('[data-myth-action="dreamer"]')
        ?.classList.add("active");


    },





    dreamer(){


        if(this.step!==1)
            return;


        this.step=2;


        this.revealPath(
            "pathDreamer"
        );


        document
        .querySelector('[data-myth-action="night"]')
        ?.classList.add("active");


    },





    night(){


        if(this.step!==2)
            return;


        this.step=3;


        this.revealPath(
            "pathNight"
        );


        document
        .querySelector('[data-myth-action="dawn"]')
        ?.classList.add("active");


    },






    dawn(){


        if(this.step!==3)
            return;


        this.step=4;


        this.revealPath(
            "pathDawn"
        );


        setTimeout(()=>{


            this.screen
            ?.classList.add("myth-complete");



            unlockAfterMyth();



        },2000);



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
