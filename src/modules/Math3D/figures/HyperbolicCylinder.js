import { Point, Polygon, Edge, Figure } from "../entities";
export default class HyperbolicCylinder extends Figure {
    constructor({ count = 10, a = 1, b = 1, center = new Point(), color = '#7ab1df' }) {
        super({ center });
        this.disableOptimization = true;
        const dt = 2 * Math.PI / count;
        for (let i = -Math.PI; i <= Math.PI; i += dt) {
            for (let j = -Math.PI; j < Math.PI; j += dt) {
                this.points.push(new Point(
                    this.center.x + a * Math.sinh(i),
                    this.center.y + b * Math.cosh(i),
                    this.center.z + j * 2,
                ));
            }
        }
        for (let i = -Math.PI; i <= Math.PI; i += dt) {
            for (let j = -Math.PI; j < Math.PI; j += dt) {
                this.points.push(new Point(
                    this.center.x - a * Math.sinh(i),
                    this.center.y - b * Math.cosh(i),
                    this.center.z + j * 2));
            }
        }


        for (let i = 0; i < this.points.length / 2; i++) {
            if (i + 1 < this.points.length && (i + 1) % count !== 0) {
                this.edges.push(new Edge(
                    i,
                    i + 1
                ));
            }
            else if ((i + 1) % count === 0) {
                this.edges.push(new Edge(
                    i,
                    i + 1 - count
                ));
            }
            if (i < this.points.length / 2 - count) {
                this.edges.push(new Edge(
                    i,
                    i + count
                ));
            }
        }
        for (let i = this.points.length / 2; i < this.points.length; i++) {
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
        for (let i = 0; i < this.points.length / 2 - count; i++) {
            if (i + 1 + count < this.points.length && (i + 1) % count !== 0) {
                this.polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color));
            } else if (i + count < this.points.length && (i + 1) % count === 0) {
                this.polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], color));
            }
        }
        for (let i = this.points.length / 2 + count / 2; i < this.points.length; i++) {
            if (i + 1 + count < this.points.length && (i + 1) % count !== 0) {
                this.polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color));
            } else if (i + count < this.points.length && (i + 1) % count === 0) {
                this.polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], color));
            }
        }
    }
}