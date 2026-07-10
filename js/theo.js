const MODEL_OFFSET = {

    x: 0,
    y: -2,
    z: 0

};

const BASE_ROTATION = {

    x: 20,
    y: 0,
    z: 5

};

let targetX = 0;
let targetY = 0;

let currentX = 0;
let currentY = 0;

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

        window.addEventListener("mousemove", (e) => {

    targetY =
        (e.clientX / window.innerWidth - 0.5) * 0.22;

    targetX =
        (e.clientY / window.innerHeight - 0.5) * 0.12;

});

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

        model.traverse((child) => {

    if (!child.isMesh) return;

    child.geometry.computeVertexNormals();

    child.material.roughness = 0.45;

    child.material.metalness = 0.75;

    child.material.envMapIntensity = 1.6;

});

        const box = new THREE.Box3().setFromObject(model);
const center = box.getCenter(new THREE.Vector3());

model.position.set(

    -center.x + MODEL_OFFSET.x,

    -center.y + MODEL_OFFSET.y,

    -center.z + MODEL_OFFSET.z

);

model.scale.set(
    1,
    1,
    1
);
        
scene.add(model);

camera.position.set(
    0,
    0,
    12
);

camera.lookAt(
    0,
    0,
    0
);
        
        window.addEventListener(
            "resize",
            resize
        );

        animate();

    },

    undefined,

    function (error) {

        console.error("MODEL ERROR", error);

    }

);
        } 
    
    function animate() {

    frame = requestAnimationFrame(animate);

    if (model) {

        currentX += (targetX - currentX) * 0.04;
        currentY += (targetY - currentY) * 0.04;

        model.rotation.x =
    THREE.MathUtils.degToRad(BASE_ROTATION.x) + currentX;

model.rotation.y =
    THREE.MathUtils.degToRad(BASE_ROTATION.y) + currentY;

model.rotation.z =
    THREE.MathUtils.degToRad(BASE_ROTATION.z);

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
