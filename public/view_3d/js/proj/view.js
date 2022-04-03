const mockSolution = {
    "container": {
        "width": 10,
        "height": 10,
        "depth": 30
    },
    "packages": [
        {
            "type": "jewelry",
            "width": 2,
            "height": 3,
            "depth": 3
        },
        {
            "type": "clothing",
            "width": 3,
            "height": 2,
            "depth": 3
        },
        {
            "type": "electronics",
            "width": 2,
            "height": 2,
            "depth": 2
        },
        {
            "type": "glass",
            "width": 1,
            "height": 2,
            "depth": 1
        },
    ],
    "solution": [
        {
            "type": "jewelry",
            "x": 0,
            "y": 0,
            "z": 0
        },
        {
            "type": "jewelry",
            "x": 3,
            "y": 0,
            "z": 0
        },
        {
            "type": "clothing",
            "x": 0,
            "y": 3,
            "z": 0
        },
        {
            "type": "clothing",
            "x": 0,
            "y": 0,
            "z": 6
        },
        {
            "type": "clothing",
            "x": 5,
            "y": 0,
            "z": 0
        },
        {
            "type": "clothing",
            "x": 0,
            "y": 0,
            "z": 27
        },
        {
            "type": "clothing",
            "x": 3,
            "y": 0,
            "z": 27
        },
        {
            "type": "clothing",
            "x": 6,
            "y": 0,
            "z": 27
        },
        {
            "type": "jewelry",
            "x": 3,
            "y": 0,
            "z": 9
        },
        {
            "type": "jewelry",
            "x": 0,
            "y": 2,
            "z": 27
        },
        {
            "type": "jewelry",
            "x": 2,
            "y": 2,
            "z": 27
        },
        {
            "type": "jewelry",
            "x": 4,
            "y": 0,
            "z": 21
        },
        {
            "type": "jewelry",
            "x": 6,
            "y": 0,
            "z": 24
        },
        {
            "type": "jewelry",
            "x": 8,
            "y": 2,
            "z": 27
        },
        {
            "type": "electronics",
            "x": 3,
            "y": 3,
            "z": 9
        },
        {
            "type": "electronics",
            "x": 0,
            "y": 0,
            "z": 11
        },
        {
            "type": "electronics",
            "x": 0,
            "y": 2,
            "z": 7
        },
        {
            "type": "glass",
            "x": 4,
            "y": 0,
            "z": 7
        },
        {
            "type": "glass",
            "x": 3,
            "y": 0,
            "z": 6
        },
        {
            "type": "glass",
            "x": 4,
            "y": 3,
            "z": 0
        },
        {
            "type": "glass",
            "x": 9,
            "y": 0,
            "z": 28
        },
        {
            "type": "glass",
            "x": 9,
            "y": 0,
            "z": 29
        },
        {
            "type": "glass",
            "x": 9,
            "y": 0,
            "z": 27
        },
    ]
};

function getPackageDictionary(packages) {
    const dict = {};
    packages.forEach(package => {
        const { type, width, height, depth } = package;
        const color = getColor(type);
        dict[type] = { width, height, depth, color };
    });
    return dict;
}

function getBasicCube({ position, size, color }) {
    const { width, height, depth } = size;
    const geometry = new THREE.BoxBufferGeometry(width, height, depth);
    
    const material = new THREE.MeshStandardMaterial({ color });
    const cube = new THREE.Mesh(geometry, material);
    
    const wireframeMaterial = new THREE.MeshStandardMaterial( { color: 0x000000, wireframe: true, transparent: true } );
    const cubeFrame = new THREE.Mesh(geometry, wireframeMaterial);
    
    const { x, y, z } = position;
    cube.position.set(x, y, z);
    cubeFrame.position.set(x, y, z);
    return [cube, cubeFrame];
}



const CONTAINER_COLOR = 0x777777;
const BACKGROUND_COLOR = 0xDDDDDD;
const LIGHT_COLOR = 0xFFFFFF;
const AMBIENT_LIGHT_INTENSITY = 0.3;
const DIR_LIGHT_INTENSITY = 0.6;

const geometries = [];
const packages = [];
const containerParts = [];

const scene = new THREE.Scene();
scene.background = new THREE.Color(BACKGROUND_COLOR);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.zoomSpeed = 2.0;
controls.enablePan = true;
controls.enableZoom = false;
// limit rotation movements
// controls.maxAzimuthAngle = Math.PI / 2;
// controls.minAzimuthAngle = 0;
// controls.maxPolarAngle = Math.PI / 2;
// controls.minPolarAngle = 0;

