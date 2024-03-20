#!/usr/bin/env node
const Complex = require("/Users/casianorodriguezleon/campus-virtual/2223/pl2223/practicas/functions/functions-solution/src/complex.js");  
const print = x => { console.log(x); return x; };
let $f;

$f = function($x) {
    return function($y) {
        return $x.add($y);
    };
}, 
print(
  $f.add(Complex("2"))(Complex("3"))(Complex("5"))
);