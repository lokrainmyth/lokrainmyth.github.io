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


        const loader = new THREE.GLTFLoader();


        loader.load(

            "assets/models/Theo.glb",

            (gltf)=>{


                this.model = gltf.scene;


                this.model.scale.set(
                    1,
                    1,
                    1
                );


                this.model.position.set(
                    0,
                    -0.8,
                    0
                );


                this.scene.add(
                    this.model
                );


                console.log(
                    "Theo model loaded"
                );


            },


            undefined,


            (error)=>{

                console.error(
                    "Theo model error",
                    error
                );

            }

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
