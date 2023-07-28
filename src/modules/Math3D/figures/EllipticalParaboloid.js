import { Point, Polygon, Edge, Figure } from "../entities";
export default class EllipticalParaboloid extends Figure {
    constructor({ count = 20, a = 7, b = 4, center = new Point(), color = '#91cbd7' }) {
        super({ center });
        this.disableOptimization = true;
        const dt = Math.PI * 2 / count;
        for (let i = 0; i <= Math.PI; i += dt) {
            for (let j = 0; j < 2 * Math.PI; j += dt) {
                this.points.push(new Point(
                    this.center.x + a * i * Math.cos(j),
                    this.center.y + i * i,
                    this.center.z + b * i * Math.sin(j)
                ));
            }
        }

        for (let i = 0; i < this.points.length; i++) {
            if (i + 1 < this.points.length && (i + 1) % count !== 0) {
                this.edges.push(new Edge(
                    i,
                    i + 1
                ));
            } else if ((i + 1) % count === 0) {
                this.edges.push(new Edge(
                    i,
                    i + 1 - count
                ));
            }
            if (i < this.points.length - count) {
                this.edges.push(new Edge(
                    i,
                    i + count
                ));
            }
        }
        for (let i = 0; i < this.points.length; i++) {
            if (i + 1 + count < this.points.length && (i + 1) % count !== 0) {
                this.polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color));
            } else if (i + count < this.points.length && (i + 1) % count === 0) {
                this.polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], color));
            }
        }
    }
}