Instructions for Calculator
===========================

Instructions
------------

Instructions are available with the Instructions.md file, formatted with markdown, that can be opened with 
gitHub or any markdown compliant viewer.
They are also available directly inside index.html page.

General Behavior
----------------

This calculator can be constructed with a number to set the base value, or none to set it to 0;
Then, it keeps an internal value, that can be modified through different calculus methods.
Calculus and save methods can be chained, ``getResult`` and ``recover`` methods cannot, because they allow to access 
values stored inside the calculator  

Methods
-------

*   add : Adds a number to the calculator's value
    Example :
        ``` Calculator.add(42); ```

*   sub : Substracts a number to the calculator's value
    Example :
        ``` Calculator.sub(42); ```

*   mul : Divides the calculator's value by a number
    Example :
        ``` Calculator.mul(42); ```
        
*   div : Divides the calculator's value by a number
    Example :
        ``` Calculator.div(42); ```
        
*   sin : Computes the calculator's value sinus
    Example :
        ``` Calculator.sin(); ```
        
*   cos : Computes the calculator's value cosinus
    Example :
        ``` Calculator.cos(); ```
        
*   tan : Computes the calculator's value tangent
    Example :
        ``` Calculator.tan(); ```
        
*   fact : Computes the calculator's value factorial
    Example :
        ``` Calculator.fact(); ```
        
*   save : Saves the current calculator's value
    Example :
        ``` Calculator.save(); ```
        
*   recover : Returns the last previously saved value
    Example :
        ``` Calculator.recover(); ```
        
*   getResult : Returns the calculator's current value
    Example :
        ``` Calculator.getResult(); ```

*   resetResult : Reset the calculator's value to 0
    Example :
        ``` Calculator.resetResult(); ```
