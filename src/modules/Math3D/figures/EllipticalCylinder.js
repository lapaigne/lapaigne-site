import { Point, Polygon, Edge, Figure } from "../entities";
export default class EllipticalCylinder extends Figure {
    constructor({ segments = 20, h = 15, a = 6, b = 10, center = new Point(), color = '#a491d7' }) {
        super({ center });
        this.disableOptimization = true;
        const dt = 2 * Math.PI / segments;
        for (let p = 0; p < h; p = p + 2) {
            for (let i = 0; i <= Math.PI; i += 2 * dt + segments) {
                for (let j = 0; j < 2 * Math.PI; j += dt) {
                    this.points.push(new Point(
                        this.center.x + a * Math.cos(i) * Math.cos(j),
                        this.center.y + b * Math.sin(j),
                        this.center.z + p
                    ));
                }
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