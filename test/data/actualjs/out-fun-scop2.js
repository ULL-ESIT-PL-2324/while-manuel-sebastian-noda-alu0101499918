#!/usr/bin/env node
  const { Complex, print } = require("/home/usuario/practicas/practica_7/while-manuel-sebastian-noda-alu0101499918/src/support-lib.js"); 
  
/* End of support code */

 
  let $x, $f, $b;

((($x = Complex("10"), $f = function($a) {
    let $x;
    return $x = $a.add(Complex("2i")), Complex("3i").mul($x);
}), $b = $f(Complex("4"))), print($b)), print($x);
  