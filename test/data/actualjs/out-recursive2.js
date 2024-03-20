#!/usr/bin/env node
  const { Complex, print } = require("/home/usuario/practicas/practica_7/while-manuel-sebastian-noda-alu0101499918/src/support-lib.js"); 
  
/* End of support code */

 
  let $fact;

$fact = function($n) {
    return !$n.equals(Complex("0")) && $n.mul($fact($n.sub(Complex("1")))) || Complex("1");
}, print($fact(Complex("5")));
  