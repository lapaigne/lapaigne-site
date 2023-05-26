import { Point, Polygon, Edge } from "../entities";
import Figure from "./Figure";
export default class Toroid extends Figure {
    constructor({ minor = 3, major = 6, segments = 20, color = '#00ff66', center = new Point() }) {
        super({ center });

        for (let i = 0; i < segments; i++) {
            const theta = 2 * Math.PI * i / segments;
            for (let j = 0; j < segments; j++) {
                const phi = 2 * Math.PI * j / segments;
                this.points.push(new Point(
                    this.center.x + (major + minor * Math.cos(theta)) * Math.cos(phi),
                    this.center.y + minor * Math.sin(theta),
                    this.center.z + (major + minor * Math.cos(theta)) * Math.sin(phi),
                ));
            }
        }

        for (let i = 0; i < segments; i++) {
            for (let j = 0; j < segments; j++) {
                this.polygons.push(
                    new Polygon([
                        (i + 1) % segments * segments + j % segments,
                        (i + 1) % segments * segments + (j + 1) % segments,
                        i * segments + (j + 1) % segments,
                        i * segments + j % segments,
                    ], color
                    ));
            }
        }
        this.animations = [
            { method: 'rotateOY', value: -Math.PI / 1000, center: new Point() },
            { method: 'rotateOY', value: -Math.PI / 168, center: this.center },
            { method: 'rotateOX', value: Math.PI / 100, center: this.center },
        ]
    }

}