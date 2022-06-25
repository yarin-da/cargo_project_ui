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

    // scale container
    const container = {...solution['container']};
    dims.forEach(dim => {
        container[dim] *= scalar;
    });
    
    // scale package sizes
    const packages = [];
    for (let idx in solution['packages']) {
        const pkg = {...solution['packages'][idx]};
        dims.forEach(dim => {
            pkg[dim] *= scalar;
        });
    }
    
    // scale package positions
    const pkgSolution = [];
    for (let idx in solution['solution']) {
        const entry = {...solution['solution'][idx]};
        pos.forEach(p => {
            entry[p] *= scalar;
        });
        pkgSolution.push(entry);
    }

    return { container, packages, solution: pkgSolution, scalar };
};

const getJSONFromStorage = (key, defaultValue) => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
}

const saveJSONinStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
}

export {
    scaledSolution,
    mod,
    dotProduct,
    parsePosition,
    getJSONFromStorage,
    saveJSONinStorage,
};