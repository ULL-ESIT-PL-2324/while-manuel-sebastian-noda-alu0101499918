#!/usr/bin/env node
const { max, Complex, min, print } = require("/Users/casianorodriguezleon/campus-virtual/2223/pl2223/practicas/functions/functions-solution/src/support-lib.js"); 

/* End of support code */

 
let $a;

$a = max(
    Complex("2").add(Complex("4")),
    min(Complex("3"), Complex("5").sub(Complex("i")))
), print($a);
