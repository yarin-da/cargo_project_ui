import { getJSONFromStorage, saveJSONinStorage } from "./util/Util";

const nextId = () => {
    const curr = parseInt(getJSONFromStorage('curr-id', 0));
    const newId = curr + 1;
    saveJSONinStorage('curr-id', newId);
    return newId;
};

export default class Package {
    constructor() {
        this.id = nextId();
        this.type = '';
        this.height = null;
        this.width = null;
        this.depth = null;
        this.weight = null;
        this.amount = null;
        this.priority = null;
        this.profit = null;
        this.canRotate = false;
        this.canStackAbove = false;
    }
}