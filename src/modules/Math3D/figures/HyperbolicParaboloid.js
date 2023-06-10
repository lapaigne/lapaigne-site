import { Point, Polygon, Edge, Figure } from "../entities";
export default class HyperbolicParaboloid extends Figure {
    constructor({ segments = 25, a = 2, b = 2, center = new Point(), width = 10, color = '#d7d291' }) {
        super({ center });
        this.disableOptimization = true;
        const dt = width / segments;
        for (let i = -width / 2; i < width / 2; i += dt) {
            for (let j = -width / 2; j < width / 2; j += dt) {
                this.points.push(new Point(
                    this.center.x + i,
                    this.center.y + j,
                    this.center.z + i * i / (a * a) - j * j / (b * b)
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