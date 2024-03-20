#!/usr/bin/env node
const Complex = require("/Users/casianorodriguezleon/campus-virtual/2223/pl2223/practicas/functions/functions-solution/src/complex.js");  
const print = x => { console.log(x); return x; };
let $x;

($x = function($x) {
    return Complex("2");
}(Complex("9")), print($x)), 
print(Complex("2").call(Complex("3"))
);