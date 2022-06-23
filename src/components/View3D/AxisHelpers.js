import * as THREE from "three";

const Arrow = ({ from, to, length, color }) => {
    // a simple line and cone with a certain size and direction
    const direction = to.clone().sub(from);
    const arrow = new THREE.ArrowHelper(direction.normalize(), from, length, color, 0.5, 0.5);
    return (
        <primitive object={arrow} />
    );
};

const AxisHelpers = ({ container, parseLength }) => {
    const { width, height, depth } = container;
    // add fixed arrows as axes with fixed colors
    return (
        <group>
            <Arrow from={new THREE.Vector3(-1, -1, -1)} to={new THREE.Vector3(1, -1, -1)} length={parseLength(width) + 2} color={0xFF0000} />
            <Arrow from={new THREE.Vector3(-1, -1, -1)} to={new THREE.Vector3(-1, 1, -1)} length={parseLength(height) + 2} color={0x7700} />
            <Arrow from={new THREE.Vector3(-1, -1, -1)} to={new THREE.Vector3(-1, -1, 1)} length={parseLength(depth) + 2} color={0xFF} />
        </group>
    );
};

export {
    AxisHelpers
}