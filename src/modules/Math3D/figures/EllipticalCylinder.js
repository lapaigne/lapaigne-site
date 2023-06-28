import { Point, Polygon, Edge, Figure } from "../entities";
export default class EllipticalCylinder extends Figure {
    constructor({ segments = 50, h = 12, a = 6, b = 4, center = new Point(), color = '#a491d7' }) {
        super({ center });
        this.disableOptimization = true;
        const dt = 2 * Math.PI / segments;
        for (let t = -h / 2; t < h / 2; t++) {
            for (let i = 0; i <= Math.PI; i += 2 * dt + segments) {
                for (let j = 0; j < 2 * Math.PI; j += dt) {
                    this.points.push(new Point(
                        this.center.x + a * Math.cos(i) * Math.cos(j),
                        this.center.y + b * Math.sin(j),
                        this.center.z + t
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

        const dc = 255 / h;

        for (let i = 0; i < h - 1; i++) {
            const currentColor = Polygon.prototype.rgbToHex(dc*i, 60, 80);
            for (let j = 0; j < segments; j++) {
                this.polygons.push(
                    new Polygon([
                        (i + 1) % h * segments + (j + 1) % segments,
                        (i + 1) % h * segments + j % segments,
                        i * segments + j % segments,
                        i * segments + (j + 1) % segments,
                    ], currentColor)
                );
            }
        }
    }
}
