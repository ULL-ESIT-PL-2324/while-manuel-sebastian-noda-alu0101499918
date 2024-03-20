#!/usr/bin/env node
  const { Complex, print } = require("/Users/casianorodriguezleon/campus-virtual/2324/pl2324/practicas/while/while-template/src/support-lib.js"); 
  
/* End of support code */

 
  let $sum, $b, $a;

((($sum = Complex("0"), $b = (() => {
    let result = false;

    for ($a = Complex("0"); $a.lessThan(Complex("6")); $a = $a.add(Complex("1"))) {
        result = $sum = $sum.add(Complex("2").mul($a));
    }

    return result;
})()), print($a)), print($b)), print($sum);
  