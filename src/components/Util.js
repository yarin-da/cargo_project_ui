const scaledSolution = (solution, scalar) => {
    if (!scalar || scalar === 1) return solution;
    
    const dims = ['width', 'depth', 'height'];
    const pos = ['x', 'y', 'z'];
    const newSolution = {...solution};

    dims.forEach(dim => {
        newSolution['container'][dim] *= scalar;
    });
    for (let idx in newSolution['packages']) {
        dims.forEach(dim => {
            newSolution['packages'][idx][dim] *= scalar;
        });
    }
    
    for (let idx in newSolution['solution']) {
        pos.forEach(p => {
            newSolution['solution'][idx][p] *= scalar;
        });
    }

    return newSolution;
};

export {
    scaledSolution
};