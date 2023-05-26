export default class Polygon {
    constructor(points = [], color = '#ff0088') {
        this.points = points;
        this.lumen = 1;
        this.color = this.hexToRgb(color);
        this.center = new Point();
        this.distance = 0;
        this.normal = new Point();
        this.figureIndex = 0;
        this.radius = 1; // псевдо-радиус
    }
    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
        } : { r: 50, g: 50, b: 50 }
    }
    rgbToHex(r, g, b) {
        return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
    }
}