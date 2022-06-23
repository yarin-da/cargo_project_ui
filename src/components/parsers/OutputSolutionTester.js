import { t } from "i18next";

export default (solution) => {
    const rotate = (scale, rotation) => {
        const newScale = [...scale];
        rotation.forEach((r, i) => {
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
    }

    const { width, depth, height } = solution['container'];
    const space = (() => {
        const ret = new Array(width);
        for (let w = 0; w < width; w++) {
            ret[w] = new Array(depth);
            for (let d = 0; d < depth; d++) {
                ret[w][d] = new Array(height);
                for (let h = 0; h < height; h++) {
                    ret[w][d][h] = false;
                }
            }
        }
        return ret;
    })();

    const packageSize = {};

    for (let pkgIndex = 0; pkgIndex < solution['solution'].length; pkgIndex++) {
        const pkg = solution['solution'][pkgIndex];
        const pkgType = pkg['type'];
        if (!(pkgType in packageSize)) {
            const {width:w, depth:d, height:h} = solution['packages'].find(x => x['type'] === pkgType);
            packageSize[pkgType] = [w, d, h];
        }
        const { 'rotation-x':rx, 'rotation-y':ry, 'rotation-z':rz } = pkg;
        const rotation = [rx, ry, rz];
        const [w, d, h] = rotate(packageSize[pkgType], rotation);
        const { x, y, z } = pkg;

        if (x < 0 || y < 0 || z < 0 || x+w > width || y+d > depth || z+h > height) {
            return { error: t('packageOutOfBounds', { pkgType }) };
        }
        for (let i = x; i < x + w; i++) {
            for (let j = y; j < y + d; j++) {
                for (let k = z; k < z + h; k++) {
                    if (space[i][j][k]) {
                        return { error: t('packageCollision', { pkgType }) };
                    }
                    space[i][j][k] = true;
                }
            }
        }
    }

    return {};
};