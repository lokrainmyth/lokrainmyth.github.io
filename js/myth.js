"use strict";


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

<radialGradient id="spaceGlow">
    <stop offset="0%" stop-color="#17243d"/>
    <stop offset="45%" stop-color="#080d18"/>
    <stop offset="100%" stop-color="#020203"/>
</radialGradient>


<radialGradient id="sphereLight">
    <stop offset="0%" stop-color="#f5e8b0"/>
    <stop offset="55%" stop-color="#b8c7df"/>
    <stop offset="100%" stop-color="#53647a"/>
</radialGradient>


<filter id="blueGlow">

<feGaussianBlur
stdDeviation="8"
result="blur"/>

<feMerge>

<feMergeNode in="blur"/>

<feMergeNode in="SourceGraphic"/>

</feMerge>

</filter>


</defs>


<!-- BACKGROUND -->

<rect
width="1200"
height="900"
fill="url(#spaceGlow)"/>



<!-- STARS -->

<g class="stars">

<circle cx="120" cy="140" r="2"/>
<circle cx="220" cy="90" r="3"/>
<circle cx="350" cy="170" r="2"/>
<circle cx="900" cy="120" r="3"/>
<circle cx="1030" cy="220" r="2"/>
<circle cx="1080" cy="500" r="3"/>
<circle cx="160" cy="650" r="2"/>
<circle cx="300" cy="760" r="3"/>

</g>



<!-- CENTRAL SPHERE -->

<g class="myth-sphere">

<circle
cx="600"
cy="450"
r="95"
fill="url(#sphereLight)"
filter="url(#blueGlow)"
/>


<!-- chess surface -->

<path
d="
M510 450
H690

M525 400
H675

M525 500
H675

M600 355
V545

M550 370
V530

M650 370
V530
"
stroke="rgba(20,20,30,.4)"
stroke-width="3"/>


</g>



<!-- PATH -->

<g class="myth-paths">


<path
id="pathTheo"
class="myth-path"
d="
M600 450
C430 430
300 350
170 240
"/>


<path
id="pathDreamer"
class="myth-path"
d="
M600 450
C760 400
900 330
1040 250
"/>


<path
id="pathNight"
class="myth-path"
d="
M600 450
C600 600
600 700
600 780
"/>


<path
id="pathDawn"
class="myth-path"
d="
M600 450
C600 300
600 180
600 90
"/>


</g>




<!-- THEO -->

<g
class="myth-node theo"
data-myth-action="expulsion">


<circle
class="myth-point"
cx="170"
cy="240"
r="14"/>


<!-- scarecrow -->

<g transform="translate(130 150)"
class="scarecrow">


<circle
cx="40"
cy="35"
r="28"/>


<path
d="
M15 65
L65 65
L80 150
L0 150
Z"/>


<path
d="
M0 90
L-35 125

M80 90
L115 125"
/>


<!-- hat -->

<path
d="
M5 10
Q40 -20
75 10
Z"/>

</g>


<text
x="110"
y="330"
class="myth-label">
THEO
</text>


</g>




<!-- DREAMER -->

<g
class="myth-node dreamer"
data-myth-action="dreamer">


<circle
class="myth-point"
cx="1040"
cy="250"
r="14"/>


<circle
cx="1040"
cy="190"
r="22"
fill="#ddd"/>


<path
d="
M1020 220
L1060 220
L1080 330
L1000 330
Z"
fill="#ddd"/>


<text
x="970"
y="390"
class="myth-label">
DREAMER
</text>


</g>




<!-- NIGHT -->

<g
class="myth-node darkest"
data-myth-action="darkest">


<circle
class="myth-point"
cx="600"
cy="780"
r="14"/>


<g class="moon">

<circle
cx="600"
cy="700"
r="45"
fill="#ccd6ef"/>

</g>


<text
x="500"
y="850"
class="myth-label">
NIGHT
</text>


</g>





<!-- DAWN -->

<g
class="myth-node dawn"
data-myth-action="dawn">


<circle
class="myth-point"
cx="600"
cy="90"
r="14"/>


<circle
cx="600"
cy="150"
r="55"
fill="#ffd982"
filter="url(#blueGlow)"/>


<g class="birds">

<path d="M500 230 Q530 200 560 230"/>
<path d="M650 230 Q680 200 710 230"/>
<path d="M580 260 Q600 240 620 260"/>

</g>


<text
x="520"
y="300"
class="myth-label">
DAWN
</text>


</g>


</svg>

        `;


        this.bind();

    },


    bind(){


        this.viewport
        .querySelectorAll(".myth-point")
        .forEach(point=>{


            point.addEventListener(
                "click",
                ()=>{

                    this.activate(
                        point.dataset.point
                    );

                }
            );


        });


    },


    activate(point){

        console.log(
            "MYTH POINT:",
            point
        );


        document
        .querySelector(
            `.hidden-label`
        )
        ?.classList.add("show");


    },


    open(){

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

