import { Point, Polygon, Edge } from "../entities";
import Figure from "../entities/Figure";
export default class Cylinder extends Figure {
    constructor({ a = 4, b = 4, height = 16, segments = 50, color = '#aa88aa', center = new Point(0, 0, 0) }) {
        super({ center });
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < segments; j++) {
                const phi = 2 * Math.PI * j / segments;
                this.points.push(new Point(
                    this.center.x + a * Math.cos(phi),
                    this.center.y + height / 2 * Math.pow(-1, i),
                    this.center.z + b * Math.sin(phi)
                ));
            }
        }

        for (let i = 0; i < segments; i++) {
            this.polygons.push(new Polygon([
                i % segments,
                (i + 1) % segments,
                segments + (i + 1) % segments,
                segments + i % segments,
            ], color
            ));
        }
        //верхний полигон с правильным нормальным вектором
        const poly1 = [], poly2 = [];
        for (let i = segments - 1; i >= 0; i--) {
            poly1.push(i)
        }
        this.polygons.push(new Polygon(poly1, color));

        //нижний полигон с правильным нормальным вектором
        for (let i = 0; i < segments; i++) {
            poly2.push(segments + i);
        }
        this.polygons.push(new Polygon(poly2, color));

        this.polygons.forEach(polygon => {
            const length = polygon.points.length;
            for (let i = 0; i < length; i++) {

                // все ребра создаются так, чтобы индекс первой точки был меньше индекса второй 
                const [p1, p2] = (polygon.points[i % length] > polygon.points[(i + 1) % length]) ?
                    [polygon.points[(i + 1) % length], polygon.points[i % length]] :
                    [polygon.points[i % length], polygon.points[(i + 1) % length]];

                // исключает дубликаты, но усложняет генерацию и читаемость
                if (!this.edges.some(edge => edge.p1 === p1 && edge.p2 === p2)) {
                    this.edges.push(new Edge(p1, p2));
                }
            }
        });
    }


}