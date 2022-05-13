import React, { Suspense, useState } from 'react'
import { extend, Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, Box, Line } from '@react-three/drei'
import { Text } from "troika-three-text";
import '../../styles/ColorMap.css';

const EDGE_COLOR = 0x334444;
const EDGE_WIDTH = 0.5;
const TEXT_SIZE = 0.3;
const VISIBILITY_DIST = 7;
const VISIBILITY_DIST2 = VISIBILITY_DIST*VISIBILITY_DIST;
const CONTAINER_COLOR = 0x777777;
const CONTAINER_THICKNESS = 0.1;

extend({ Text });

const BoxEdges = ({ position, scale, rotation }) => {
    const [x, y, z] = position;
    const [w, h, d] = scale;
    const lines = [
        [[x, y, z], [x + w, y, z]],
        [[x, y, z], [x, y + h, z]],
        [[x, y, z], [x, y, z + d]],
        [[x, y, z + d], [x + w, y, z + d]],
        [[x, y, z + d], [x, y + h, z + d]],
        [[x, y + h, z], [x + w, y + h, z]],
        [[x, y + h, z], [x, y + h, z + d]],
        [[x + w, y, z], [x + w, y + h, z]],
        [[x + w, y, z], [x + w, y, z + d]],
        [[x + w, y + h, z + d], [x + w, y + h, z]],
        [[x + w, y + h, z + d], [x + w, y, z + d]],
        [[x + w, y + h, z + d], [x, y + h, z + d]],
    ];

    return (
        <group>
        {
            lines.map((line, i) => 
                <Line 
                    key={`box-edge-${i}`}
                    rotateX={Math.PI/2}
                    points={line}
                    lineWidth={EDGE_WIDTH}
                    color={EDGE_COLOR} 
                />
            )
        }
        </group>
    );
};

const CustomText = ({ position, rotation, text }) => {
    return (
        <text
            position={position ?? [0, 0, 0]}
            rotation={rotation ?? [0, 0, 0]}
            text={text ?? ''}
            fontSize={TEXT_SIZE}
            color={"black"}
            maxWidth={1}
            lineHeight={1}
            letterSpacing={0}
            textAlign={"justify"}
            font={'https://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Mu4mxM.woff'}
            anchorX="center"
            anchorY="middle"
        />
    );
};

const BoxText = ({ position, scale, text, rotation }) => {
    const offset = 0.01
    const dist = scale.map(s => s / 2);
    const texts = [
        {
            position: [0, 0, dist[2] + offset],
            rotation: [0, 0, 0]
        },
        {
            position: [0, 0, -(dist[2] + offset)],
            rotation: [0, Math.PI, 0]
        },
        {
            position: [dist[0] + offset, 0, 0],
            rotation: [0, Math.PI/2, 0]
        },
        {
            position: [-(dist[0] + offset), 0, 0],
            rotation: [0, Math.PI + Math.PI/2, 0]
        },
        {
            position: [0, dist[1] + 0.01, 0],
            rotation: [-Math.PI/2, 0, 0]
        },
        {
            position: [0, -(dist[1] + 0.01), 0],
            rotation: [Math.PI/2, 0, 0]
        },
    ];
    return (
        <group>
        {
            texts.map((t, i) => 
                <CustomText
                    key={`text-${i}`} 
                    text={text} 
                    position={position.map((p, i) => p + t.position[i])} 
                    rotation={t.rotation}
                />
            )
        }
        </group>
    );
};

const CustomBox = ({ color=0xFF0000, scale=[1, 1, 1], position=[0, 0, 0], rotation=[0, 0, 0], text='', parseByScale=null }) => {   
    const [visible, setVisible] = useState(true);
    
    useFrame(({ camera }) => {
        const { x, y, z } = camera.position;
        const diff2 = [x, y, z].map((p, i) => (p - position[i])*(p - position[i]));
        const dist = diff2.reduce((a, b) => a + b, 0);
        if (visible !== (dist >= VISIBILITY_DIST2)) {
            setVisible(curr => !curr);
        }
    });

    const translatedPos = parsePosition({ scale: parseByScale ?? scale, position });
    return (
        <>{
            visible &&
            <group>
                <Box scale={scale} position={translatedPos} rotateX={Math.PI/2}>
                    <meshStandardMaterial color={color} />
                </Box>
                <BoxText position={translatedPos} scale={scale} text={text} rotation={rotation} />
                <BoxEdges position={position} scale={scale} rotation={rotation} />
            </group>
        }</>
    );
};

