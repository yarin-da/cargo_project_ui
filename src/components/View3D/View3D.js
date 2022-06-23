import React, { Suspense, useState } from 'react'
import { extend, Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, Box, Line } from '@react-three/drei'
import { Text } from "troika-three-text";
import '../../styles/ColorMap.css';
import * as THREE from "three";

const EDGE_COLOR = 0x334444;
const EDGE_WIDTH = 0.5;
const TEXT_SIZE = 0.3;
const VISIBILITY_DIST = 10;
const CONTAINER_COLOR = 0x777777;
const CONTAINER_THICKNESS = 0.1;
const BACKGROUND_COLOR = '#ffffff'; 
const SELECTED_BOX_COLOR = '#DC143C';
const SELECTED_EDGE_COLOR = 0xffffff;
const SELECTED_TEXT_COLOR = 0xffffff;

extend({ Text });

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

const CustomText = ({ position, rotation, text, selected, maxWidth, parseLength }) => {
    return (
        <text
            position={position ?? [0, 0, 0]}
            rotation={rotation ?? [0, 0, 0]}
            text={text ?? ''}
            fontSize={TEXT_SIZE}
            color={selected ? SELECTED_TEXT_COLOR : "black"}
            maxWidth={maxWidth}
            lineHeight={1}
            letterSpacing={0}
            textAlign={"justify"}
            font={'https://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Mu4mxM.woff'}
            anchorX="center"
            anchorY="middle"
            overflowWrap={'break-word'}
        />
    );
};

const BoxText = ({ position, scale, text, selected, parseLength }) => {
    const offset = 0.01
    const dist = scale.map(s => s / 2);
    const texts = [
        {
            maxWidth: scale[0],
            position: [0, 0, dist[2] + offset],
            rotation: [0, 0, 0]
        },
        {
            maxWidth: scale[0],
            position: [0, 0, -(dist[2] + offset)],
            rotation: [0, Math.PI, 0]
        },
        {
            maxWidth: scale[2],
            position: [dist[0] + offset, 0, 0],
            rotation: [0, Math.PI/2, 0]
        },
        {
            maxWidth: scale[2],
            position: [-(dist[0] + offset), 0, 0],
            rotation: [0, Math.PI + Math.PI/2, 0]
        },
        {
            maxWidth: scale[0],
            position: [0, dist[1] + 0.01, 0],
            rotation: [-Math.PI/2, 0, 0]
        },
        {
            maxWidth: scale[0],
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
                    maxWidth={t.maxWidth}
                    parseLength={parseLength}
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
    selected,
    parseLength
}) => {   
    const [visible, setVisible] = useState(true);
    
    useFrame(({ camera }) => {
        if (selected) return;
        const { x, z, y } = camera.position;
        const diff2 = [x, y, z].map((p, i) => (p - position[i] - scale[i]/2)*(p - position[i] - scale[i]/2));
        const dist = diff2.reduce((a, b) => a + b, 0);
        if (visible !== (dist >= VISIBILITY_DIST * VISIBILITY_DIST)) {
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
                <BoxText 
                    position={translatedPos} 
                    scale={translatedScale} 
                    text={text} 
                    selected={selected} 
                    parseLength={parseLength}
                />
                <BoxEdges position={position} scale={translatedScale} selected={selected} />
            </group>
        }</>
    );
};

const Package = ({ solution, packages, colorMap, index, selected, onSelect, parseLength }) => {
    const sol = solution[index];
    const pkg = packages.find(pkg => pkg['type'] === sol['type']);
    return (
        <CustomBox 
            selected={selected.includes(index)}
            onClick={(e) => onSelect(e, index)}
            text={pkg['type']}
            color={colorMap[pkg['type']]} 
            scale={[pkg['width'], pkg['height'], pkg['depth']].map(len => parseLength(len))}
            rotation={[sol['rotation-x'], sol['rotation-z'], sol['rotation-y']]}
            position={[sol['x'], sol['z'], sol['y']].map(len => parseLength(len))} 
            parseLength={parseLength}
        />
    );
};

const Packages = ({ packages, solution, colorMap, selected, onSelect, parseLength }) => {
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
                    parseLength={parseLength}
                />
            )
        }
        </group>
    );
};

