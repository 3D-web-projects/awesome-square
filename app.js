

    // global variables - within IIFE
    let pCamera, scene, renderer, sun, dLight, cube, ambientLight;
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
        const material = new THREE.MeshPhongMaterial({
                  color: 0xfff000
              });
        const mesh = new THREE.Mesh(geometry, material);

        return mesh;
    }

    // add objects to the scene
    let addObjectsToScene =()=> {
        sun = createSphere(1, 32, 32);

        dLight = createDirectionalLight(0xfff000, 1);
        sun.add(dLight);
        scene.add(sun);


        cube = createCube(3, 3, 3);
        cube.name ='im a cube';
        scene.add(cube);

        ambientLight = createAmbientLight(0xffffff, 1);
        scene.add(ambientLight);

        console.log(scene);
    }

    // reposition objects
    let repositionObjects =()=> {
        sun.position.set(0, 6, 0);

        dLight.position.set(0, 3, 7);
    }

    // create direction light
    let createDirectionalLight =(color, intensity)=>{
        let light = new THREE.DirectionalLight(color, intensity);
        let helper = new THREE.DirectionalLightHelper(light, 5);
        scene.add(helper);
        return light;
    }

    // create ambient light
    let createAmbientLight =(color, intensity)=> {
        let light = new THREE.AmbientLight(color, intensity);
        return light;
    }

    // create cube
    let createCube =(width, height, depth)=>{
        let geometry = new THREE.BoxBufferGeometry(width, height, depth),
            material = new THREE.MeshPhongMaterial({
                map: new THREE.TextureLoader().load('./metal.jpg'),
                side: THREE.DoubleSide
            }),
            mesh = new THREE.Mesh(geometry, material);

        return mesh;

    }

    // update
    let update =()=> {
        sun.rotation.y += 0.01;
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