const Packages = ({ packages, solution }) => {
    return (
        <group>
        {
            solution.map((sol, i) => {
                const pkg = packages.find(pkg => pkg['type'] === sol['type']);
                return <CustomBox 
                    key={`package-${i}`}
                    text={pkg['type']}
                    color={typeColors[pkg['type']]} 
                    scale={[pkg['width'], pkg['height'], pkg['depth']]}
                    rotation={[pkg['rotation-x'], pkg['rotation-y'], pkg['rotation-z']].map(r => degreesToRadians(r))}
                    position={[sol['x'], sol['y'], sol['z']]} 
                />

            })
        }
        </group>
    );
};

const Container = ({ scale }) => {
    const [width, height, depth] = scale.map(s => s + CONTAINER_THICKNESS);
    const [walls, setWalls] = useState([
        {
            position: [-(width/2 + CONTAINER_THICKNESS), -CONTAINER_THICKNESS, -CONTAINER_THICKNESS],
            scale: [CONTAINER_THICKNESS, height + CONTAINER_THICKNESS, depth + CONTAINER_THICKNESS],
            direction: [1, 0, 0],
            visible: true,
        },
        {
            position: [width/2, -CONTAINER_THICKNESS, -CONTAINER_THICKNESS],
            scale: [CONTAINER_THICKNESS, height + CONTAINER_THICKNESS, depth + CONTAINER_THICKNESS],
            direction: [-1, 0, 0],
            visible: true,
        },
        {
            position: [-CONTAINER_THICKNESS, -(height/2 + CONTAINER_THICKNESS), -CONTAINER_THICKNESS],
            scale: [width + CONTAINER_THICKNESS, CONTAINER_THICKNESS, depth + CONTAINER_THICKNESS],
            direction: [0, 1, 0],
            visible: true,
        },
        {
            position: [-CONTAINER_THICKNESS, height/2, -CONTAINER_THICKNESS],
            scale: [width + CONTAINER_THICKNESS, CONTAINER_THICKNESS, depth + CONTAINER_THICKNESS],
            direction: [0, -1, 0],
            visible: true,
        },
        {
            position: [-CONTAINER_THICKNESS, -CONTAINER_THICKNESS, -(depth/2 + CONTAINER_THICKNESS)],
            scale: [width + CONTAINER_THICKNESS, height + CONTAINER_THICKNESS, CONTAINER_THICKNESS],
            direction: [0, 0, 1],
            visible: true,
        },

        {
            position: [-CONTAINER_THICKNESS, -CONTAINER_THICKNESS, depth/2],
            scale: [width + CONTAINER_THICKNESS, height + CONTAINER_THICKNESS, CONTAINER_THICKNESS],
            direction: [0, 0, -1],
            visible: true,
        },
    ]);

    const dot = (a, b) => a.map((x, i) => a[i] * b[i]).reduce((m, n) => m + n);

    useFrame(({ camera }) => {
        const [x, y, z] = camera.position;
        const wallsCopy = [...walls];
        let shouldUpdate = false;
        wallsCopy.forEach(w => {
            const dotProduct = dot([x, y, z], w.position);
            if (w.visible !== (dotProduct <= 0)) {
                w.visible = !w.visible;
                shouldUpdate = true;
            }
        });

        if (shouldUpdate) {
            setWalls(wallsCopy);
        }
    });

    return (
        <group>
            {
                walls.map((wall, i) => 
                    // <CustomBox 
                    //     key={`container-wall-${i}`}
                    //     scale={wall.scale}
                    //     parseByScale={scale}
                    //     position={wall.position}
                    //     color={CONTAINER_COLOR}
                    // />
                    wall.visible &&
                    <Box key={`container-wall-${i}`} scale={wall.scale} position={parsePosition({ position: wall.position, scale })}>
                        <meshStandardMaterial color={CONTAINER_COLOR} />        
                    </Box>
                )
            }
        </group>
    );
}

const ColorMap = ({ colorMap }) => {
    const parseColor = (color) => `#${color.toString(16).padStart(6, '0')}`;
    return (
        <div className="color-map">
        {
            Object.keys(colorMap).map(k => 
                <li key={`color-map-${k}`} className="color-item">
                    <div className="color-sample" style={{background: parseColor(colorMap[k])}} />
                    <div className="color-type-name">{k}</div>
                </li>
            )
        }
        </div>
    );
};

