const MODEL_OFFSET = {

    x: -4.7,
    y: -3,
    z: 0

};

const BASE_ROTATION = {

    x: 22,
    y: -30,
    z: 2

};

let targetX = 0;
let targetY = 0;

let currentX = 0;
let currentY = 0;

import * as THREE from 
"https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js";

import { GLTFLoader } from
"https://cdn.jsdelivr.net/npm/three@0.170.0/examples/jsm/loaders/GLTFLoader.js";
"use strict";

console.log("THEO ENGINE READY");

window.Theo = (function () {

    let scene;
    let camera;
    let renderer;
    let model;
    let container;
    let frame;
    let keyLight;
    let mythHover = false;
    let dust = [];  

    function open() {

        document
.querySelector(".myth-screen")
?.classList.add("sleep");

document
.getElementById("theoViewport")
?.classList.add("active");

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

        renderer.outputColorSpace =
    THREE.SRGBColorSpace;

renderer.toneMapping =
    THREE.ACESFilmicToneMapping;

renderer.toneMappingExposure =
    1.1;

renderer.setClearColor(
    0x090909,
    1
);
        
        container.appendChild(renderer.domElement);

        window.addEventListener("mousemove", (e) => {

    targetY =
        (e.clientX / window.innerWidth - 0.5) * 0.08;

    targetX =
        (e.clientY / window.innerHeight - 0.5) * 0.05;

});

        const ambient = new THREE.AmbientLight(0xffffff, 1);

        scene.add(ambient);

       keyLight = new THREE.DirectionalLight(
    0xffffff,
    2.8
);

keyLight.position.set(
    3,
    4,
    5
);

scene.add(keyLight);

        const rim = new THREE.DirectionalLight(
    0x6f92ff,
    0.7
);

rim.position.set(
    -4,
    2,
    -6
);

scene.add(rim);

        const bounce = new THREE.DirectionalLight(
    0xb89b63,
    0.25
);

bounce.position.set(
    0,
    -4,
    2
);

scene.add(bounce);

        // ---------- MUSEUM ENVIRONMENT ----------

const room = new THREE.Group();

scene.add(room);


// потолок

const ceiling = new THREE.Mesh(

    new THREE.PlaneGeometry(40,40),

    new THREE.MeshBasicMaterial({

        color:0x141414,

        side:THREE.DoubleSide

    })

);

ceiling.position.y = 10;
ceiling.rotation.x = Math.PI/2;

room.add(ceiling);


// пол

const floor = new THREE.Mesh(

    new THREE.PlaneGeometry(40,40),

    new THREE.MeshBasicMaterial({

        color:0x0a0a0a,

        side:THREE.DoubleSide

    })

);

floor.position.y = -10;
floor.rotation.x = -Math.PI/2;

room.add(floor);

        createDust();

        scene.fog = new THREE.Fog(
    0x050505,
    8,
    28
);

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

   child.material.roughness = 0.58;

child.material.metalness = 0.95;

child.material.envMapIntensity = 1.4;

child.material.needsUpdate = true;

    child.material.fog = true;
child.material.needsUpdate = true;

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
        revealMyth();
        MythCanvas.start();

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

        const speed =
    mythHover
        ? 0.003
        : 0.015;

currentX +=
    (targetX-currentX)*speed;

currentY +=
    (targetY-currentY)*speed;

        model.rotation.x =
    THREE.MathUtils.degToRad(BASE_ROTATION.x) + currentX;

model.rotation.y =
    THREE.MathUtils.degToRad(BASE_ROTATION.y) + currentY;

model.rotation.z =
    THREE.MathUtils.degToRad(BASE_ROTATION.z);

        keyLight.intensity =
2.8 +
Math.sin(performance.now()*0.00018)*0.18;

        if (dust.length) {

    const t = performance.now();

    for (const p of dust) {

        p.position.x += p.userData.vx;

        p.position.y += p.userData.vy;

        p.position.z += p.userData.vz;

        if (p.position.x > 6)
            p.position.x = -6;

        if (p.position.x < -6)
            p.position.x = 6;

        if (p.position.y > 4)
            p.position.y = -4;

        if (p.position.y < -4)
            p.position.y = 4;

        if (p.position.z > 3)
            p.position.z = -3;

        if (p.position.z < -3)
            p.position.z = 3;

        p.material.opacity =

            p.userData.baseOpacity +

            Math.sin(

                t * 0.00035 +

                p.userData.phase

            ) * 0.015;

    }

}
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

function createDustTexture() {

    const size = 128;

    const canvas = document.createElement("canvas");

    canvas.width = size;
    canvas.height = size;

    const ctx = canvas.getContext("2d");

    const gradient = ctx.createRadialGradient(

        size / 2,
        size / 2,
        0,

        size / 2,
        size / 2,
        size / 2

    );

    gradient.addColorStop(
        0,
        "rgba(255,255,255,1)"
    );

    gradient.addColorStop(
        0.25,
        "rgba(255,255,255,.35)"
    );

    gradient.addColorStop(
        0.6,
        "rgba(255,255,255,.08)"
    );

    gradient.addColorStop(
        1,
        "rgba(255,255,255,0)"
    );

    ctx.fillStyle = gradient;

    ctx.fillRect(
        0,
        0,
        size,
        size
    );

    return new THREE.CanvasTexture(canvas);

}
    
   function createDust() {

    const texture = createDustTexture();

    for (let i = 0; i < 24; i++) {

        const material =
            new THREE.SpriteMaterial({

                map: texture,

                color: 0xffffff,

                transparent: true,

                opacity: 0.04 + Math.random() * 0.05,

                depthWrite: false,

                depthTest: true

            });

        const sprite =
            new THREE.Sprite(material);

        sprite.position.set(

            (Math.random() - 0.5) * 12,

            (Math.random() - 0.5) * 8,

            (Math.random() - 0.5) * 6

        );

        const size =
            0.04 + Math.random() * 0.14;

        sprite.scale.set(

            size,

            size,

            size

        );

        sprite.userData = {

            vx:
                (Math.random() - 0.5) * 0.00018,

            vy:
                (Math.random() - 0.5) * 0.00022,

            vz:
                (Math.random() - 0.5) * 0.00008,

            phase:
                Math.random() * Math.PI * 2,

            baseOpacity:
                material.opacity

        };

        dust.push(sprite);

        scene.add(sprite);

    }

}

    function revealMyth(){

    const myth =
        document.querySelector(".myth-entry");

    if(!myth) return;


    setTimeout(()=>{

        myth.classList.add("visible");

    },3500);

}

    function close() {

        if (!renderer) return;

        document
.querySelector(".myth-screen")
?.classList.remove("sleep");

document
.getElementById("theoViewport")
?.classList.remove("active");

        cancelAnimationFrame(frame);

        renderer.domElement.style.display = "none";

    }

    return {

        open,
        close

    };

    /* ==========================================================
   BUTTONS
========================================================== */

document
.getElementById("outroGoDeeper")
?.addEventListener(

    "click",

    ()=>{

        console.log(
            "GO DEEPER → THEO"
        );

        openTheo();

    }

);

document

.getElementById("returnToDawn")

?.addEventListener(

    "click",

    ()=>{

        closeMyth();

    }

);

document

.querySelector('[data-return="theo"]')

?.addEventListener(

    "click",

    ()=>{

        closeTheo();

    }

);

const mythCanvas =
    document.getElementById("mythCanvas");

mythCanvas?.addEventListener(

    "click",

    ()=>{

        console.log("ENTER LO.KRAIN MYTH");

        openMyth();

    }

);

const button =
    document.getElementById("mythButton");

mythCanvas?.addEventListener(

    "mouseenter",

    ()=>{

        mythHover = true;

    }

);

mythCanvas?.addEventListener(

    "mouseleave",

    ()=>{

        mythHover = false;

    }

);

})();
