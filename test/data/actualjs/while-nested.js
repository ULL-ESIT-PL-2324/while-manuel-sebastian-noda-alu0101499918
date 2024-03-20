#!/usr/bin/env node
  const { Complex, print } = require("/Users/casianorodriguezleon/campus-virtual/2324/pl2324/practicas/while/while-template/src/support-lib.js"); 
  
/* End of support code */

 
  let $a, $b, $d, $c;

($a = Complex("0"), $b = (() => {
    let result = false;

    while ($a.lessThan(Complex("3"))) {
        result = ((((print($a), $d = Complex("0")), $c = (() => {
            let result = false;

            while ($d.lessThan($a)) {
                result = (print($d), $d = $d.add(Complex("1")));
            }

            return result;
        })()), print($c)), $a = $a.add(Complex("1")));
    }

    return result;
})()), print($b);
  