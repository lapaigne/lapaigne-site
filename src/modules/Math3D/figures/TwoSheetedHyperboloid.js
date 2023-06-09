import { Point, Polygon, Edge, Figure } from "../entities";
export default class TwoSheetedHyperboloid extends Figure {
    constructor({ segments = 20, a = 2, b = 2, c = 4, center = new Point(), color }) {
        super({ center });
        this.disableOptimization = true;
        const dt = Math.PI * 2 / segments;
        for (let i = 0; i <= Math.PI; i += dt) {
            for (let j = 0; j < 2 * Math.PI; j += dt) {
                this.points.push(new Point(
                    this.center.x + a * Math.sinh(i) * Math.cos(j),
                    this.center.y + c * Math.cosh(i),
                    this.center.z + b * Math.cosh(i) * Math.sin(j)
                ));
            }
        }

        for (let i = 0; i <= Math.PI; i += dt) {
            for (let j = 0; j < 2 * Math.PI; j += dt) {
                this.points.push(new Point(
                    this.center.x - a * Math.sinh(i) * Math.cos(j),
                    this.center.y - c * Math.cosh(i),
                    this.center.z - b * Math.cosh(i) * Math.sin(j)
                ));
            }
        }

        for (let i = 0; i < this.points.length; i++) {
            if (i + 1 < this.points.length && (i + 1) % segments !== 0) {
                this.edges.push(new Edge(
                    i,
                    i + 1
                ));
            } else if (i + 1 >= segments && (i + 1) % segments === 0) {
                this.edges.push(new Edge(
                    i,
                    i + 1 - segments
                ));
            }
        }

        for (let i = 0; i < this.points.length / 2 - segments; i++) {
            if (i + 1 + segments < this.points.length && (i + 1) % segments !== 0) {
                this.polygons.push(
                    new Polygon(
                        [i, i + 1, i + 1 + segments, i + segments],
                        color
                    ));
            } else if (i + segments < this.points.length && (i + 1) % segments === 0) {
                this.polygons.push(
                    new Polygon(
                        [i, i + 1 - segments, i + 1, i + segments],
                        color
                    ));
            }
        }
        for (let i = this.points.length / 2; i < this.points.length; i++) {
            if (i + 1 + segments < this.points.length && (i + 1) % segments !== 0) {
                this.polygons.push(
                    new Polygon(
                        [i, i + 1, i + 1 + segments, i + segments],
                        color
                    ));
            } else if (i + segments < this.points.length && (i + 1) % segments === 0) {
                this.polygons.push(
                    new Polygon(
                        [i, i + 1 - segments, i + 1, i + segments],
                        color
                    ));
            }
        }
    }
}