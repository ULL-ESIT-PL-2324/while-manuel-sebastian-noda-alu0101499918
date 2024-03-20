#!/usr/bin/env node
  const { print, Complex } = require("/Users/casianorodriguezleon/campus-virtual/2223/pl2223/practicas/functions/functions-solution/src/support-lib.js"); 
  
/* End of support code */

 
  let $f;

$f = function($x) {
    return function() {
        return print($x);
    };
}, $f(Complex("4"))();
  