#!/usr/bin/env node
  const { print, factorial, Complex } = require("/Users/casianorodriguezleon/campus-virtual/2324/pl2324/practicas/while/while-template/src/support-lib.js"); 
  
/* End of support code */

 
  print(
    factorial(Complex("2")).pow(factorial(Complex("3")).pow(factorial(Complex("2"))))
);
  