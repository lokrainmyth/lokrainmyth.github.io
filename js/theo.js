const MODEL_OFFSET = {

    x: -4.2,
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
    let keyLight;
    let dust;

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

        renderer.outputColorSpace =
    THREE.SRGBColorSpace;

renderer.toneMapping =
    THREE.ACESFilmicToneMapping;

renderer.toneMappingExposure =
    1.1;

renderer.physicallyCorrectLights = true;

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


// огромное "окно"

const windowLight = new THREE.Mesh(

    new THREE.PlaneGeometry(8,5),

    new THREE.MeshBasicMaterial({

        color:0xf5f5f5

    })

);

windowLight.position.set(
    -8,
    6,
    -8
);

windowLight.lookAt(0,0,0);

room.add(windowLight);


// теплый отражатель

const goldReflector = new THREE.Mesh(

    new THREE.PlaneGeometry(6,6),

    new THREE.MeshBasicMaterial({

        color:0xb89b63

    })

);

goldReflector.position.set(
    0,
    -6,
    5
);

goldReflector.lookAt(0,0,0);

room.add(goldReflector);


// холодный отражатель

const blueReflector = new THREE.Mesh(

    new THREE.PlaneGeometry(5,8),

    new THREE.MeshBasicMaterial({

        color:0x607cff

    })

);

blueReflector.position.set(
    7,
    0,
    -5
);

blueReflector.lookAt(0,0,0);

room.add(blueReflector);

        createDust();

        scene.fog = new THREE.Fog(

    0x090909,

    10,

    24

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

    child.material.roughness = 0.45;

    child.material.metalness = 0.75;

    child.material.envMapIntensity = 1.6;

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

        currentX += (targetX - currentX) * 0.015;
        currentY += (targetY - currentY) * 0.015;

        model.rotation.x =
    THREE.MathUtils.degToRad(BASE_ROTATION.x) + currentX;

model.rotation.y =
    THREE.MathUtils.degToRad(BASE_ROTATION.y) + currentY;

model.rotation.z =
    THREE.MathUtils.degToRad(BASE_ROTATION.z);

        keyLight.intensity =
    2.8 +
    Math.sin(performance.now() * 0.00025) * 0.08;

        if(dust){

    dust.position.y =
    Math.sin(performance.now()*0.00015)*0.08;

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

    function createDust() {

    const geometry =
        new THREE.BufferGeometry();

    const count = 700;

    const vertices = [];

    for(let i=0;i<count;i++){

        vertices.push(

            (Math.random()-0.5)*18,

            (Math.random()-0.5)*12,

            (Math.random()-0.5)*12

        );

    }

    geometry.setAttribute(

        "position",

        new THREE.Float32BufferAttribute(
            vertices,
            3
        )

    );

    const material =
        new THREE.PointsMaterial({

            color:0xffffff,

            size:0.025,

            transparent:true,

            opacity:0.12,

            depthWrite:false

        });

    dust =
        new THREE.Points(
            geometry,
            material
        );

    scene.add(dust);

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
