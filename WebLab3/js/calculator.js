//
//  index
//  WebLab2
//
//  Created on 13/09/2016
//  Copyright (c) 2016 Brigad. All rights reserved.
//

class Calculator {
    constructor(init) {
        this.result = init || 0;
    }

    add(number) {
        this.result += number;
        return this;
    }

    sub(number) {
        this.result -= number;
        return this;
    }

    mul(number) {
        this.result *= number;
        return this;
    }

    div(number) {
        this.result /= number;
        return this;
    }

    sin() {
        this.result = Math.sin(this.result);
        return this;
    }

    cos() {
        this.result = Math.cos(this.result);
        return this;
    }

    tan() {
        this.result = Math.tan(this.result)
        return this;
    }

    fact() {
        const factorial = (n) => (n === 0) ? 1 : n * factorial(n - 1);
        if (this.result < 0) {
            throw new RangeError('cannot make a factorial on negative number');
        }
        this.result = factorial(this.result);
        return this;
    }

    save() {
        this.saved = this.result;
        return this;
    }

    recover() {
        return this.saved;
    }

    getResult() {
        return this.result;
    }

    resetResult() {
        this.result = 0;
        return this;
    }
}

