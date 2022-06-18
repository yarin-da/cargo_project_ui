import nextId from "react-id-generator";

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