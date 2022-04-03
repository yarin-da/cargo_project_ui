const assignedColors = {};

const kellyColors = [
    0xFFB300, // Vivid Yellow
    0x803E75, // Strong Purple
    0xFF6800, // Vivid Orange
    0xA6BDD7, // Very Light Blue
    0xC10020, // Vivid Red
    0xCEA262, // Grayish Yellow
    0x817066, // Medium Gray
    0x007D34, // Vivid Green
    0xF6768E, // Strong Purplish Pink
    0x00538A, // Strong Blue
    0xFF7A5C, // Strong Yellowish Pink
    0x53377A, // Strong Violet
    0xFF8E00, // Vivid Orange Yellow
    0xB32851, // Strong Purplish Red
    0xF4C800, // Vivid Greenish Yellow
    0x7F180D, // Strong Reddish Brown
    0x93AA00, // Vivid Yellowish Green
    0x593315, // Deep Yellowish Brown
    0xF13A13, // Vivid Reddish Orange
    0x232C16, // Dark Olive Green
];

function mod(n, m) {
    return ((n % m) + m) % m;
}

function hashCode(str){
    var hash = 0;
    if (str.length == 0) return hash;
    for (i = 0; i < str.length; i++) {
        char = str.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}

function addToColorMap(str, color) {
    const mapDiv = document.getElementById('color-map-div');
    const listItem = document.createElement('li');
    listItem.className = "color-item";
    listItem.innerHTML = `
        <div class="color-sample" style="background:#${color.toString(16)};"></div>
        <div class="color-type-name">${str}</div>
    `;
    mapDiv.appendChild(listItem);
}

function getColor(str) {
    if (!assignedColors[str]) {
        const hash = mod(hashCode(str), kellyColors.length);
        const color = kellyColors[hash];
        assignedColors[str] = color;
        addToColorMap(str, color);
    }
    return assignedColors[str];
}