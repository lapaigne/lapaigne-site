import { Point, Polygon, Edge, Figure } from "../entities";
export default class HyperbolicParaboloid extends Figure {
    constructor({ segments = 20, a = 3, b = 2, center = new Point(), color = '#d7d291' }) {
        super({ center });
        this.disableOptimization = true;
        for (let x = -5; x < 5; x++) {
            for (let y = -5; y < 5; y++) {
                this.points.push(new Point(
                    this.center.x + x,
                    this.center.y + y,
                    this.center.z + x * x / (a * a) - y * y / (b * b)
                ));
            }
        }
        for (let i = 0; i < this.points.length; i++) {
            if (i + 1 < this.points.length && (i + 1) % segments !== 0) {
                this.edges.push(new Edge(
                    i,
                    i + 1
                ));
            }
            if (i < this.points.length - segments) {
                this.edges.push(new Edge(
                    i,
                    i + segments
                ));
            }
        }
        for (let i = 0; i < this.points.length; i++) {
            if (i % 2 === 0) {
                if (i + 1 + segments < this.points.length && (i + 1) % segments !== 0) {
                    this.polygons.push(new Polygon([i, i + 1, i + 1 + segments, i + segments], color));
                }
            } else if (i + 1 + segments < this.points.length && (i + 1) % segments !== 0) {
                this.polygons.push(new Polygon([i, i + 1, i + 1 + segments, i + segments], color));
            }
        }
    }
}