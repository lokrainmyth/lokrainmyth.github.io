"use strict";

const Theo = {

    scene: null,
    camera: null,
    renderer: null,

    init() {

        const container = document.getElementById("theoViewport");

        if (!container) return;

        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(
            35,
            container.clientWidth / container.clientHeight,
            0.1,
            100
        );

        this.camera.position.set(0, 0, 5);

        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });

        this.renderer.setPixelRatio(window.devicePixelRatio);

        this.renderer.setSize(
            container.clientWidth,
            container.clientHeight
        );

        container.appendChild(this.renderer.domElement);

        this.animate();

        window.addEventListener(
            "resize",
            () => this.resize()
        );

    },

    animate() {

        requestAnimationFrame(() => this.animate());

        this.renderer.render(
            this.scene,
            this.camera
        );

    },

    resize() {

        const container = document.getElementById("theoViewport");

        if (!container) return;

        this.camera.aspect =
            container.clientWidth /
            container.clientHeight;

        this.camera.updateProjectionMatrix();

        this.renderer.setSize(
            container.clientWidth,
            container.clientHeight
        );

    }

};
