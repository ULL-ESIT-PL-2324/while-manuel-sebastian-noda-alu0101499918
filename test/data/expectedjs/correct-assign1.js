#!/usr/bin/env node
const { Complex, print } = require("/Users/casianorodriguezleon/campus-virtual/2223/pl2223/practicas/functions/functions-solution/src/support-lib.js"); 

/* End of support code */

 
let $a, $b;
($a = Complex("4").add(Complex("2")), $b = Complex("5").mul($a)), print($b);