const View3D = () => {
    const canvasStyle = {
        width: '100vw',
        height: '100vh',
    };

    const maxContainerDim = Object.values(solution['container']).reduce((a, b) => a > b ? a : b, 0);
    return (
        <div>
            <Canvas 
                style={canvasStyle} 
                dpr={[1, 2]} 
                camera={{ 
                    position: [maxContainerDim, maxContainerDim, maxContainerDim], 
                    fov: 75, 
                    near: 0.1,
                    far: 1000 
                }}
            >
                <Suspense fallback={null}>
                    <OrbitControls />
                    <Container scale={[solution['container']['width'], solution['container']['height'], solution['container']['depth']]} />
                    <Packages {...solution} />
                    <pointLight position={[10, 10, 5]} />
                    <pointLight position={[-10, -10, -5]} />
                    <ambientLight intensity={0.4} />
                    <Environment preset="warehouse" />
                </Suspense>
            </Canvas>
            <ColorMap colorMap={typeColors} />
        </div>
    )
}

export default View3D;

const degreesToRadians = (degrees) => Math.PI * degrees / 180;

const parsePosition = ({ scale, position }) => {
    return position.map((p, i) => p + scale[i]/2);
};

const typeColors = {
    jewelry: 0xFF0000,
    clothing: 0x44AA44,
    electronics: 0x775577,
    glass: 0x005500
}

const solution = {
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
            "depth": 2
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
            "z": 0,
            "rotation-x": 0,
            "rotation-y": 0,
            "rotation-z": 0,
        },
        // {
        //     "type": "jewelry",
        //     "x": 3,
        //     "y": 0,
        //     "z": 0
        // },
        // {
        //     "type": "clothing",
        //     "x": 0,
        //     "y": 3,
        //     "z": 0
        // },
        // {
        //     "type": "clothing",
        //     "x": 0,
        //     "y": 0,
        //     "z": 6
        // },
        // {
        //     "type": "clothing",
        //     "x": 5,
        //     "y": 0,
        //     "z": 0
        // },
        // {
        //     "type": "clothing",
        //     "x": 0,
        //     "y": 0,
        //     "z": 27
        // },
        // {
        //     "type": "clothing",
        //     "x": 3,
        //     "y": 0,
        //     "z": 27
        // },
        // {
        //     "type": "clothing",
        //     "x": 6,
        //     "y": 0,
        //     "z": 27
        // },
        // {
        //     "type": "jewelry",
        //     "x": 3,
        //     "y": 0,
        //     "z": 9
        // },
        // {
        //     "type": "jewelry",
        //     "x": 0,
        //     "y": 2,
        //     "z": 27
        // },
        // {
        //     "type": "jewelry",
        //     "x": 2,
        //     "y": 2,
        //     "z": 27
        // },
        // {
        //     "type": "jewelry",
        //     "x": 4,
        //     "y": 0,
        //     "z": 21
        // },
        // {
        //     "type": "jewelry",
        //     "x": 6,
        //     "y": 0,
        //     "z": 24
        // },
        // {
        //     "type": "jewelry",
        //     "x": 8,
        //     "y": 2,
        //     "z": 27
        // },
        // {
        //     "type": "electronics",
        //     "x": 3,
        //     "y": 3,
        //     "z": 9
        // },
        // {
        //     "type": "electronics",
        //     "x": 0,
        //     "y": 0,
        //     "z": 11
        // },
        // {
        //     "type": "electronics",
        //     "x": 0,
        //     "y": 2,
        //     "z": 7
        // },
        // {
        //     "type": "glass",
        //     "x": 4,
        //     "y": 0,
        //     "z": 7
        // },
        // {
        //     "type": "glass",
        //     "x": 3,
        //     "y": 0,
        //     "z": 6
        // },
        // {
        //     "type": "glass",
        //     "x": 4,
        //     "y": 3,
        //     "z": 0
        // },
        // {
        //     "type": "glass",
        //     "x": 9,
        //     "y": 0,
        //     "z": 28
        // },
        // {
        //     "type": "glass",
        //     "x": 9,
        //     "y": 0,
        //     "z": 29
        // },
        // {
        //     "type": "glass",
        //     "x": 9,
        //     "y": 0,
        //     "z": 27
        // },
    ]
};