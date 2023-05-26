import { Point, Polygon, Edge } from "../entities";
import Figure from "./Figure";
export default class Cube extends Figure {
    constructor({ size = 4, center = new Point() }) {
        super({ center });
        this.points = [
            new Point(this.center.x + size, this.center.y + size, this.center.z + size),
            new Point(this.center.x - size, this.center.y + size, this.center.z + size),
            new Point(this.center.x - size, this.center.y - size, this.center.z + size),
            new Point(this.center.x + size, this.center.y - size, this.center.z + size),
            new Point(this.center.x + size, this.center.y + size, this.center.z - size),
            new Point(this.center.x - size, this.center.y + size, this.center.z - size),
            new Point(this.center.x - size, this.center.y - size, this.center.z - size),
            new Point(this.center.x + size, this.center.y - size, this.center.z - size)
        ];
        this.edges = [
            new Edge(0, 1),
            new Edge(0, 3),
            new Edge(0, 4),
            new Edge(1, 2),
            new Edge(1, 5),
            new Edge(2, 3),
            new Edge(2, 6),
            new Edge(3, 7),
            new Edge(4, 5),
            new Edge(4, 7),
            new Edge(5, 6),
            new Edge(6, 7)
        ];
        this.polygons = [
            new Polygon([0, 4, 5, 1], '#b71234'),
            new Polygon([1, 5, 6, 2], '#009b48'),
            new Polygon([7, 3, 2, 6], 'ff5800'),
            new Polygon([3, 7, 4, 0], '0246ad'),
            new Polygon([0, 1, 2, 3], 'ffd500'),
            new Polygon([4, 7, 6, 5], 'ffffff')
        ];
        this.animations = [
            { method: 'rotateOY', value: -Math.PI / 500, center: new Point() },
            { method: 'rotateOY', value: -Math.PI / 500, center: this.center }
        ]
    }
}