const Container = ({ scale, parseLength }) => {
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
                <Box 
                    key={`container-wall-${i}`} 
                    scale={wall.scale.map(len => parseLength(len))} 
                    position={parsePosition({ position: wall.position, scale }).map(len => parseLength(len))}
                >
                    <meshStandardMaterial color={CONTAINER_COLOR} />        
                </Box>
            )
        }
        </group>
    );
}

const Arrow = ({ from, to, length, color }) => {
    const direction = to.clone().sub(from);
    const arrow = new THREE.ArrowHelper(direction.normalize(), from, length, color, 0.5, 0.5 );
    return (
        <primitive object={arrow} />
    );
};

const AxisHelpers = ({ container, parseLength }) => {
    const { width, height, depth } = container;
    return (
        <group>
            <Arrow from={new THREE.Vector3(-1, -1, -1)} to={new THREE.Vector3(1, -1, -1)} length={parseLength(width) + 2} color={0xFF0000} />
            <Arrow from={new THREE.Vector3(-1, -1, -1)} to={new THREE.Vector3(-1, 1, -1)} length={parseLength(height) + 2} color={0x7700} />
            <Arrow from={new THREE.Vector3(-1, -1, -1)} to={new THREE.Vector3(-1, -1, 1)} length={parseLength(depth) + 2} color={0xFF} />
        </group>
    );
};

const View3D = ({ 
    solution, 
    packages, 
    container, 
    colorMap, 
    selectedPackages, 
    setSelectedPackages,
    scaleDim
}) => {
    const [controlTarget, setControlTarget] = useState([0, 0, 0]);
    const canvasStyle = {
        width: '100%',
        height: '100%',
        backgroundColor: BACKGROUND_COLOR,
    };

    const maxContainerDim = Math.max(container['width'], container['height'], container['depth']);

    const parseLength = (length) => length / scaleDim;

    const updateControlsTarget = (index) => {
        if (index !== -1) {
            const pkg = solution[index];
            setControlTarget([pkg['x'],pkg['z'],pkg['y']]);
        }
    }

    const onPackageClick = (e, pkgIndex) => {
        e.stopPropagation();
        // focus on package when alt is pressed
        if (e.altKey) {
            updateControlsTarget(pkgIndex);
            return;
        }
        
        if (e.ctrlKey) {
            // add to selected packages when ctrl is pressed
            setSelectedPackages(curr => curr.includes(pkgIndex) ? curr.filter(x => x !== pkgIndex) : [...curr, pkgIndex]);
        }
        else {
            // simply set selected packages to the clicked package
            setSelectedPackages(curr => curr.length > 1 ? [pkgIndex] : curr.includes(pkgIndex) ? [] : [pkgIndex]);
        }
    };

    return (
        <Canvas 
            style={canvasStyle} 
            dpr={[1, 2]} 
            camera={{ 
                position: [maxContainerDim, maxContainerDim, maxContainerDim].map(len => parseLength(len)), 
                fov: 75, 
                near: 0.1,
                far: 5000 
            }}
        >
            <Suspense fallback={null}>
                <fog attach="fog" color="white" near={800} far={1000} />
                <OrbitControls enableDamping dampingFactor={0.1} rotateSpeed={0.5} target={controlTarget} />
                <Container 
                    scale={[
                        container['width'], 
                        container['height'], 
                        container['depth']
                    ]} 
                    parseLength={parseLength}
                />
                <Packages 
                    solution={solution} 
                    packages={packages} 
                    container={container} 
                    colorMap={colorMap} 
                    selected={selectedPackages} 
                    onSelect={onPackageClick} 
                    parseLength={parseLength}
                />
                {selectedPackages.length > 0 && <AxisHelpers container={container} parseLength={parseLength} />}
                <pointLight position={[0, 20, -5]} />
                <ambientLight intensity={0.4} />
                <Environment preset="warehouse" />
            </Suspense>
        </Canvas>
    )
}

export default View3D;
