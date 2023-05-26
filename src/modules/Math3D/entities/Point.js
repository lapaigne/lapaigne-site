export default class Point {
    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    makeFromArray(array) {
        this.x = array[0];
        this.y = array[1];
        this.z = array[2];
    }
    distance() {
        return Math.sqrt(
            this.x * this.x +
            this.y * this.y +
            this.z * this.z
        )
    }
}