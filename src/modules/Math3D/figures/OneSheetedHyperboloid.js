import { Point, Polygon, Edge, Figure } from "../entities";
export default class OneSheetedHyperboloid extends Figure {
    constructor({ segments = 20, a = 2, b = 2, c = 2, center = new Point(), color = '#91d794' }) {
        super({ center });
        this.disableOptimization = true;
        const dt = Math.PI * 2 / segments;
        for (let i = -Math.PI; i <= Math.PI; i += dt) {
            for (let j = 0; j < 2 * Math.PI; j += dt) {
                this.points.push(new Point(
                    this.center.x + a * Math.cosh(i) * Math.cos(j),
                    this.center.y + c * Math.sinh(i),
                    this.center.z + b * Math.cosh(i) * Math.sin(j)
                ));
            }
        }

        for (let i = 0; i < segments + 1; i++) {
            for (let j = 0; j < segments; j++) {
                this.edges.push(
                    new Edge(
                        i * segments + j % segments,
                        i * segments + (j + 1) % segments,
                    ));
                if (this.points[(i + 1) * segments + j % segments + 1]) {
                    this.edges.push(
                        new Edge(
                            i * segments + j % segments + 1,
                            (i + 1) * segments + j % segments + 1,
                        ));
                }
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