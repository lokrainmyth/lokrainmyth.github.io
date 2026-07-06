"use strict";

const Theo = {

    scene: null,
    camera: null,
    renderer: null,

    init() {

        const container = document.getElementById("theoViewport");

        if (!container) return;

        this.scene = new THREE.Scene();

        this.scene.background = null;

        this.camera = new THREE.PerspectiveCamera(
            35,
            container.clientWidth / container.clientHeight,
            0.1,
            100
        );

        this.camera.position.set(0, 0, 5);

        const light = new THREE.PointLight(
    0xd7b56d,
    8
);

light.position.set(
    0,
    1,
    3
);

this.scene.add(light);

const ambient = new THREE.AmbientLight(
    0xffffff,
    .35
);

this.scene.add(ambient);

const geometry = new THREE.SphereGeometry(
    .7,
    64,
    64
);

const material = new THREE.MeshStandardMaterial({

    color:0xc7a257,

    metalness:.9,

    roughness:.28

});

this.model = new THREE.Mesh(
    geometry,
    material
);

this.scene.add(this.model);

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

        if(this.model){

    this.model.rotation.y += .003;

}

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
