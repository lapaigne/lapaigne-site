export default class Light extends Point {
    constructor(x, y, z, lumen = 1e4) {
        super(x, y, z);
        this.lumen = lumen;
    }
}