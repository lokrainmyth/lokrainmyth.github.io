import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

"use strict";

console.log("THEO ENGINE READY");

window.Theo = (function () {

    let scene;
    let camera;
    let renderer;
    let model;
    let container;
    let frame;

    function open() {

        if (renderer) {
            renderer.domElement.style.display = "block";
            animate();
            return;
        }

        container = document.getElementById("theoViewport");

        if (!container) {
            console.error("Theo viewport not found");
            return;
        }

        scene = new THREE.Scene();

        camera = new THREE.PerspectiveCamera(
            35,
            container.clientWidth / container.clientHeight,
            0.1,
            100
        );

        camera.position.set(0, 0, 3);

        renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });

        renderer.setPixelRatio(window.devicePixelRatio);

        renderer.setSize(
            container.clientWidth,
            container.clientHeight
        );

        container.appendChild(renderer.domElement);

        const ambient = new THREE.AmbientLight(0xffffff, 1);

        scene.add(ambient);

        const light = new THREE.DirectionalLight(0xffffff, 2);

        light.position.set(2, 3, 5);

        scene.add(light);

        const loader = new GLTFLoader();

        console.log("Loading model...");

        loader.load(

    "assets/models/Theo.glb",

    function (gltf) {

        console.log("MODEL LOADED");

        model = gltf.scene;

        console.log(model);

        const box = new THREE.Box3().setFromObject(model);

        console.log("BOX", box);

        console.log(
            "MIN",
            box.min.x,
            box.min.y,
            box.min.z
        );

        console.log(
            "MAX",
            box.max.x,
            box.max.y,
            box.max.z
        );

        const center = box.getCenter(
            new THREE.Vector3()
        );

        console.log("CENTER", center);

        scene.add(model);

        const helper = new THREE.Box3Helper(
            box,
            0xff0000
        );

        scene.add(helper);

        scene.add(
            new THREE.AxesHelper(1)
        );

        window.addEventListener(
            "resize",
            resize
        );

        animate();

    },

    undefined,

    function (error) {

        console.error(
            "MODEL ERROR",
            error
        );

    }

);
    function animate() {

        frame = requestAnimationFrame(animate);

        if (model) {

            model.rotation.y =
    Math.sin(Date.now() * 0.0003) * 0.15;

        }

        renderer.render(scene, camera);

    }

    function resize() {

        if (!renderer) return;

        camera.aspect =
            container.clientWidth /
            container.clientHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(
            container.clientWidth,
            container.clientHeight
        );

    }

    function close() {

        if (!renderer) return;

        cancelAnimationFrame(frame);

        renderer.domElement.style.display = "none";

    }

    return {

        open,
        close

    };

})();
