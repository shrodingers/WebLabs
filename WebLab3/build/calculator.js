'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//
//  index
//  WebLab2
//
//  Created on 13/09/2016
//  Copyright (c) 2016 Brigad. All rights reserved.
//

var Calculator = function () {
    function Calculator(init) {
        _classCallCheck(this, Calculator);

        this.result = init || 0;
    }

    _createClass(Calculator, [{
        key: 'add',
        value: function add(number) {
            this.result += number;
            return this;
        }
    }, {
        key: 'sub',
        value: function sub(number) {
            this.result -= number;
            return this;
        }
    }, {
        key: 'mul',
        value: function mul(number) {
            this.result *= number;
            return this;
        }
    }, {
        key: 'div',
        value: function div(number) {
            this.result /= number;
            return this;
        }
    }, {
        key: 'sin',
        value: function sin() {
            this.result = Math.sin(this.result);
            return this;
        }
    }, {
        key: 'cos',
        value: function cos() {
            this.result = Math.cos(this.result);
            return this;
        }
    }, {
        key: 'tan',
        value: function tan() {
            this.result = Math.tan(this.result);
            return this;
        }
    }, {
        key: 'fact',
        value: function fact() {
            var factorial = function factorial(n) {
                if (n === 0) return 1;
                return n * factorial(n - 1);
            };
            if (this.result < 0) {
                throw new RangeError('cannot make a factorial on negative number');
            }
            this.result = factorial(this.result);
            return this;
        }
    }, {
        key: 'save',
        value: function save() {
            this.saved = this.result;
            return this;
        }
    }, {
        key: 'recover',
        value: function recover() {
            return this.saved;
        }
    }, {
        key: 'getResult',
        value: function getResult() {
            return this.result;
        }
    }, {
        key: 'resetResult',
        value: function resetResult() {
            this.result = 0;
            return this;
        }
    }]);

    return Calculator;
}();