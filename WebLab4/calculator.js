var str = "12/5*9+9.4*2".replace(/[^-()\d/*+.]/g, '');

var f = [];
Math.factorial = function(n) {
    if (n == 0 || n == 1) {
        return 1;
    }
    if (f[n] > 0) {
        return f[n];
    }
    return f[n] = Math.factorial(n-1) * n;
}

// Classe Calculator
// Toutes les méthodes sauf `equals` retournent `this`, ce qui permet de chainer les appels
// Ex:
// var calculator = new Calculator()
// calculator.add(2).add(3).subtract(2).equals()
// Retourne : 2
// 2 + 3 - 2 = 2
var Calculator = function () {
    this.memory;

    this.equation = '';

    // Ajouter seulement une valeur à l'équation
    // Sera utile pour lorsque cette classe sera connectée au UI
    this.value = function(value) {
        if(typeof value !== 'undefined'){
            this.equation += parseFloat(value);
        }
        return this;
    }

    // Réinitialiser l'équation
    this.clear = function() {
        this.equation = '';
        return this;
    }

    this.add = function(value) {
        this.equation += '+';
        if(typeof value !== 'undefined'){
            this.equation += parseFloat(value);
        }
        return this;
    }

    this.subtract = function (value) {
        this.equation += '-'
        if(typeof value !== 'undefined'){
            this.equation += parseFloat(value);
        }
        return this;
    }

    this.multiply = function (value) {
        this.equation += '*'
        if(typeof value !== 'undefined'){
            this.equation += parseFloat(value);
        }
        return this;
    }

    this.divide = function (value) {
        this.equation += '/'
        if(typeof value !== 'undefined'){
            if (value == 0) {
                throw "Division par zéro!!!";
            }
            this.equation += parseFloat(value);
        }
        return this;
    }

    this.sin = function(value) {
        this.equation += 'Math.sin(' + parseFloat(value) + ')'
        return this;
    }

    this.cos = function(value) {
        this.equation += 'Math.cos(' + parseFloat(value) + ')'
        return this;
    }

    this.tan = function(value) {
        this.equation += 'Math.tan(' + parseFloat(value) + ')'
        return this;
    }

    this.setMemory = function(memoryValue) {
        this.memory = memoryValue;
    }

    this.getMemory = function() {
        return this.memory;
    }

    this.factorial = function(value) {
        if(typeof value === 'undefined'){
            this.equation = 'Math.factorial(' + this.equals() + ')'
        } else {
            this.equation += 'Math.factorial(' + parseFloat(value) + ')'
        }
        return this;
    }

    this.equals = function () {
        // Il faut être très prudent avec eval !!! Eval pourrait permettre d'injecter du code malicieux et l'exécuter
        // C'est pourquoi toutes nos variables 'value' sont passées dans 'parseFloat'
        console.log('Evaluating :', this.equation);
        var equationSolution = eval(this.equation);
        this.equation = '';
        return equationSolution;
    }
}

const Evaluator = function() {
    /*this.expressions = {
        '+': calculator.add,
        '-': calculator.subtract,
        '*': calculator.multiply,
        '/': calculator.divide,
        sin: calculator.sin,
        cos: calculator.cos,
        tan: calculator.tan,
        '!': calculator.factorial
    };*/
    this.Cal = new Calculator();
    this.calculatorStack = [new Calculator()];
}

const ErrorDisplay = function(error) {
    const div = $('#display');
    const expr = div.text();
    div.text(error);
    div.addClass('red-text');
    setTimeout(function() {
        div.text(expr);
        div.removeClass('red-text');
    }, 500);
}

$(function() {
    const calculator = new Calculator();
    var insideExp = false;
    var isStarted = false;
    var operandRequired = false;
    var lastCommand;
    var previousCommand;
    var current = '';
    const simpleOperands = {
        '+': calculator.add,
        '-': calculator.subtract,
        '*': calculator.multiply,
        '/': calculator.divide,
    };
    const complexOperands = {
        cos : calculator.cos,
        sin : calculator.sin,
        tan : calculator.tan,
        '!' : calculator.factorial,
    };
    var clearAll = function() {
        insideExp = false;
        isStarted = false;
        operandRequired = false;
        lastCommand = undefined;
        previousCommand = undefined;
        current = '';
        calculator.clear();
    };
    const display = $('#display');
    // geoloc function / not tested yet
    const geoloc = function () {
        if (!navigator.geolocation) {
            console.error('Geolocation is missing');
            return;
        }
        clearAll();
        navigator.geolocation.getCurrentPosition(function(position) {
            display.text(position.coords.latitude+ ',' + position.coords.longitude);
        });
    };
    // set all numbers buttons
    $('.button-container button').each(function () {
        var numberText = $(this).text() === 'MemGet' ? calculator.getMemory() : (this.text);
        if (!isNaN($(this).text())) {
            $(this).click(function() {
                if (operandRequired) {
                    ErrorDisplay("Erreur de syntaxe : Operation nécessaire après une fonction");
                    return;
                }
                current += $(this).text();
                !isStarted || display.text() === '0' ? isStarted = !isStarted && display.text($(this).text())
                    : display.text(display.text() + $(this).text());
            })
        } else if (Object.keys(simpleOperands).indexOf($(this).text()) !== -1) {
            //function for simple operations
            $(this).click(function () {
                if (insideExp) {
                    ErrorDisplay("Erreur logique : Opérations imbriquées impossibles");
                    return;
                }
                if (!isStarted) {
                    isStarted = true;
                    current = '0';
                }
                if (current === '') {
                    ErrorDisplay("Erreur logique : Impossible de mettre 2 opérations à la suite");
                    return;
                }
                operandRequired = false;
                typeof lastCommand === 'undefined' ? calculator.value(current) :
                    //binds the calculator instance to the function declared
                    lastCommand.bind(calculator, current)();
                current = '';
                lastCommand = simpleOperands[$(this).text()];
                display.text(display.text() + $(this).text())
            })
        } else if (Object.keys(complexOperands).indexOf($(this).text()) !== -1) {
            // function for trigo and exp
            $(this).click(function () {
                if (insideExp) {
                    ErrorDisplay("Erreur logique : Opérations imbriquées impossibles : fermez la parenthèse");
                    return;
                }
                if (current !== '') {
                    ErrorDisplay("Erreur de syntaxe : Operation nécessaire avant une fonction");
                    return;
                }
                isStarted = true;
                insideExp = true;
                if (typeof lastCommand !== 'undefined') previousCommand = lastCommand;
                current = '';
                display.text((typeof lastCommand === 'undefined' ? '' : display.text()) + $(this).text() + '(');
                lastCommand = complexOperands[$(this).text()];
            });
        }
    });
    $('#endFunc').click(function () {
        // parenthesis closing
        const tmpCalc = new Calculator();
        if (!insideExp) {
            ErrorDisplay("Erreur logique : Pas dans une fonction");
            return;
        }
        current = lastCommand.bind(tmpCalc)(current).equals();
        lastCommand = previousCommand;
        insideExp = false;
        operandRequired = true;
        display.text(display.text() + $(this).text());
    });
    $('#equals').click(function() {
        if (insideExp) {
            ErrorDisplay("Erreur logique : Opérations imbriquées impossibles : fermez la parenthèse");
            return;
        }
        if (!lastCommand) {
            clearAll();
            display.text('0');
            return;
        }
        lastCommand.bind(calculator, current)();
        display.text(calculator.equals());
        clearAll();
    });



});
