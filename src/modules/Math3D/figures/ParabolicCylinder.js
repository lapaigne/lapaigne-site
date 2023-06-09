import { Point, Polygon, Edge, Figure } from "../entities";
export default class ParabolicCylinder extends Figure {
    constructor({ segments = 20, a = 2, b = 2, center = new Point(), color = '#d79196' }) {
        super({ center });
        this.disableOptimization = true;
        const dt = 2 * Math.PI / segments;
        for (let i = -Math.PI; i <= Math.PI; i += dt) {
            for (let j = -Math.PI; j < Math.PI; j += dt) {
                this.points.push(new Point(
                    this.center.x + b * Math.sinh(i),
                    this.center.y + a * Math.cosh(i),
                    this.center.z + j * 2,
                ));
            }
        }

        for (let i = 0; i < this.points.length; i++) {
            if (i + 1 < this.points.length && (i + 1) % segments !== 0) {
                this.edges.push(new Edge(
                    i,
                    i + 1
                ));
            } else if ((i + 1) % segments === 0) {
                this.edges.push(new Edge(
                    i,
                    i + 1 - segments
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
            if (i + 1 + segments < this.points.length && (i + 1) % segments !== 0) {
                this.polygons.push(new Polygon([i, i + 1, i + 1 + segments, i + segments], color));
            } else if (i + segments < this.points.length && (i + 1) % segments === 0) {
                this.polygons.push(new Polygon([i, i + 1 - segments, i + 1, i + segments], color));
            }
        }
    }
}