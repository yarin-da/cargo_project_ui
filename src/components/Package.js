import nextId from "react-id-generator";

export default class Package {
    constructor() {
        this.id = nextId();
        this.type = '';
        this.height = 0;
        this.width = 0;
        this.depth = 0;
        this.weight = 0;
        this.amount = 0;
        this.priority = 0;
        this.profit = 0;
        this.canRotate = false;
        this.canStackAbove = false;
    }
}