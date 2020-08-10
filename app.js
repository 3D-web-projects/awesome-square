

    // global variables - within IIFE
    let pCamera, scene, renderer, sun, dLight, cube;
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

        addObjectsToScene();
        repositionObjects();

        gameLoop();

    }

    // add objects to the scene
    let addObjectsToScene =()=> {
        sun = createSphere(1, 32, 32);
        scene.add(sun);

        dLight = createDirectionalLight(0xffffff, 10);
        scene.add(dLight);

        cube = createCube(1, 1, 1);
        cube.name ='im a cube';
        scene.add(cube);

        console.log(scene);
    }

    // reposition objects
    let repositionObjects =()=> {
        sun.position.set(9, 6, 0);

        dLight.position.set(0, 3, 0);
    }

    // create direction light
    let createDirectionalLight =(color, intensity)=>{
        let light = new THREE.DirectionalLight(color, intensity);
        let helper = new THREE.DirectionalLightHelper(light, 3);
        scene.add(helper);
        return light;
    }

    // create cube
    let createCube =(width, height, depth)=>{
        let geometry = new THREE.BoxBufferGeometry(width, height, depth),
            material = new THREE.MeshPhongMaterial({
                // map: new THREE.TextureLoader().load('./disturb.jpg'),
                side: THREE.DoubleSide,
                color: 0x00ffff
            }),
            mesh = new THREE.Mesh(geometry, material);

        return mesh;

    }


    // resize
    let resize =()=> {
        let width = window.innerWidth,
            height = window.innerHeight;

        renderer.setSize(width, height);
        pCamera.aspect = width / height;
        pCamera.updateProjectionMatrix();

    }


// window onload
window.onload =()=>{
    init();
}

// window resize
window.onresize =()=> {
    resize();
    console.log("hello")
}



