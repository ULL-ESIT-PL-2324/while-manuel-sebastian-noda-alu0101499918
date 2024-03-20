#!/usr/bin/env node
  const { Complex, print } = require("/home/usuario/practicas/practica_7/while-manuel-sebastian-noda-alu0101499918/src/support-lib.js"); 
  
/* End of support code */

 
  let $a, $b;

($a = Complex("0"), $b = (() => {
    let result = false;

    while ($a.lessThan(Complex("10"))) {
        result = (print($a), $a = $a.add(Complex("1")));
    }

    return result;
})()), print($b);
  