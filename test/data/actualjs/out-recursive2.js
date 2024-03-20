#!/usr/bin/env node
  const { Complex, print } = require("/Users/casianorodriguezleon/campus-virtual/2324/pl2324/practicas/while/while-template/src/support-lib.js"); 
  
/* End of support code */

 
  let $fact;

$fact = function($n) {
    return !$n.equals(Complex("0")) && $n.mul($fact($n.sub(Complex("1")))) || Complex("1");
}, print($fact(Complex("5")));
  