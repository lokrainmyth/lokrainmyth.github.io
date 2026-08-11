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
                viewBox="0 0 1200 800"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="Lo.Krain Myth">

                <defs>

                    <filter id="mythGlow">

                        <feGaussianBlur
                            stdDeviation="5"
                            result="blur"/>

                        <feMerge>
                            <feMergeNode in="blur"/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>

                    </filter>

                </defs>


                <!-- ==================================================
                     MAIN PATH
                ================================================== -->

                <g class="myth-paths">

                    <path
                        id="pathHorizontal"
                        class="myth-path"
                        d="M 150 400
                           C 300 400,
                             390 400,
                             600 400
                           C 810 400,
                             900 400,
                             1050 400"/>

                    <path
                        id="pathVertical"
                        class="myth-path"
                        d="M 600 400
                           C 600 330,
                             600 250,
                             600 120"/>

                    <path
                        id="pathDown"
                        class="myth-path"
                        d="M 600 400
                           C 600 470,
                             600 550,
                             600 680"/>

                </g>


                <!-- ==================================================
                     EXPULSION
                ================================================== -->

                <g
                    class="myth-node myth-expulsion"
                    data-myth-action="expulsion">

                    <!-- pulse -->

                    <circle
    class="myth-hit"
    cx="150"
    cy="400"
    r="42"/>

<circle
    class="myth-pulse"
    cx="150"
    cy="400"
    r="9"/>


                    <!-- crow -->

                    <g
                        class="myth-crow"
                        transform="translate(105 325)">

                        <path
                            d="
                            M 0 55
                            C 15 25, 45 15, 72 28
                            C 90 38, 98 54, 82 63
                            C 65 72, 42 66, 28 58
                            C 20 70, 9 76, 0 75
                            C 8 68, 12 61, 0 55
                            Z"/>

                        <path
                            d="
                            M 65 29
                            L 96 20
                            L 76 40
                            Z"/>

                        <circle
                            cx="76"
                            cy="31"
                            r="2.5"/>

                    </g>


                    <!-- scarecrow -->

                    <g
                        class="myth-scarecrow"
                        transform="translate(210 315)">

                        <line
                            x1="35"
                            y1="30"
                            x2="35"
                            y2="120"/>

                        <line
                            x1="0"
                            y1="55"
                            x2="70"
                            y2="55"/>

                        <circle
                            cx="35"
                            cy="25"
                            r="18"/>

                        <path
                            d="
                            M 18 44
                            L 52 44
                            L 60 112
                            L 10 112
                            Z"/>

                        <line
                            x1="18"
                            y1="55"
                            x2="4"
                            y2="95"/>

                        <line
                            x1="52"
                            y1="55"
                            x2="66"
                            y2="95"/>

                    </g>

                </g>


                <!-- ==================================================
                     DREAMER
                ================================================== -->

                <g
                    class="myth-node myth-dreamer"
                    data-myth-action="dreamer"
                    opacity="0">

                    <circle
    class="myth-hit"
    cx="950"
    cy="400"
    r="42"/>

<circle
    class="myth-pulse"
    cx="950"
    cy="400"
    r="9"/>

                    <!-- Eiffel tower -->

                    <g
                        class="myth-eiffel"
                        transform="translate(865 270)">

                        <path
                            d="
                            M 70 20
                            L 20 130
                            L 120 130
                            Z"/>

                        <line
                            x1="42"
                            y1="82"
                            x2="98"
                            y2="82"/>

                        <line
                            x1="30"
                            y1="105"
                            x2="110"
                            y2="105"/>

                        <line
                            x1="70"
                            y1="20"
                            x2="70"
                            y2="130"/>

                    </g>


                    <!-- Dreamer -->

                    <g
                        class="myth-dreamer-boy"
                        transform="translate(970 330)">

                        <circle
                            cx="0"
                            cy="0"
                            r="17"/>

                        <path
                            d="
                            M -15 20
                            L 15 20
                            L 24 90
                            L -24 90
                            Z"/>

                        <line
                            x1="-8"
                            y1="90"
                            x2="-18"
                            y2="125"/>

                        <line
                            x1="8"
                            y1="90"
                            x2="18"
                            y2="125"/>

                    </g>

                </g>


                <!-- ==================================================
                     DARKEST HOUR
                ================================================== -->

                <g
                    class="myth-node myth-darkest"
                    data-myth-action="darkest"
                    opacity="0">

                    <circle
    class="myth-hit"
    cx="600"
    cy="680"
    r="42"/>

<circle
    class="myth-pulse"
    cx="600"
    cy="680"
    r="10"/>

                </g>


                <!-- ==================================================
                     DAWN
                ================================================== -->

                <g
                    class="myth-node myth-dawn"
                    data-myth-action="dawn"
                    opacity="0">

                    <circle
                        class="myth-sun"
                        cx="600"
                        cy="120"
                        r="32"/>

                    <g class="myth-birds">

                        <path d="M 530 180 Q 545 165 560 180"/>
                        <path d="M 570 150 Q 585 135 600 150"/>
                        <path d="M 620 170 Q 635 155 650 170"/>
                        <path d="M 660 145 Q 675 130 690 145"/>

                    </g>

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
