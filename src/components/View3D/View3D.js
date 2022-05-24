import React, { Suspense, useState } from 'react'
import { extend, Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, Box, Line } from '@react-three/drei'
import { Text } from "troika-three-text";
import '../../styles/ColorMap.css';
import * as THREE from "three";

const EDGE_COLOR = 0x334444;
const EDGE_WIDTH = 0.5;
const TEXT_SIZE = 0.3;
const VISIBILITY_DIST = 15;
const VISIBILITY_DIST2 = VISIBILITY_DIST * VISIBILITY_DIST;
const CONTAINER_COLOR = 0x777777;
const CONTAINER_THICKNESS = 0.1;

const SELECTED_BOX_COLOR = 0x004477;
const SELECTED_EDGE_COLOR = 0x00aadd;
const SELECTED_TEXT_COLOR = 0xffffff;

extend({ Text });

const calculatePlane = (A, B, C) => {
    const coefficientX = (B[0] - A[0]) * (C[0] - A[0]);
    const coefficientY = (B[1] - A[1]) * (C[1] - A[1]);
    const coefficientZ = (B[2] - A[2]) * (C[2] - A[2]);
    const coefficientFree = coefficientX * A[0] + coefficientY * A[1] + coefficientZ * A[2];
    return new THREE.Plane(new THREE.Vector3(coefficientX, coefficientY, coefficientZ), coefficientFree);
};

const dotProduct = (a, b) => a.map((_, i) => a[i] * b[i]).reduce((m, n) => m + n);

const parsePosition = ({ scale, position }) => {
    return position.map((p, i) => p + scale[i]/2);
};

const BoxEdges = ({ position, scale, selected }) => {
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
                    color={selected ? SELECTED_EDGE_COLOR : EDGE_COLOR} 
                />
            )
        }
        </group>
    );
};

const CustomText = ({ position, rotation, text, selected }) => {
    return (
        <text
            position={position ?? [0, 0, 0]}
            rotation={rotation ?? [0, 0, 0]}
            text={text ?? ''}
            fontSize={TEXT_SIZE}
            color={selected ? SELECTED_TEXT_COLOR : "black"}
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

const BoxText = ({ position, scale, text, selected }) => {
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
                    selected={selected}
                    text={text} 
                    position={position.map((p, i) => p + t.position[i])} 
                    rotation={t.rotation}
                />
            )
        }
        </group>
    );
};

const CustomBox = ({ 
    color=0xFF0000, 
    scale=[1, 1, 1], 
    position=[0, 0, 0], 
    rotation=[0, 0, 0], 
    text='', 
    parseByScale=null,
    onClick,
    selected
}) => {   
    const [visible, setVisible] = useState(true);
    
    useFrame(({ camera }) => {
        if (selected) return;
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
            <group onClick={onClick}>
                <Box scale={translatedScale} position={translatedPos}>
                    <meshStandardMaterial color={selected ? SELECTED_BOX_COLOR : color} />
                </Box>
                <BoxText position={translatedPos} scale={translatedScale} text={text} selected={selected} />
                <BoxEdges position={position} scale={translatedScale} selected={selected} />
            </group>
        }</>
    );
};

const Package = ({ solution, packages, colorMap, index, selected, onSelect }) => {
    const sol = solution[index];
    const pkg = packages.find(pkg => pkg['type'] === sol['type']);
    return (
        <CustomBox 
            selected={index === selected}
            onClick={(e) => onSelect(e, index)}
            text={pkg['type']}
            color={colorMap[pkg['type']]} 
            scale={[pkg['width'], pkg['height'], pkg['depth']]}
            rotation={[sol['rotation-x'], sol['rotation-z'], sol['rotation-y']]}
            position={[sol['x'], sol['z'], sol['y']]} 
        />
    );
};

const Packages = ({ packages, solution, colorMap, selected, onSelect }) => {
    return (
        <group>
        {
            solution
            .map((_, i) =>
                <Package 
                    key={`package-${i}`} 
                    solution={solution} 
                    packages={packages}
                    colorMap={colorMap} 
                    selected={selected} 
                    onSelect={onSelect} 
                    index={i}
                />
            )
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
                    wall.visible &&
                    <Box key={`container-wall-${i}`} scale={wall.scale} position={parsePosition({ position: wall.position, scale })}>
                        <meshStandardMaterial color={CONTAINER_COLOR} />        
                    </Box>
                )
            }
        </group>
    );
}

const View3D = ({ setSolution, solution, packages, container, colorMap, selectedPackage, setSelectedPackage }) => {
    const [controlTarget, setControlTarget] = useState([0, 0, 0]);
    const canvasStyle = {
        width: '100%',
        height: '100%',
    };

    const maxContainerDim = Object.values(container).reduce((a, b) => a > b ? a : b, 0);

    // TODO: update perhaps only on right click?
    const updateControlsTarget = (index) => {
        if (index !== -1) {
            const pkg = solution[index];
            setControlTarget([pkg['x'],pkg['z'],pkg['y']]);
        }
    }

    const onPackageClick = (e, pkgIndex) => {
        e.stopPropagation();
        setSelectedPackage(curr => curr === pkgIndex ? -1 : pkgIndex);
        updateControlsTarget(pkgIndex);
    };

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
                <OrbitControls enableDamping dampingFactor={0.1} rotateSpeed={0.5} target={controlTarget} />
                <Container scale={[container['width'], container['height'], container['depth']]} />
                <Packages 
                    solution={solution} 
                    packages={packages} 
                    container={container} 
                    colorMap={colorMap} 
                    selected={selectedPackage} 
                    onSelect={onPackageClick} 
                />
                <pointLight position={[0, 20, -5]} />
                <ambientLight intensity={0.4} />
                <Environment preset="warehouse" />
            </Suspense>
        </Canvas>
    )
}

export default View3D;
