import React, { Suspense, useState } from 'react'
import { extend, Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, Box } from '@react-three/drei'
import { Text } from "troika-three-text";
import { dotProduct } from '../util/Util';
import { AxisHelpers } from './AxisHelpers';
import CustomBox from './CustomBox';
import { parsePosition } from '../util/Util';
import '../../styles/ColorMap.css';

const CONTAINER_COLOR     = 0x777777;
const CONTAINER_THICKNESS = 0.1;
const BACKGROUND_COLOR    = 0xffffff; 

const canvasStyle = {
    width: '100%',
    height: '100%',
    backgroundColor: BACKGROUND_COLOR,
};

extend({ Text });

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
        // do not display the walls that can hide the packages from the user
        const direction = camera.position;
        const [x, y, z] = direction;
        const wallsCopy = [...walls];
        let shouldUpdate = false;
        wallsCopy.forEach(w => {
            // each wall has a direction that points inwards
            // when the dot product of the camera's direction and the wall's direction is positive
            // then the wall should not be visible
            const dot = dotProduct([x, y, z], w.position);
            if (w.visible !== (dot <= 0)) {
                w.visible = !w.visible;
                shouldUpdate = true;
            }
        });

        // do not update unnecessarily
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

    const parseLength = (length) => length / scaleDim;

    const updateControlsTarget = (index) => {
        if (index !== -1) {
            const pkg = solution[index];
            setControlTarget([pkg['x'], pkg['z'], pkg['y']]);
        }
    }

    const onPackageClick = (e, pkgIndex) => {
        e.stopPropagation();
        // center around the package when alt is pressed
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

    const maxContainerDim = Math.max(container['width'], container['height'], container['depth']);
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
