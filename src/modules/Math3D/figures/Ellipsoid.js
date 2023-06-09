import { Point, Polygon, Edge, Figure } from "../entities";
export default class Ellipsoid extends Figure {
    constructor({ a = 10, b = 8, c = 12, segments = 25, color = '#ff9966', center = new Point() }) {
        super({ center });

        // генерация точек
        this.points = [new Point(this.center.x, this.center.y + b, this.center.z)];
        for (let i = 0; i < segments; i++) {
            const theta = Math.PI * (i + 1) / (segments + 1);
            for (let j = 0; j < segments; j++) {
                const phi = 2 * Math.PI * j / segments;
                this.points.push(new Point(
                    this.center.x + a * Math.sin(theta) * Math.cos(phi),
                    this.center.y + b * Math.cos(theta),
                    this.center.z + c * Math.sin(theta) * Math.sin(phi),
                ));
            }
        }
        this.points.push(new Point(this.center.x, this.center.y - b, this.center.z));

        // генерация полигонов
        for (let i = 1; i < segments + 1; i++) { // проход по всем точкам при полюсах в одном цикле
            //верхние полигоны (северный полюс)
            this.polygons.push(
                new Polygon([
                    (i + 1) % segments + 1,
                    i % segments + 1,
                    0], color
                ));

            //нижние полигоны (южный полюс)
            this.polygons.push(
                new Polygon([
                    this.points.length - ((i + 1) % segments + 1) - 1,
                    this.points.length - (i % segments + 1) - 1,
                    this.points.length - 1],
                    color
                ));
        }

        // остальные полигоны
        for (let i = 0; i < segments - 1; i++) {
            for (let j = 1; j < segments + 1; j++) { // смещение на 1 из-за "северного полюса"
                this.polygons.push(
                    new Polygon([
                        i * segments + j % segments + 1,
                        i * segments + (j + 1) % segments + 1,
                        (i + 1) * segments + (j + 1) % segments + 1,
                        (i + 1) * segments + j % segments + 1],
                        color
                    ));
            }
        }

    }
}