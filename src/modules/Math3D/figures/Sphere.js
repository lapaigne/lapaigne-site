import { Point } from "../entities";
import Ellipsoid from "./Ellipsoid";
export default class Sphere extends Ellipsoid {
    constructor({ radius = 10, count = 30, color = '#aa5577', center = new Point() }) {
        super({ a: radius, b: radius, c: radius, count, color, center });

        this.animations = [
            { method: 'rotateOY', value: Math.PI / 2000, center: new Point() },
            { method: 'rotateOX', value: -Math.PI / 5000, center: this.center }
        ]
    }
}