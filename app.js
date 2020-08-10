let project = (() => {

    // global variables - within IIFE
    let pCamera, scene, renderer, sun;
    const WIDTH = window.innerWidth, HEIGHT = window.innerHeight;

    // create camera
    let createCamera =()=> {

        // camera set up
        pCamera = new THREE.PerspectiveCamera(
            45,
            WIDTH / HEIGHT,
            1,
            1500
        );

        pCamera.position.set(0, 0, 20);
    }

    // create scene
    let createScene =()=> {

        // scene set up
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000);
    }

    // create renderer
    let createRenderer =()=> {
        const canvasEl = document.querySelector("#canvas");
        renderer = new THREE.WebGLRenderer({ antialias: true, canvasEl});
        renderer.setSize(WIDTH, HEIGHT);
        canvasEl.appendChild(renderer.domElement);
    }

    // create sphere
    let createSphere =(radius, widthSegments, heightSegments)=> {
        const geometry = new THREE.SphereBufferGeometry(
            radius, widthSegments, heightSegments
        );
        const material = new THREE.MeshBasicMaterial({
                  color: 0xffffff
              });
        const mesh = new THREE.Mesh(geometry, material);

        return mesh;
    }

    // update
    let update =()=> {

    }

    // render
    let render =()=> {
        renderer.render(scene, pCamera);
    }

    // gameloop
    let gameLoop =()=> {
        requestAnimationFrame(gameLoop);
        update();
        render();
    }

    // init to initialize camera, renderer, scene, objects and etc.
    let init =()=> {

        createCamera();
        createScene();
        createRenderer();

        // sphere - sun
        sun = createSphere(10, 32, 32);
        scene.add(sun);

        gameLoop();

        return{
            renderer,
            scene,
            pCamera
        }

    }

    // resize
    let resize =()=> {
        let width = window.innerWidth,
            height = window.innerHeight;

        renderer = init;

        console.log(renderer);

        // renderer.setSize(width, height);
        // pCamera.aspect = width / height;
        // pCamera.updateProjectionMatrix();
    }

    return {
        init,
        resize
    }


});


// window onload
window.onload =()=>{
    project().init();
}

// window resize
window.onresize =()=> {
    project().resize();
    console.log("hello")
}



