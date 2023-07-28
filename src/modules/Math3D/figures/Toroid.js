import { Point, Polygon, Edge, Figure } from "../entities";
export default class Toroid extends Figure {
    constructor({ minor = 6, major = 12, count = 20, color = '#00ff66', center = new Point() }) {
        super({ center });

        for (let i = 0; i < count; i++) {
            const theta = 2 * Math.PI * i / count;
            for (let j = 0; j < count; j++) {
                const phi = 2 * Math.PI * j / count;
                this.points.push(new Point(
                    this.center.x + (major + minor * Math.cos(theta)) * Math.cos(phi),
                    this.center.y + minor * Math.sin(theta),
                    this.center.z + (major + minor * Math.cos(theta)) * Math.sin(phi),
                ));
            }
        }

        for (let i = 0; i < count; i++) {
            for (let j = 0; j < count; j++) {
                this.polygons.push(
                    new Polygon([
                        (i + 1) % count * count + j % count,
                        (i + 1) % count * count + (j + 1) % count,
                        i * count + (j + 1) % count,
                        i * count + j % count,
                    ], color
                    ));
            }
        }

        for (let i = 0; i < count; i++) {
            for (let j = 0; j < count; j++) {
                this.edges.push(
                    new Edge(
                        i * count + j % count,
                        i * count + (j + 1) % count,
                    ));
                this.edges.push(
                    new Edge(
                        (i + 1) % count * count + j % count,
                        i * count + j % count,
                    ));
            }
        }
    }
}