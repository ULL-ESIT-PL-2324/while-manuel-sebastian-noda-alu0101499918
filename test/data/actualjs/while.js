#!/usr/bin/env node
  const { Complex, print } = require("/Users/casianorodriguezleon/campus-virtual/2324/pl2324/practicas/while/while-template/src/support-lib.js"); 
  
/* End of support code */

 
  let $a, $b;

($a = Complex("0"), $b = (() => {
    let result = false;

    while ($a.lessThan(Complex("10"))) {
        result = (print($a), $a = $a.add(Complex("1")));
    }

    return result;
})()), print($b);
  