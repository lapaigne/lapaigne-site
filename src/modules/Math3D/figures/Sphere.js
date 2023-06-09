import { Point, Polygon, Edge } from "../entities";
import Ellipsoid from "./Ellipsoid";
export default class Sphere extends Ellipsoid {
    constructor({ radius = 10, segments = 10, color = '#aa5577', center = new Point() }) {
        super({ a: radius, b: radius, c: radius, segments, color, center });
        
        this.animations = [
            { method: 'rotateOY', value: Math.PI / 2000, center: new Point() },
            { method: 'rotateOY', value: -Math.PI / 5000, center: this.center }
        ]
    }
}