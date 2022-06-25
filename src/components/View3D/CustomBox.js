import React, { useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Line } from '@react-three/drei'
import { parsePosition } from '../util/Util';

const EDGE_COLOR          = 0x334444;
const EDGE_WIDTH          = 0.5;
const TEXT_SIZE           = 0.3;
const VISIBILITY_DIST     = 10;
const SELECTED_BOX_COLOR  = 0xDC143C;
const SELECTED_EDGE_COLOR = 0xffffff;
const SELECTED_TEXT_COLOR = 0xffffff;

const BoxEdges = ({ position, scale, selected }) => {
    const [x, y, z] = position;
    const [w, h, d] = scale;
    // hardcode everything for better performance
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
    // note that we draw the edges manually because threejs draws diagonal edges by default
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

const CustomText = ({ position, rotation, text, selected, maxWidth }) => {
    // draw text in 3d space
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

const BoxText = ({ position, scale, text, selected }) => {
    const offset = 0.01;
    const dist = scale.map(s => s / 2);
    // hardcode text positions
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
        // make sure boxes are invisible if they're too close to the camera
        if (selected) return;
        const { x, z, y } = camera.position;
        const diff2 = [x, y, z].map((p, i) => (p - position[i] - scale[i]/2)*(p - position[i] - scale[i]/2));
        const dist = diff2.reduce((a, b) => a + b, 0);
        if (visible !== (dist >= VISIBILITY_DIST * VISIBILITY_DIST)) {
            setVisible(curr => !curr);
        }
    });
    
    // convert the box dimensions by the rotation
    const rotate = ({scale, rotation}) => {
        const newScale = [...scale];
        rotation.forEach((r, i) => {
            // 90 degree rotation of a certain dimenion is basically swapping the other dimensions
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
    // get the center of the box
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
                />
                <BoxEdges position={position} scale={translatedScale} selected={selected} />
            </group>
        }</>
    );
};

export default CustomBox;