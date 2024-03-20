#!/usr/bin/env node
  const { Complex, print } = require("/home/usuario/practicas/practica_7/while-manuel-sebastian-noda-alu0101499918/src/support-lib.js"); 
  
/* End of support code */

 
  let $sum, $a;

($sum = $a = Complex("0"), (() => {
    let result = false;

    while ($a.lessThan(Complex("10"))) {
        result = ($sum = $sum.add($a.mul($a)), $a = $a.add(Complex("1")));
    }

    return result;
})()), print($sum);
  