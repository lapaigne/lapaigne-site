class LegoBrick extends Figure {
    constructor({ a = 3, b = a, height = 2, segments = 10, color = '#aa7f2e', center = new Point() }) {
        super({ center });


        const width = 9;
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < segments; j++) {
                const phi = 2 * Math.PI * j / segments;
                this.points.push(new Point(
                    a * Math.cos(phi) + width / 2,
                    height / 2 * Math.pow(-1, i) + width + height / 2,
                    b * Math.sin(phi) + width * 1.5
                ));
            }
        }

        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < segments; j++) {
                const phi = 2 * Math.PI * j / segments;
                this.points.push(new Point(
                    a * Math.cos(phi) + width / 2,
                    height / 2 * Math.pow(-1, i) + width + height / 2,
                    b * Math.sin(phi) + width / 2
                ));
            }
        }
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < segments; j++) {
                const phi = 2 * Math.PI * j / segments;
                this.points.push(new Point(
                    a * Math.cos(phi) + width / 2,
                    height / 2 * Math.pow(-1, i) + width + height / 2,
                    b * Math.sin(phi) - width / 2
                ));
            }
        }
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < segments; j++) {
                const phi = 2 * Math.PI * j / segments;
                this.points.push(new Point(
                    a * Math.cos(phi) + width / 2,
                    height / 2 * Math.pow(-1, i) + width + height / 2,
                    b * Math.sin(phi) - width * 1.5
                ));
            }
        }
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < segments; j++) {
                const phi = 2 * Math.PI * j / segments;
                this.points.push(new Point(
                    a * Math.cos(phi) - width / 2,
                    height / 2 * Math.pow(-1, i) + width + height / 2,
                    b * Math.sin(phi) + width * 1.5
                ));
            }
        }
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < segments; j++) {
                const phi = 2 * Math.PI * j / segments;
                this.points.push(new Point(
                    a * Math.cos(phi) - width / 2,
                    height / 2 * Math.pow(-1, i) + width + height / 2,
                    b * Math.sin(phi) + width / 2
                ));
            }
        }
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < segments; j++) {
                const phi = 2 * Math.PI * j / segments;
                this.points.push(new Point(
                    a * Math.cos(phi) - width / 2,
                    height / 2 * Math.pow(-1, i) + width + height / 2,
                    b * Math.sin(phi) - width / 2
                ));
            }
        }
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < segments; j++) {
                const phi = 2 * Math.PI * j / segments;
                this.points.push(new Point(
                    a * Math.cos(phi) - width / 2,
                    height / 2 * Math.pow(-1, i) + width + height / 2,
                    b * Math.sin(phi) - width * 1.5
                ));
            }
        }

        for (let j = 0; j < 8; j++) {
            const s = segments * j;
            for (let i = segments * j; i < segments * (j + 1); i++) {
                this.polygons.push(new Polygon([
                    2 * s + i % segments,
                    2 * s + (i + 1) % segments,
                    2 * s + segments + (i + 1) % segments,
                    2 * s + segments + i % segments,
                ], color
                ));
            }
        }

        for (let j = 0; j < 8; j++) {
            const poly1 = [];
            for (let i = (2 * segments * j) + segments - 1; i >= 2 * segments * j; i--) {
                poly1.push(i)
            }
            this.polygons.push(new Polygon(poly1, color));
        }

        /*  z>>
        x   4   13  8   6   2
        v   15  11  9   10  14
        v   3   12  7   5   1
        */
        const brickpts = [
            new Point(width, width, 2 * width), //1            
            new Point(-width, width, 2 * width),
            new Point(width, width, -2 * width),
            new Point(-width, width, -2 * width),

            new Point(width, width, width), //5
            new Point(-width, width, width),
            new Point(width, width, 0), //7
            new Point(-width, width, 0),

            new Point(0, width, 0), //9
            new Point(0, width, width),
            new Point(0, width, -width), //11

            new Point(width, width, -width), //12
            new Point(-width, width, -width),

            new Point(0, width, 2 * width), //14
            new Point(0, width, -2 * width),

            new Point(width, 0, 2 * width), //16
            new Point(-width, 0, 2 * width),
            new Point(width, 0, -2 * width),
            new Point(-width, 0, -2 * width), //19
        ]
        this.points = this.points.concat(brickpts)

        const shift = 16 * segments - 1;
        const brickpolies = [
            new Polygon([
                shift + 4,
                shift + 13,
                shift + 11,
                shift + 15
            ], color),
            new Polygon([
                shift + 13,
                shift + 8,
                shift + 9,
                shift + 11
            ], color),
            new Polygon([
                shift + 8,
                shift + 6,
                shift + 10,
                shift + 9
            ], color),
            new Polygon([
                shift + 6,
                shift + 2,
                shift + 14,
                shift + 10
            ], color),
            new Polygon([
                shift + 15,
                shift + 11,
                shift + 12,
                shift + 3
            ], color),
            new Polygon([
                shift + 11,
                shift + 9,
                shift + 7,
                shift + 12,
            ], color),
            new Polygon([
                shift + 9,
                shift + 10,
                shift + 5,
                shift + 7
            ], color),
            new Polygon([
                shift + 10,
                shift + 14,
                shift + 1,
                shift + 5
            ], color),
            new Polygon([
                shift + 3,
                shift + 1,
                shift + 16,
                shift + 18
            ], color),
            new Polygon([
                shift + 2,
                shift + 4,
                shift + 19,
                shift + 17
            ], color),
            new Polygon([
                shift + 4,
                shift + 3,
                shift + 18,
                shift + 19
            ], color),
            new Polygon([
                shift + 1,
                shift + 2,
                shift + 17,
                shift + 16
            ], color),
            new Polygon([
                shift + 18,
                shift + 16,
                shift + 17,
                shift + 19,
            ], color),
        ];

        this.polygons = this.polygons.concat(brickpolies);
    }
}
