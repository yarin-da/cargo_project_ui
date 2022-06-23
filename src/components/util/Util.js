// convert positions to the center of the object
const parsePosition = ({ scale, position }) => position.map((p, i) => p + scale[i]/2);
// apply dot product between two arrays of numbers
const dotProduct = (a, b) => a.map((_, i) => a[i] * b[i]).reduce((m, n) => m + n);
// mod for non-negative numbers
const mod = (n, m) => ((n % m) + m) % m;
// scale the every package size and position (and also container size)
const scaledSolution = (solution, scalar) => {
    if (!scalar || scalar === 1) return solution;
    
    const dims = ['width', 'depth', 'height'];
    const pos = ['x', 'y', 'z'];
    const newSolution = {...solution};

    // scale container
    dims.forEach(dim => {
        newSolution['container'][dim] *= scalar;
    });
    // scale package sizes
    for (let idx in newSolution['packages']) {
        dims.forEach(dim => {
            newSolution['packages'][idx][dim] *= scalar;
        });
    }
    // scale package positions
    for (let idx in newSolution['solution']) {
        pos.forEach(p => {
            newSolution['solution'][idx][p] *= scalar;
        });
    }

    return newSolution;
};

export {
    scaledSolution,
    mod,
    dotProduct,
    parsePosition,
};