const containerSize = mockSolution['container'];
const maxContainerDim = Math.max(containerSize.width, containerSize.height, containerSize.depth);
//controls.update() must be called after any manual changes to the camera's transform
camera.position.set(maxContainerDim, maxContainerDim, maxContainerDim);
camera.lookAt(0, 0, 0);
controls.update();

// Add basic ambient light to add basic colors (otherwise everything will be completely black)
const ambientLight = new THREE.AmbientLight(LIGHT_COLOR, AMBIENT_LIGHT_INTENSITY);
scene.add(ambientLight);
// Add directional light for shadows
const dirLight = new THREE.DirectionalLight(LIGHT_COLOR, DIR_LIGHT_INTENSITY);
dirLight.position.set(maxContainerDim, 2 * maxContainerDim, maxContainerDim);
scene.add(dirLight);
// scene.add(new THREE.AxesHelper(25));






function drawPackages(serverOutput) {
    const packageDict = getPackageDictionary(serverOutput['packages']);
    const solution = mockSolution['solution'];
    solution.forEach(package => {
        const color = packageDict[package['type']]['color'];
        const position = { ...package };
        const size = { ...packageDict[package['type']] };
        const [cube, cubeFrame] = getBasicCube({ position, size, color });

        translateGeometry(cube);
        translateGeometry(cubeFrame);

        packages.push(cube);
        geometries.push(cube);
        scene.add(cube);

        geometries.push(cubeFrame);
        scene.add(cubeFrame);
        packages.push(cubeFrame);
    });
}

function translateGeometry(geometry) {
    const { width, height, depth } = geometry.geometry.parameters;
    geometry.translateOnAxis(new THREE.Vector3(1, 0, 0), (width - 1) / 2);
    geometry.translateOnAxis(new THREE.Vector3(0, 1, 0), (height - 1) / 2);
    geometry.translateOnAxis(new THREE.Vector3(0, 0, 1), (depth - 1) / 2);
}

function drawContainer(serverOutput) {    
    const { width, height, depth } = serverOutput['container'];
    controls.target.set(width/2, height/2, depth/2);
    
    const color = CONTAINER_COLOR;
    
    const positions = [
        { 
            x: -width/2, 
            y: 0, 
            z: 0, 
        },
        { 
            x: 0, 
            y: -height/2,
            z: 0, 
        },
        { 
            x: 0, 
            y: 0, 
            z: -depth/2, 
        }
    ];

    const sizes = [
        { 
            width: 1, 
            height: height + 1, 
            depth: depth + 1, 
        },
        { 
            width: width + 1, 
            height: 1, 
            depth: depth + 1, 
        },
        { 
            width: width + 1, 
            height: height + 1, 
            depth: 1, 
        },
    ];

    for (let i = 0; i < sizes.length; i++) {
        const size = sizes[i];
        const position = positions[i];

        const [cube, _] = getBasicCube({ position, size, color });
        cube.translateOnAxis(new THREE.Vector3(1, 0, 0), width/2 - 1);
        cube.translateOnAxis(new THREE.Vector3(0, 1, 0), height/2 - 1);
        cube.translateOnAxis(new THREE.Vector3(0, 0, 1), depth/2 - 1);
        
        scene.add(cube);
        geometries.push(cube);
    }
}

function dist(a, b) {
    const xDiff = a.x - b.x;
    const yDiff = a.y - b.y;
    const zDiff = a.z - b.z;
    return Math.sqrt(xDiff * xDiff + yDiff * yDiff + zDiff * zDiff);
}

function updateObjectsVisibility() {
    const MIN_DIST = 10;
    packages.forEach(p => {
        p.visible = dist(camera.position, p.position) > MIN_DIST;
    });
}

// TODO: change target when too close
function zoom(event) {
    const ZOOM_SPEED = 0.85;
    const dir = camera.getWorldDirection(new THREE.Vector3()).setLength(ZOOM_SPEED);
    
    camera.position.copy(
        event.deltaY < 0 ? 
        camera.position.add(dir) : camera.position.sub(dir)
    );
    // camera.target.copy(
    //     event.deltaY < 0 ? 
    //     camera.target.add(dir) : camera.target.sub(dir)
    // );
    controls.update();
}

// function animate() {
//     requestAnimationFrame(animate);
//     renderer.render(scene, camera);
// };

drawContainer(mockSolution);
drawPackages(mockSolution);

// animate();
renderer.render(scene, camera);
controls.addEventListener("change", () => {
    updateObjectsVisibility();
    renderer.render(scene, camera);
});

document.addEventListener('wheel', zoom);