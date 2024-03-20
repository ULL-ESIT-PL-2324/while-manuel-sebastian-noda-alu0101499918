#!/usr/bin/env node
  const { Complex, print } = require("/Users/casianorodriguezleon/campus-virtual/2324/pl2324/practicas/while/while-template/src/support-lib.js"); 
  
/* End of support code */

 
  let $f, $b;

($f = function($a) {
    let $x;
    return $x = $a.add(Complex("2")), Complex("3").mul($x);
}, $b = $f(Complex("4"))), print($b);
  