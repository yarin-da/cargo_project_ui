import { mod } from "../util/Util";

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

const getColors = () => {
    // increase counter each time, but make sure it's in the bounds of the array
    const r = mod(counter++, kellyColors.length);
    return kellyColors[r];
};

export {
    getColors
};