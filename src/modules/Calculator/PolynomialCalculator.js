import { Member, Polynomial } from "./entities";
export default class PolynomialCalculator {
    polynomial(members) {
        return new Polynomial(members);
    }

    getMember(str) {
        if (str) {
            const arr = str.split('x');
            if (arr.length === 1) return new Member(arr[0]);
            arr[0] = arr[0].replaceAll('*', '');
            arr[1] = arr[1].replaceAll('^', '');
            if (arr[0] === '') arr[0] = 1;
            if (arr[0] === '-') arr[0] = -1;
            return arr[1] ?
                new Member(arr[0], arr[1]) :
                new Member(arr[0], 1);
        }
        return new Member;
    }

    getPolynomial(str) {
        str = str.replaceAll(' ', '').replaceAll('\n', '');
        if (str) {
            const arr = str.split('+');
            const arr2 = arr.map(arr => arr.split('-'));
            for (let i = 0; i < arr2.length; i++) {
                if (arr2[i].length > 1) {
                    arr2[i] = arr2[i].map(
                        (elem, index) => index ? `-${elem}` : elem
                    );
                }
            }
            const arr3 = arr2.reduce((S, arr) => S.concat(arr), []);
            const res = [];
            arr3.forEach(elem => elem && res.push(elem));
            return this.polynomial(
                res.map(str => this.getMember(str))
            );
        }
        return this.polynomial();
    }

    add(a, b) {
        const members = [];
        a.poly.forEach(elementA => {
            const member = b.poly.find(elementB => elementB.power === elementA.power);
            if (member) {
                members.push(new Member(elementA.value + member.value, elementA.power));
            }
            else {
                members.push(new Member(elementA.value, elementA.power));
            }
        });
        b.poly.forEach(elementB => {
            if (!members.find(element => element.power === elementB.power))
                members.push(new Member(elementB.value, elementB.power));
        });
        return this.polynomial(members);
    }

    sub(a, b) {
        const members = [];
        a.poly.forEach(elementA => {
            const member = b.poly.find(elementB => elementB.power === elementA.power);
            if (member) {
                members.push(new Member(elementA.value - member.value, elementA.power));
            }
            else {
                members.push(new Member(elementA.value, elementA.power));
            }
        });
        b.poly.forEach(elementB => {
            if (!members.find(element => element.power === elementB.power))
                members.push(new Member(-elementB.value, elementB.power));
        });
        return this.polynomial(members);
    }

    mult(a, b) {
        let polynomial = this.polynomial();
        a.poly.forEach(elementA => {
            const members = [];
            b.poly.forEach(elementB => {
                members.push(new Member(
                    elementA.value * elementB.value,
                    elementA.power + elementB.power
                ));
            });
            polynomial = this.add(polynomial, this.polynomial(members));
        });
        return polynomial;
    }
}