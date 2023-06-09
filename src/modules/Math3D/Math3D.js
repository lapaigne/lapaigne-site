import { Vector } from "./entities";
export default class Math3D {
    constructor({ WIN }) {
        this.WIN = WIN;
    }

    xs(point) {
        const zs = this.WIN.FOCUS.z;
        const z0 = this.WIN.CAMERA.z;
        const x0 = this.WIN.CAMERA.x;
        return (point.x - x0) / (point.z - z0) * (zs - z0) + x0;
    }

    ys(point) {
        const zs = this.WIN.FOCUS.z;
        const z0 = this.WIN.CAMERA.z;
        const y0 = this.WIN.CAMERA.y;
        return (point.y - y0) / (point.z - z0) * (zs - z0) + y0;
    }

    mult(matrix, pointArray) {
        const c = [0, 0, 0, 0];
        for (let i = 0; i < 4; i++) {
            let s = 0;
            for (let j = 0; j < 4; j++) {
                s += matrix[j][i] * pointArray[j];
            }
            c[i] = s;
        }
        return c;
    }

    zoom(delta) {
        return [
            [delta, 0, 0, 0],
            [0, delta, 0, 0],
            [0, 0, delta, 0],
            [0, 0, 0, 1]];
    }

    rotateOY(alpha) {
        return [
            [Math.cos(alpha), 0, -Math.sin(alpha), 0],
            [0, 1, 0, 0],
            [Math.sin(alpha), 0, Math.cos(alpha), 0],
            [0, 0, 0, 1]];
    }

    rotateOX(alpha) {
        return [
            [1, 0, 0, 0],
            [0, Math.cos(alpha), Math.sin(alpha), 0],
            [0, -Math.sin(alpha), Math.cos(alpha), 0],
            [0, 0, 0, 1]];
    }

    rotateOZ(alpha) {
        return [
            [Math.cos(alpha), Math.sin(alpha), 0, 0],
            [-Math.sin(alpha), Math.cos(alpha), 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]];
    }

    move({ dx = 0, dy = 0, dz = 0 }) {
        return [
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [dx, dy, dz, 1]];
    }

    transform(matrix, point) {
        const result = this.mult(matrix, [point.x, point.y, point.z, 1]);
        point.makeFromArray(result);
    }

    multMatrix(a, b) {
        const length = 4;
        const matrix = [];
        for (let i = 0; i < length; i++) {
            matrix.push([]);
            for (let j = 0; j < length; j++) {
                let s = 0;
                for (let k = 0; k < length; k++) {
                    s += a[k][j] * b[i][k]
                }
                matrix[i][j] = s;
            }
        }
        return matrix;
    }

    getTransformMatrix(...params) {
        return params.reduce((a, b) => this.multMatrix(a, b), [
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1],
        ]);
    }

    calcCenters(figure) {
        figure.polygons.forEach(polygon => {
            const points = polygon.points;
            let x = 0, y = 0, z = 0;
            for (let i = 0; i < points.length; i++) {
                x += figure.points[points[i]].x;
                y += figure.points[points[i]].y;
                z += figure.points[points[i]].z;
            }
            polygon.center.x = x / points.length;
            polygon.center.y = y / points.length;
            polygon.center.z = z / points.length;
        });
    }

    calcDistance(figure, endPoint, name) {
        figure.polygons.forEach(polygon => {
            polygon[name] = Math.sqrt(
                Math.pow(endPoint.x - polygon.center.x, 2) +
                Math.pow(endPoint.y - polygon.center.y, 2) +
                Math.pow(endPoint.z - polygon.center.z, 2));
        });
    }

    calcNormals(figure) {
        figure.polygons.forEach(polygon => {
            const a = this.calcVector(figure.points[polygon.points[1]], polygon.center)
            const b = this.calcVector(figure.points[polygon.points[0]], polygon.center)
            polygon.normal = this.calcVectorProd(a, b)
        });
    }

    calcVectorProd(a, b) {
        return new Vector({
            x: a.y * b.z - a.z * b.y,
            y: -b.z * a.x + b.x * a.z,
            z: a.x * b.y - a.y * b.x
        })
    }

    calcDotProduct(a, b) {
        return a.x * b.x + a.y * b.y + a.z * b.z;
    }

    calcVector(a, b) {
        return new Vector({
            x: b.x - a.x,
            y: b.y - a.y,
            z: b.z - a.z
        });
    }

    calcVectorLength(a) {
        return Math.sqrt(this.calcDotProduct(a, a));
    }

    calcRadius(figure) {
        const points = figure.points;
        figure.polygons.forEach(polygon => {
            const center = polygon.center;
            const pts = [];
            let radius = 0;
            polygon.points.forEach(point => pts.push(points[point]));
            pts.forEach(point => radius += this.calcVectorLength(this.calcVector(center, point)));
            polygon.radius = radius / pts.length;
        });
    }

    calcShadow(polygon, figures, LIGHT) {
        const m1 = polygon.center;
        const radius = polygon.radius;
        const s = this.calcVector(m1, LIGHT);
        for (let i = 0; i < figures.length; i++) {
            if (polygon.figureIndex === i) {
                continue;
            }
            for (let j = 0; j < figures[i].polygons.length; j++) {
                const polygon2 = figures[i].polygons[j];
                const m0 = polygon2.center;
                if (polygon.lumen < polygon2.lumen) {
                    continue;
                }
                const dark = this.calcVectorLength(
                    this.calcVectorProd(this.calcVector(m1, m0), s)
                ) / this.calcVectorLength(s);
                if (dark < radius) {
                    return dark / 1.3;
                }
            }
        }
        return 1;
    }

    calcIllumination(distance, lumen) {
        const res = distance ? lumen / Math.pow(distance, 3) : 1;
        return res > 1 ? 1 : res;
    }

    sortByArtistAlgorithm(polygons) {
        polygons.sort((a, b) => b.distance - a.distance);
    }
}