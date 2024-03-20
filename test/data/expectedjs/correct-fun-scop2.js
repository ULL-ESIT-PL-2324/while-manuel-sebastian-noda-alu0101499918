#!/usr/bin/env node
  const { Complex, print } = require("/Users/casianorodriguezleon/campus-virtual/2223/pl2223/practicas/functions/functions-solution/src/support-lib.js"); 
  
/* End of support code */

 
  let $x, $f, $b;

((($x = Complex("10"), $f = function($a) {
    let $x;
    return $x = $a.add(Complex("2i")), Complex("3i").mul($x);
}), $b = $f(Complex("4"))), print($b)), print($x);
  