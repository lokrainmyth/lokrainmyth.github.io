"use strict";


const Myth = {


    initialized:false,

    screen:null,

    viewport:null,

    step:0,

    sound:null,


    init(){


        if(this.initialized)
            return;


        this.initialized=true;


        this.screen =
            document.getElementById("mythScreen");


        this.viewport =
            document.getElementById("mythViewport");


        this.sound =
            document.getElementById("mythSound");



        if(!this.screen || !this.viewport)
            return;



        this.build();

        this.bind();



    },



    build(){


        this.viewport.innerHTML = `


<svg
class="myth-map"
viewBox="0 0 1200 1000"
xmlns="http://www.w3.org/2000/svg">


<defs>



<!-- глубокий фон -->

<radialGradient id="mythSky">


<stop
offset="0%"
stop-color="#182b48"/>


<stop
offset="50%"
stop-color="#09111f"/>


<stop
offset="100%"
stop-color="#020305"/>


</radialGradient>



<!-- сфера -->

<radialGradient id="ioSphere">


<stop
offset="0%"
stop-color="#ffffff"/>


<stop
offset="40%"
stop-color="#bfdcff"/>


<stop
offset="100%"
stop-color="#31425d"/>


</radialGradient>




<filter id="softGlow">


<feGaussianBlur
stdDeviation="12"
result="blur"/>


<feMerge>

<feMergeNode
in="blur"/>

<feMergeNode
in="SourceGraphic"/>


</feMerge>


</filter>



</defs>





<!-- ==================================================
     BACKGROUND MAP
================================================== -->


<rect
width="1200"
height="1000"
fill="url(#mythSky)"/>



<g class="map-lines">


<path
d="
M100 200
C300 80 500 160 720 100
S1050 180 1150 80"
/>


<path
d="
M80 700
C300 620 500 760 760 680
S1050 720 1150 600"
/>


<path
d="
M200 900
C400 760 700 850 1000 760"
/>


</g>






<!-- ==================================================
     STARS
================================================== -->


<g class="myth-stars">


<circle cx="170" cy="140" r="3"/>

<circle cx="340" cy="220" r="2"/>

<circle cx="900" cy="160" r="3"/>

<circle cx="1040" cy="330" r="2"/>

<circle cx="780" cy="850" r="3"/>


</g>





<!-- ==================================================
     CENTER SPHERE
================================================== -->


<g class="io-world">


<circle

cx="600"

cy="500"

r="120"

fill="url(#ioSphere)"

filter="url(#softGlow)" />





<!-- шахматная поверхность -->


<g
class="sphere-grid">


<path

d="

M500 500

Q600 430 700 500

Q600 570 500 500

"


/>



<path

d="

M530 450

L670 550


M530 550

L670 450


"

 />



</g>




</g>






<!-- ==================================================
     FIRST POINT ONLY
================================================== -->


<g
class="myth-stage stage-theo">


<circle

class="myth-point"

data-step="1"

cx="260"

cy="500"

r="14"/>



<text

class="myth-title"

x="210"

y="620">

THEO

</text>



<text

class="myth-subtitle"

x="170"

y="670">

When you are alone

</text>


</g>







<!-- ==================================================
     HIDDEN FUTURE POINTS
================================================== -->


<g
class="myth-stage hidden-stage stage-dreamer">


<circle

class="myth-point"

data-step="2"

cx="940"

cy="400"

r="14"/>


<text

class="myth-title"

x="820"

y="520">

DREAMER

</text>


<text

class="myth-subtitle"

x="770"

y="570">

When you dream of connection

</text>


</g>







<g
class="myth-stage hidden-stage stage-dark">


<circle

class="myth-point"

data-step="3"

cx="600"

cy="820"

r="14"/>



<text

class="myth-title"

x="350"

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

cy="120"

r="14"/>



<text

class="myth-title"

x="540"

y="230">


IO


</text>



</g>





</svg>


`;

        this.bind();
    },

    bind() {

        this.viewport
            .querySelectorAll("[data-myth-action]")
            .forEach(node => {

                node.addEventListener("click", () => {

                    this.activate(
                        node.dataset.mythAction
                    );

                });

            });

    },

    activate(action) {

        if (action === "expulsion") {

            this.activateExpulsion();

        }

        if (action === "dreamer") {

            this.activateDreamer();

        }

        if (action === "darkest") {

            this.activateDarkest();

        }

        if (action === "dawn") {

            this.activateDawn();

        }

    },

    activateExpulsion() {

        if (this.step > 0) return;

        this.step = 1;

        document
            .getElementById("pathHorizontal")
            ?.classList.add("draw");

        document
            .querySelector(".myth-dreamer")
            ?.classList.add("reveal");

    },

    activateDreamer() {

        if (this.step < 1) return;

        if (this.step > 1) return;

        this.step = 2;

        document
            .getElementById("pathDown")
            ?.classList.add("draw");

        document
            .querySelector(".myth-darkest")
            ?.classList.add("reveal");

    },

    activateDarkest() {

        if (this.step < 2) return;

        if (this.step > 2) return;

        this.step = 3;

        document
            .getElementById("pathVertical")
            ?.classList.add("draw");

        document
            .querySelector(".myth-dawn")
            ?.classList.add("reveal");

    },

    activateDawn() {

    if (this.step < 3) return;

    this.step = 4;

    this.screen
        ?.classList.add("myth-complete");

    setTimeout(() => {

        this.close();

unlockAfterMyth();

document
    .querySelector(".world")
    ?.classList.remove("hidden");

document
    .querySelector(".world")
    ?.classList.remove("outro-active");

    }, 1200);

},

    open() {

        this.step = 0;

        this.screen
            ?.classList.remove("hidden");

        this.screen
            ?.setAttribute("aria-hidden", "false");

        this.build();

    },

    close() {

        this.screen
            ?.classList.add("hidden");

        this.screen
            ?.setAttribute("aria-hidden", "true");

    }

};
