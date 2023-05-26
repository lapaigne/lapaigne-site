import { Point, Polygon, Edge } from "../entities";
export default class Figure {
    constructor({ points = [], edges = [], polygons = [], center = new Point(), color = '#e8649b' }) {
        this.points = points;
        this.edges = edges;
        this.polygons = polygons;
        this.color = color;
        this.center = center;
        this.animations = [];
    }
    dropAnimation() {
        this.animations = [];
    }
    setAnimation(method, value, center) {
        this.animations.push({
            method,
            value,
            center: center ? center : this.center
        });
    }
    updateAnimation() {

    }
    doAnimation(math3D) {
        this.animations.forEach(anim => {
            const t1 = math3D.move({
                dx: -anim.center.x,
                dy: -anim.center.y,
                dz: -anim.center.z,
            });
            
            const t2 = math3D[anim.method](anim.value);

            const t3 = math3D.move({
                dx: anim.center.x,
                dy: anim.center.y,
                dz: anim.center.z,
            });
            // const matrix = math3D.getTransformMatrix(t1, t2, t3);
            // math3D.transform(matrix, point)

            this.points.forEach(point => {
                math3D.transform(t1, point);
                math3D.transform(t2, point);
                math3D.transform(t3, point);
            });

            math3D.transform(t1, this.center);
            math3D.transform(t2, this.center);
            math3D.transform(t3, this.center);
            
            // math3D.transform(matrix, this.center); не будет работать из-за перемножения матриц переноса
            // при перемножении смещение сводится к нулю, применяется вторая матрица, смещающая центр фигуры
            // из-за этого фигура сдвигается и начинается хаос
        });
    }
}