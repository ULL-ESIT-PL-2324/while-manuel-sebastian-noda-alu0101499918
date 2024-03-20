#!/usr/bin/env node
  const { Complex, print } = require("/home/usuario/practicas/practica_7/while-manuel-sebastian-noda-alu0101499918/src/support-lib.js"); 
  
/* End of support code */

 
  let $sum, $b, $a;

((($sum = Complex("0"), $b = (() => {
    let result = false;

    for ($a = Complex("0"); $a.lessThan(Complex("6")); $a = $a.add(Complex("1"))) {
        result = $sum = $sum.add(Complex("2").mul($a));
    }

    return result;
})()), print($a)), print($b)), print($sum);
  