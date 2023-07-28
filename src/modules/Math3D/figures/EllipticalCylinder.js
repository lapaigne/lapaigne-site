import { Point, Polygon, Edge, Figure } from "../entities";
export default class EllipticalCylinder extends Figure {
    constructor({ count = 50, h = 12, a = 6, b = 4, center = new Point(), color = '#a491d7' }) {
        super({ center });
        this.disableOptimization = true;
        const dt = 2 * Math.PI / count;
        for (let t = -h / 2; t < h / 2; t++) {
            for (let i = 0; i <= Math.PI; i += 2 * dt + count) {
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

        const dc = 255 / h;

        for (let i = 0; i < h - 1; i++) {
            const currentColor = Polygon.prototype.rgbToHex(dc*i, 60, 80);
            for (let j = 0; j < count; j++) {
                this.polygons.push(
                    new Polygon([
                        (i + 1) % h * count + (j + 1) % count,
                        (i + 1) % h * count + j % count,
                        i * count + j % count,
                        i * count + (j + 1) % count,
                    ], currentColor)
                );
            }
        }
    }
}
