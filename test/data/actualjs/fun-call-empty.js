#!/usr/bin/env node
  const { print, Complex } = require("/home/usuario/practicas/practica_7/while-manuel-sebastian-noda-alu0101499918/src/support-lib.js"); 
  
/* End of support code */

 
  let $f;

$f = function($x) {
    return function() {
        return print($x);
    };
}, $f(Complex("4"))();
  