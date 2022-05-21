import React, { Suspense, useState } from 'react'
import { extend, Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, Box, Line } from '@react-three/drei'
import { Text } from "troika-three-text";
import '../../styles/ColorMap.css';

const EDGE_COLOR = 0x334444;
const EDGE_WIDTH = 0.5;
const TEXT_SIZE = 0.3;
const VISIBILITY_DIST = 10;
const VISIBILITY_DIST2 = VISIBILITY_DIST * VISIBILITY_DIST;
const CONTAINER_COLOR = 0x777777;
const CONTAINER_THICKNESS = 0.1;

extend({ Text });

const dotProduct = (a, b) => a.map((_, i) => a[i] * b[i]).reduce((m, n) => m + n);

const parsePosition = ({ scale, position }) => {
    return position.map((p, i) => p + scale[i]/2);
};

const BoxEdges = ({ position, scale }) => {
    const [x, y, z] = position;
    const [w, h, d] = scale;
    const lines = [
        [[x,     y,     z    ], [x + w, y,     z    ]],
        [[x,     y,     z    ], [x,     y + h, z    ]],
        [[x,     y,     z    ], [x,     y,     z + d]],
        [[x,     y,     z + d], [x + w, y,     z + d]],
        [[x,     y,     z + d], [x,     y + h, z + d]],
        [[x,     y + h, z    ], [x + w, y + h, z    ]],
        [[x,     y + h, z    ], [x,     y + h, z + d]],
        [[x + w, y,     z    ], [x + w, y + h, z    ]],
        [[x + w, y,     z    ], [x + w, y,     z + d]],
        [[x + w, y + h, z + d], [x + w, y + h, z    ]],
        [[x + w, y + h, z + d], [x + w, y,     z + d]],
        [[x + w, y + h, z + d], [x,     y + h, z + d]],
    ];

    return (
        <group>
        {
            lines.map((line, i) => 
                <Line 
                    key={`box-edge-${i}`}
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

const BoxText = ({ position, scale, text }) => {
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
        const { x, z, y } = camera.position;
        const diff2 = [x, y, z].map((p, i) => (p - position[i])*(p - position[i]));
        const dist = diff2.reduce((a, b) => a + b, 0);
        if (visible !== (dist >= VISIBILITY_DIST2)) {
            setVisible(curr => !curr);
        }
    });

    const rotate = ({scale, rotation}) => {
        const newScale = [...scale];
        rotation.forEach((r, i) => {
            const [a, b] = [0, 1, 2].filter(a => a !== i);
            let angle = 0;
            const rot = r % 360;
            while (angle < rot) {
                angle += 90;
                const temp = newScale[a];
                newScale[a] = newScale[b];
                newScale[b] = temp;
            }
        });
        return newScale;
    };

    const translatedScale = rotate({ scale, rotation });
    const translatedPos = parsePosition({ scale: parseByScale ?? translatedScale, position });
    return (
        <>{
            visible &&
            <group>
                <Box scale={translatedScale} position={translatedPos}>
                    <meshStandardMaterial color={color} />
                </Box>
                <BoxText position={translatedPos} scale={translatedScale} text={text} />
                <BoxEdges position={position} scale={translatedScale} />
            </group>
        }</>
    );
};

const Packages = ({ packages, solution, colorMap }) => {
    return (
        <group>
        {
            solution.map((sol, i) => {
                const pkg = packages.find(pkg => pkg['type'] === sol['type']);
                return <CustomBox 
                    key={`package-${i}`}
                    text={pkg['type']}
                    color={colorMap[pkg['type']]} 
                    scale={[pkg['width'], pkg['height'], pkg['depth']]}
                    rotation={[sol['rotation-x'], sol['rotation-z'], sol['rotation-y']]}
                    position={[sol['x'], sol['z'], sol['y']]} 
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

    useFrame(({ camera }) => {
        // TODO:
        // const direction = camera.getWorldDirection(targetVector);
        const direction = camera.position;
        const [x, y, z] = direction;
        const wallsCopy = [...walls];
        let shouldUpdate = false;
        wallsCopy.forEach(w => {
            const dot = dotProduct([x, y, z], w.position);
            if (w.visible !== (dot <= 0)) {
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

const View3D = ({ solution, colorMap }) => {
    const canvasStyle = {
        width: '100%',
        height: '100%',
    };

    const maxContainerDim = Object.values(solution['container']).reduce((a, b) => a > b ? a : b, 0);
    return (
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
                <OrbitControls enableDamping dampingFactor={0.1} rotateSpeed={0.5} />
                <Container scale={[solution['container']['width'], solution['container']['height'], solution['container']['depth']]} />
                <Packages {...solution} colorMap={colorMap} />
                <pointLight position={[0, 20, -5]} />
                <ambientLight intensity={0.4} />
                <Environment preset="warehouse" />
            </Suspense>
        </Canvas>
    )
}

export default View3D;
