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
    // '#FFB300', // Vivid Yellow
    // '#803E75', // Strong Purple
    // '#FF6800', // Vivid Orange
    // '#C10020', // Vivid Red
    // '#CEA262', // Grayish Yellow
    // '#007D34', // Vivid Green
    // '#F6768E', // Strong Purplish Pink
    // '#00538A', // Strong Blue
    // '#FF7A5C', // Strong Yellowish Pink
    // '#53377A', // Strong Violet
    // '#FF8E00', // Vivid Orange Yellow
    // '#B32851', // Strong Purplish Red
    // '#F4C800', // Vivid Greenish Yellow
    // '#7F180D', // Strong Reddish Brown
    // '#93AA00', // Vivid Yellowish Green
    // '#593315', // Deep Yellowish Brown
    // '#F13A13', // Vivid Reddish Orange
    // '#232C16', // Dark Olive Green
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

function hashCode(str){
    var hash = 0;
    if (str.length === 0) return hash;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}

const getColorsByHash = (str) => getColors(hashCode(str));

// const parseColor = (color) => `#${color.toString(16).padStart(6, '0')}`;

export {
    getColorsByHash,
    getColors
};