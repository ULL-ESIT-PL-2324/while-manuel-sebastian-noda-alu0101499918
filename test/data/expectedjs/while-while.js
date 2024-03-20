#!/usr/bin/env node
  const { Complex, print } = require("/Users/casianorodriguezleon/campus-virtual/2223/pl2223/practicas/functions/functions-solution/src/support-lib.js"); 
  
/* End of support code */

 
  let $a, $b;

((($a = Complex("0"), $b = (() => {
    let result = false;

    while ($a.lessThan(Complex("10"))) {
        result = (print($a), $a = $a.add(Complex("1")));
    }

    return result;
})()), print($b)), $b = (() => {
    let result = false;

    while ($a.greaterThan(Complex("0"))) {
        result = (print($a), $a = $a.sub(Complex("1")));
    }

    return result;
})()), print($b);
  