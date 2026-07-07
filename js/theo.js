"use strict";

const Theo = {

    scene: null,
    camera: null,
    renderer: null,
    model: null,

    init(){

        console.log("Theo init");

        const container = document.getElementById(
            "theoViewport"
        );

        if(!container){

            console.error(
                "Theo viewport missing"
            );

            return;

        }


        this.scene = new THREE.Scene();

        this.scene.background = null;


        this.camera = new THREE.PerspectiveCamera(
            35,
            container.clientWidth /
            container.clientHeight,
            0.1,
            100
        );


        this.camera.position.set(
            0,
            0,
            5
        );


        const keyLight = new THREE.PointLight(
            0xd7b56d,
            8
        );

        keyLight.position.set(
            0,
            1,
            3
        );

        this.scene.add(
            keyLight
        );


        const ambient = new THREE.AmbientLight(
            0xffffff,
            0.35
        );

        this.scene.add(
            ambient
        );

        this.renderer =
            new THREE.WebGLRenderer({

                antialias:true,

                alpha:true

            });


        this.renderer.setPixelRatio(
            window.devicePixelRatio
        );


        this.renderer.setSize(
            container.clientWidth,
            container.clientHeight
        );


        container.appendChild(
            this.renderer.domElement
        );


        console.log(
            "Theo canvas ready"
        );


        this.animate();


        window.addEventListener(
            "resize",
            ()=>this.resize()
        );


    },


    animate(){


        requestAnimationFrame(
            ()=>this.animate()
        );


        if(this.model){

            this.model.rotation.y += 0.002;

        }


        this.renderer.render(
            this.scene,
            this.camera
        );


    },


    resize(){


        const container =
            document.getElementById(
                "theoViewport"
            );


        if(!container || !this.camera){

            return;

        }


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
