import { Point, Polygon, Edge } from "../entities";
import Figure from "../entities/Figure";
export default class Cone extends Figure {
    constructor({ a = 4, c = 4, b = 4, segments = 20, color = '#3366ff', center = new Point(0, 0, 0) }) {
        super({ center });

        for (let i = 0; i < segments; i++) {
            const phi = 2 * Math.PI * i / segments;
            this.points.push(new Point(
                this.center.x + a * Math.cos(phi),
                this.center.y + -b,
                this.center.z + c * Math.sin(phi)
            ));
        }
        this.points.push(new Point(this.center.x, this.center.y + b, this.center.z));

        for (let i = 0; i < segments; i++) {
            this.polygons.push(new Polygon([
                i % segments,
                this.points.length - 1,
                (i + 1) % segments
            ],
                color));
        }
        const poly = [];
        for (let i = 0; i < segments; i++) {
            poly.push(i);
        }
        this.polygons.push(new Polygon(poly, color));
    }
}