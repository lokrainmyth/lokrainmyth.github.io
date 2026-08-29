"use strict";

const Myth = {

    initialized: false,

    viewport: null,
    screen: null,

    step: 0,

    init() {

        if (this.initialized) return;

        this.initialized = true;

        this.screen =
            document.getElementById("mythScreen");

        this.viewport =
            document.getElementById("mythViewport");

        if (!this.screen || !this.viewport) return;

        this.build();
    },

    build() {

        this.viewport.innerHTML = `

            <svg
class="myth-map"
viewBox="0 0 1000 1000"
xmlns="http://www.w3.org/2000/svg">


<defs>


<radialGradient id="mythSky">

    <stop offset="0%" stop-color="#243b63"/>

    <stop offset="60%" stop-color="#0b1220"/>

    <stop offset="100%" stop-color="#020308"/>

</radialGradient>


<linearGradient id="roadLight">

    <stop offset="0%" stop-color="#777"/>

    <stop offset="50%" stop-color="#ffd98a"/>

    <stop offset="100%" stop-color="#fff"/>

</linearGradient>


<filter id="mythGlow">

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
width="1000"
height="1000"
fill="url(#mythSky)"
/>



<!-- MAIN PATH -->

<path
id="pathHorizontal"
class="myth-path"
d="
M500 850
C500 700 500 600 500 500
"
/>


<path
id="pathDown"
class="myth-path"
d="
M500 500
C350 400 250 300 180 180
"
/>


<path
id="pathVertical"
class="myth-path"
d="
M500 500
C650 400 760 280 820 120
"
/>



<!-- CENTRAL WORLD -->

<g class="myth-world"
transform="translate(500 500)"
filter="url(#mythGlow)">


<circle
r="90"
fill="#101827"
stroke="#e6c477"
stroke-width="3"
/>


<!-- chess surface -->

<path
d="
M-70 -70
L70 -70
L70 70
L-70 70
Z
"
fill="none"
stroke="#d7e9ff"
stroke-width="2"
/>


<path
d="
M-70 0
H70
M0 -70
V70
"
stroke="#d7e9ff"
stroke-width="2"
/>


<circle
r="25"
fill="#ffd98a"
/>


</g>



<!-- THEO -->

<g
class="myth-node myth-expulsion"
data-myth-action="expulsion">


<circle
class="myth-hit"
cx="180"
cy="180"
r="60"
/>


<!-- hat -->

<path
d="
M140 120
H220
L200 90
H160
Z"
/>


<!-- head -->

<circle
cx="180"
cy="150"
r="25"
/>


<!-- body -->

<line
x1="180"
y1="175"
x2="180"
y2="270"
/>


<line
x1="130"
y1="210"
x2="230"
y2="210"
/>


<text
x="180"
y="330"
text-anchor="middle">
THEO
</text>


</g>




<!-- DREAMER -->

<g
class="myth-node myth-dreamer"
data-myth-action="dreamer"
opacity="0">


<circle
class="myth-hit"
cx="820"
cy="120"
r="60"
/>


<circle
cx="820"
cy="90"
r="22"
/>


<path
d="
M800 115
L840 115
L850 220
L790 220
Z"
/>


<circle
cx="870"
cy="70"
r="8"
fill="#fff"
/>


<text
x="820"
y="270"
text-anchor="middle">
DREAMER
</text>


</g>





<!-- DARKEST NIGHT -->

<g
class="myth-node myth-darkest"
data-myth-action="darkest"
opacity="0">


<circle
class="myth-hit"
cx="500"
cy="850"
r="60"
/>


<circle
cx="500"
cy="850"
r="45"
fill="#05060b"
/>


<circle
cx="470"
cy="830"
r="5"
fill="white"
/>

<circle
cx="500"
cy="810"
r="5"
fill="white"
/>

<circle
cx="530"
cy="830"
r="5"
fill="white"
/>


<text
x="500"
y="940"
text-anchor="middle">
NIGHT
</text>


</g>




<!-- DAWN -->

<g
class="myth-node myth-dawn"
data-myth-action="dawn"
opacity="0">


<circle
class="myth-hit"
cx="500"
cy="80"
r="70"
/>


<circle
class="myth-sun"
cx="500"
cy="80"
r="45"
fill="#ffd978"
/>



<!-- road -->

<path
d="
M500 130
L430 450
L570 450
Z
"
fill="url(#roadLight)"
/>



<!-- birds -->

<path
d="
M400 170 Q430 140 460 170
M540 170 Q570 140 600 170
"
fill="none"
stroke="white"
stroke-width="3"
/>


<text
x="500"
y="220"
text-anchor="middle">
DAWN
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
