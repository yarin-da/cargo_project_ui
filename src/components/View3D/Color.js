const kellyColors = [
    '#C0C0C0',
    '#99badd',
    '#00BFFF',
    '#ADD8E6',
    '#4682B4',
    '#1dacd6',
    '#93ccea',
    '#bcd4e6',
    '#5d89ba',
    '#73c2fb',
    '#b0e0e6',
    '#4169E1',
    '#87CEEB',
    '#a2add0'
];

let counter = 0;

function mod(n, m) {
    return ((n % m) + m) % m;
}

const getColors = (indexValue = -1) => {
    const r = (indexValue === -1) ?
            mod(counter++, kellyColors.length)
                : mod(indexValue, kellyColors.length);
    return kellyColors[r];
};

export {
    getColors
};