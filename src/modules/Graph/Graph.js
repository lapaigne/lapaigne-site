export default class Graph {
    constructor({ id, width = 500, height = 500, WIN, callbacks }) {
        this.canvas = document.getElementById(id);
        this.canvasV = document.createElement('canvas');
        this.ctxV = this.canvasV.getContext('2d', { alpha: false });
        this.ctx = this.canvas.getContext('2d', { alpha: false });

        this.canvas.width = width;
        this.canvas.height = height;

        this.canvasV.width = width;
        this.canvasV.height = height;

        this.WIN = WIN;
        const { wheel, mouseup, mousedown, mousemove, mouseleave } = callbacks;

        this.canvas.addEventListener('wheel', wheel);
        this.canvas.addEventListener('mousedown', mousedown);
        this.canvas.addEventListener('mouseup', mouseup);
        this.canvas.addEventListener('mousemove', mousemove);
        this.canvas.addEventListener('mouseleave', mouseleave);
    }
    xs(x) { return (x - this.WIN.LEFT) * this.canvas.width / this.WIN.WIDTH }
    ys(y) { return (this.WIN.HEIGHT + this.WIN.BOTTOM - y) * this.canvas.height / this.WIN.HEIGHT; }

    sx(x) { return x * this.WIN.WIDTH / this.canvas.width; }
    sy(y) { return -y * this.WIN.HEIGHT / this.canvas.height; }

    render() {
        this.ctx.drawImage(this.canvasV, 0, 0);
    }
    clear() {
        this.ctxV.fillStyle = '#000';
        this.ctxV.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    line(x1, y1, x2, y2, color = '#000', width = 3, isDashed = false) {
        this.ctxV.beginPath();
        this.ctxV.lineWidth = width;
        if (isDashed) {
            this.ctxV.setLineDash([10, 10]);
        } else {
            this.ctxV.setLineDash([]);
        }
        this.ctxV.strokeStyle = color;
        this.ctxV.moveTo(this.xs(x1), this.ys(y1));
        this.ctxV.lineTo(this.xs(x2), this.ys(y2));
        this.ctxV.stroke();
        this.ctxV.closePath();
        this.ctxV.setLineDash([]);
    }
    point(x, y, color = '#1a2b3c', size = 1.5) {
        this.ctxV.beginPath();
        this.ctxV.strokeStyle = color;
        this.ctxV.fillStyle = color;
        this.ctxV.arc(this.xs(x), this.ys(y), size, 0, 2 * Math.PI);
        this.ctxV.fill();
        this.ctxV.stroke();
        this.ctxV.closePath();
    }
    text(x, y, text, color = "lime", font = "24px sans-serif", align = "left") {
        this.ctxV.font = font;
        this.ctxV.fillStyle = color;
        this.ctxV.textAlign = align;
        this.ctxV.fillText(text, this.xs(x), this.ys(y));
    }
    funcPolygon(points = [], color = 'blue', width = 2) {
        if (points.length >= 3) {

            this.ctxV.beginPath();
            this.ctxV.lineWidth = width;
            this.ctxV.strokeStyle = color;
            this.ctxV.fillStyle = color + '40';
            this.ctxV.moveTo(this.xs(points[0].x), this.ys(points[0].y));
            for (let i = 1; i < points.length; i++) {
                this.ctxV.lineTo(this.xs(points[i].x), this.ys(points[i].y));
            }
            this.ctxV.lineTo(this.xs(points[0].x), this.ys(points[0].y));
            this.ctxV.fill();
            this.ctxV.closePath();
            this.ctxV.stroke();
        }
    }
    polygon(points = [], color = '#080b') {
        this.ctxV.beginPath();
        this.ctxV.fillStyle = color;
        this.ctxV.moveTo(
            this.xs(points[0].x),
            this.ys(points[0].y)
        );
        for (let i = 1; i < points.length; i++) {
            this.ctxV.lineTo(
                this.xs(points[i].x),
                this.ys(points[i].y));
        }
        this.ctxV.fill();
        this.ctxV.closePath();
    }
}