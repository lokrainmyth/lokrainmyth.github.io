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

        console.log("THEO OPEN");

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

                scene.add(model);

            },

            undefined,

            function (err) {

                console.error(err);

            }

        );

        window.addEventListener("resize", resize);

        animate();

    }

    function animate() {

        frame = requestAnimationFrame(animate);

        if (model) {

            model.rotation.y += 0.003;

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
