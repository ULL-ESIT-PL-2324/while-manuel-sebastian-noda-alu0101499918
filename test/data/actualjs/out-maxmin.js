#!/usr/bin/env node
  const { max, Complex, min, print } = require("/home/usuario/practicas/practica_7/while-manuel-sebastian-noda-alu0101499918/src/support-lib.js"); 
  
/* End of support code */

 
  let $a;

$a = max(
    Complex("2").add(Complex("4")),
    min(Complex("3"), Complex("5").sub(Complex("i")))
), print($a);
  