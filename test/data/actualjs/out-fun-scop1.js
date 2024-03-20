#!/usr/bin/env node
  const { Complex, print } = require("/home/usuario/practicas/practica_7/while-manuel-sebastian-noda-alu0101499918/src/support-lib.js"); 
  
/* End of support code */

 
  let $f, $b;

($f = function($a) {
    let $x;
    return $x = $a.add(Complex("2")), Complex("3").mul($x);
}, $b = $f(Complex("4"))), print($b);
  