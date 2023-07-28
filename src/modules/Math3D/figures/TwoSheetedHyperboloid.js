import { Point, Polygon, Edge, Figure } from "../entities";
export default class TwoSheetedHyperboloid extends Figure {
    constructor({ count = 20, a = 2, b = 2, c = 4, center = new Point(), color }) {
        super({ center });
        this.disableOptimization = true;
        const dt = Math.PI * 2 / count;
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

        for (let i = 0; i < 1 + count / 2; i++) {
            for (let j = 0; j < count; j++) {
                this.edges.push(
                    new Edge(
                        i * count + j % count,
                        i * count + (j + 1) % count,
                    ));

                if (i < count / 2 && ((i + 1) * count + j % count + 1) < this.points.length / 2) {
                    this.edges.push(
                        new Edge(
                            i * count + j % count + 1,
                            (i + 1) * count + j % count + 1,
                        ));
                }
            }
        }

        for (let i = 1 + count / 2; i < 2 + count; i++) {
            for (let j = 0; j < count; j++) {
                this.edges.push(
                    new Edge(
                        i * count + j % count,
                        i * count + (j + 1) % count,
                    ));

                if (this.points[(i + 1) * count + j % count + 1]) {
                    this.edges.push(
                        new Edge(
                            i * count + j % count + 1,
                            (i + 1) * count + j % count + 1,
                        ));
                }
            }
        }

        for (let i = 0; i < this.points.length / 2 - count; i++) {
            if (i + 1 + count < this.points.length && (i + 1) % count !== 0) {
                this.polygons.push(
                    new Polygon(
                        [i, i + 1, i + 1 + count, i + count],
                        color
                    ));
            } else if (i + count < this.points.length && (i + 1) % count === 0) {
                this.polygons.push(
                    new Polygon(
                        [i, i + 1 - count, i + 1, i + count],
                        color
                    ));
            }
        }
        for (let i = this.points.length / 2; i < this.points.length; i++) {
            if (i + 1 + count < this.points.length && (i + 1) % count !== 0) {
                this.polygons.push(
                    new Polygon(
                        [i, i + 1, i + 1 + count, i + count],
                        color
                    ));
            } else if (i + count < this.points.length && (i + 1) % count === 0) {
                this.polygons.push(
                    new Polygon(
                        [i, i + 1 - count, i + 1, i + count],
                        color
                    ));
            }
        }
    }
}