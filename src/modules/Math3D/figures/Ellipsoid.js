import { Point, Polygon, Edge, Figure } from "../entities";
export default class Ellipsoid extends Figure {
    constructor({ a = 10, b = 8, c = 12, count = 25, color = '#ff9966', center = new Point() }) {
        super({ center });

        this.points = [new Point(this.center.x, this.center.y + b, this.center.z)];
        for (let i = 0; i < count; i++) {
            const theta = Math.PI * (i + 1) / (count + 1);
            for (let j = 0; j < count; j++) {
                const phi = 2 * Math.PI * j / count;
                this.points.push(new Point(
                    this.center.x + a * Math.sin(theta) * Math.cos(phi),
                    this.center.y + b * Math.cos(theta),
                    this.center.z + c * Math.sin(theta) * Math.sin(phi),
                ));
            }
        }
        this.points.push(new Point(this.center.x, this.center.y - b, this.center.z));

        for (let i = 1; i < count + 1; i++) {
            this.polygons.push(
                new Polygon([
                    (i + 1) % count + 1,
                    i % count + 1,
                    0],
                    color
                ));
            this.polygons.push(
                new Polygon([
                    this.points.length - ((i + 1) % count + 1) - 1,
                    this.points.length - (i % count + 1) - 1,
                    this.points.length - 1],
                    color
                ));
        }
        for (let i = 0; i < count - 1; i++) {
            for (let j = 1; j < count + 1; j++) { 
                this.polygons.push(
                    new Polygon([
                        i * count + j % count + 1,
                        i * count + (j + 1) % count + 1,
                        (i + 1) * count + (j + 1) % count + 1,
                        (i + 1) * count + j % count + 1],
                        color
                    ));
            }
        }

        for (let i = 0; i < count; i++) {
            this.edges.push(
                new Edge(
                    0,
                    i + 1
                ));
            this.edges.push(
                new Edge(
                    this.points.length - 1,
                    this.points.length - count + i - 1
                ));
        }

        for (let i = 0; i < count; i++) {
            for (let j = 0; j < count; j++) {
                this.edges.push(
                    new Edge(
                        i * count + j % count + 1,
                        i * count + (j + 1) % count + 1,
                    ));
                if (i + 1 !== count) {
                    this.edges.push(
                        new Edge(
                            i * count + j % count + 1,
                            (i + 1) * count + j % count + 1,
                        ));
                }
            }
        }
    }
}