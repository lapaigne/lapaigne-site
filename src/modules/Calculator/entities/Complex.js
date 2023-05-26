export default class Complex {
    constructor(re = 0, im = 0) {
        this.re = re;
        this.im = im;
    }
    toString() {
        if (this.im === 0) {
            return this.re;
        }
        if (this.re === 0 && this.im !== 0) {
            return (this.im > 0) ?
                `i${(this.im === 1) ? "" : this.im}` :
                `-i${(this.im === -1) ? "" : -this.im}`;
        }
        return (this.im > 0) ?
            `${this.re}+i${(this.im === 1) ? "" : this.im}` :
            `${this.re}-i${(this.im === -1) ? "" : -this.im}`;
    }
    abs() {
        return new Complex(Math.sqrt(this.re * this.re + this.im * this.im));
    }
}