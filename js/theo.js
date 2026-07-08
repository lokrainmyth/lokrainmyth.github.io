console.log("THEO JS LOADED");

import * as THREE from "./vendor/three.module.js";
import { GLTFLoader } from "./vendor/GLTFLoader.js";

let scene;
let camera;
let renderer;
let model;

let targetRotation = 0;
let currentRotation = 0;

let container;

let animationFrame;


export function openTheo() {

    console.log("OPEN THEO");

    if (renderer) {
        startAnimation();
        return;
    }


    container = document.getElementById("theoViewport");

    if (!container) {
        console.error("Theo container missing");
        return;
    }


    createScene();
    createCamera();
    createRenderer();
    createLights();
    loadTheo();

    window.addEventListener(
        "resize",
        resize
    );

    container.addEventListener(
        "mousemove",
        interaction
    );


    startAnimation();
}



export function closeTheo() {

    cancelAnimationFrame(animationFrame);

    if (renderer) {
        renderer.domElement.remove();
    }

}



function createScene() {

    scene = new THREE.Scene();

    scene.fog = new THREE.FogExp2(
        0x050505,
        0.025
    );

}



function createCamera() {

    camera = new THREE.PerspectiveCamera(
        35,
        window.innerWidth /
        window.innerHeight,
        0.1,
        100
    );


    camera.position.set(
        0,
        0.2,
        3
    );

}



function createRenderer() {

    renderer =
        new THREE.WebGLRenderer({
            antialias:true,
            alpha:true
        });


    renderer.setPixelRatio(
        window.devicePixelRatio
    );


    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );


    renderer.outputColorSpace =
        THREE.SRGBColorSpace;


    container.appendChild(
        renderer.domElement
    );

}



function createLights() {


    const key =
        new THREE.DirectionalLight(
            0xffffff,
            2
        );


    key.position.set(
        2,
        3,
        4
    );


    scene.add(key);



    const soft =
        new THREE.AmbientLight(
            0xbfd5ff,
            0.5
        );


    scene.add(soft);



    const rim =
        new THREE.PointLight(
            0xffffff,
            1,
            10
        );


    rim.position.set(
        -2,
        1,
        -2
    );


    scene.add(rim);

}


function loadTheo() {


    const loader =
        new GLTFLoader();


    loader.load(
    "assets/models/Theo.glb",

    function(gltf){

        console.log("THEO LOADED", gltf);

        model = gltf.scene;


const box = new THREE.Box3()
    .setFromObject(model);


const size = box.getSize(
    new THREE.Vector3()
);


const center = box.getCenter(
    new THREE.Vector3()
);


model.position.x =
    -center.x;

model.position.y =
    -center.y;

model.position.z =
    -center.z;


const maxSize =
    Math.max(
        size.x,
        size.y,
        size.z
    );


const scale =
    1.5 / maxSize;


model.scale.set(
    scale,
    scale,
    scale
);

            scene.add(model);

        console.log("MODEL ADDED", model);

        },


        undefined,


        function(error){

            console.error(
                "Theo loading error",
                error
            );

        }

    );

}



function interaction(event){

    const x =
        event.clientX /
        window.innerWidth;


    targetRotation =
        (x - 0.5) *
        0.25;

}



function animate(){


    animationFrame =
        requestAnimationFrame(
            animate
        );


    if(model){


        currentRotation +=
            (
                targetRotation -
                currentRotation
            ) * 0.03;


        model.rotation.y =
            currentRotation;



        model.rotation.y +=
            0.0015;


    }



    renderer.render(
        scene,
        camera
    );

}



function startAnimation(){

    animate();

}



function resize(){


    camera.aspect =
        window.innerWidth /
        window.innerHeight;


    camera.updateProjectionMatrix();


    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

}
