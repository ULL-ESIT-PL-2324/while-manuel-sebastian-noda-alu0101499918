# Lab Add Loops and Strings 

- Author: Manuel José Sebastián Noda
- Email: alu0101499918@ull.edu.es

# Introduction

Using the grammar built from the previous labs, we are now expanding the functionality of our program by adding _functions_ and the _boolean_ type.

# Examples
 
# Opciones en línea de comandos (-o, -V, -h, etc.)

Ya teniamos incluidos las opciones de -o y -V, por lo que lo unico que teniamos que hacer era añadir la opcion -h,
  de la misma manera qeu la opcion -o

  program
  .version(version)

  .argument("<filename>", 'file with the original code')

  .option("-o, --output <filename>", "file in which to write the output")

  .option('-h, --help   ','display help for command')

  .action((filename, options) => {

    transpile(filename, options.output);

  });

# Traduce correctamente los bucles while

  Vamos a ver el ejemplo del test while. calc y ver como lo traduce correctamente

```js
a = 0,
b = while a < 10 {
  print(a),
  a = a +1
},
print(b) # 10
```
 Y asi nos lo traduce el codigo 

```js
  let $a, $b;

($a = Complex("0"), $b = (() => {
    let result = false;

    while ($a.lessThan(Complex("10"))) {
        result = (print($a), $a = $a.add(Complex("1")));
    }

    return result;
})()), print($b);

```
# Traduce correctamente las bucles for

 Vamos a ver el ejemplo del test for. calc y ver como lo traduce correctamente 

```js
for(a = 0; a < 5; a = a+1) {
  write("a = "; a),
  for(b = 0; b < a; b = b+1) {
    write("  b = "; b)
  }
}
```

Y asi nos lo traduce el codigo

```js

 let $sum, $b, $a;

((($sum = Complex("0"), $b = (() => {
    let result = false;

    for ($a = Complex("0"); $a.lessThan(Complex("6")); $a = $a.add(Complex("1"))) {
        result = $sum = $sum.add(Complex("2").mul($a));
    }

    return result;
})()), print($a)), print($b)), print($sum);
```

# Traduce correctamente las strings
 Aqui tenemos un ejemplo de como traduce  correctamente la string

   write(factorial(Complex("3")).sub(Complex("1")));

# Las nuevas operaciones de strings y otros tipos son simétricas

Aqui tenemos un ejemplode operaciones con string y vemos un resultado , demostrando qeu son simetricas

```js

print("a is "+ 4+2i),       # string + number
print("a is "+ (4+2i)),     # string + number
print("a is "+ "a letter"), # string + string
print("a is "+ true),       # string + boolean
print("a is "+ fun() { 1 }) # string + function

```
Y asi los traduce
```js
  (((print("a is ".add(Complex("4")).add(Complex("2i"))), print("a is ".add(Complex("4").add(Complex("2i"))))), print("a is ".add("a letter"))), print("a is ".add(true))), print("a is ".add(function() {
    return Complex("1");
}));
```

  Esto nos sale como resultado en la terminal
```js
a is 42i
a is 4 + 2i
a is a letter
a is true
a is function() {
    return Complex("1");
}
```
# Los mensajes de error para operaciones sobre tipos incorrectos son adecuados
  Ejemplo de como tratamos los errors

```js
  try {
      if (typeof other === 'function') return other[op](this);
      if (typeof other === 'boolean') return this[op](Complex(Number(other)));
      if (typeof other === 'string') return String(this) [op](other);
      return oldComplex[op].call(this, other)
      // fill in with your code here
    }
    catch (e) {
      throw new Error(`Complex numbers do not support ${op} for ${other}\n${e}`)
    }
```
# Ha añadido tests suficientes, documentación y cubrimiento
 ✔ transpile(while.calc, while.js) (No errors: true) (104ms)

  ✔ transpile(while-while.calc, while-while.js) (No errors: true) (91ms)

  ✔ transpile(while-sum.calc, while-sum.js) (No errors: true) (88ms)

  ✔ transpile(while-nested.calc, while-nested.js) (No errors: true) (85ms)

  ✔ transpile(for-loop.calc, for-loop.js) (No errors: true) (104ms)

  ✔ transpile(for-loop-nested.calc, for-loop-nested.js) (No errors: true) (84ms)

  ✔ transpile(for-loop-nested-write.calc, for-loop-nested-write.js) (No errors: true) (78ms)

  ✔ transpile(string-string.calc, string-string.js) (No errors: true) (75ms)

  ✔ transpile(string.calc, string.js) (No errors: true) (62ms)

  ✔ transpile(string-add.calc, string-add.js) (No errors: true) (78ms)

  ✔ transpile(test-fun-call-empty.calc, fun-call-empty.js) (No errors: true) (71ms)

  ✔ transpile(test1.calc, out1.js) (No errors: true) (61ms)

  ✔ transpile(test2.calc, out2.js) (No errors: true) (62ms)

  ✔ transpile(test-exp.calc, out-exp.js) (No errors: true) (65ms)

  ✔ transpile(test-exp-fact.calc, out-exp-fact.js) (No errors: true) (69ms)

  ✔ transpile(test-recursive.calc, out-recursive.js) (No errors: true) (65ms)

  ✔ transpile(test-fun-scop1.calc, out-fun-scop1.js) (No errors: true) (68ms)

  ✔ transpile(test-fun-scop2.calc, out-fun-scop2.js) (No errors: true) (68ms)

  ✔ transpile(test-recursive2.calc, out-recursive2.js) (No errors: true) (72ms)

  ✔ transpile(test4.calc, out4.js) (No errors: true) (51ms)

  ✔ transpile(test-scope2.calc, out-scope2.js) (No errors: true) (67ms)

  ✔ transpile(test-power-power.calc, out-power-power.js) (No errors: true) (69ms)

  ✔ transpile(test-print.calc, out-print.js) (No errors: true) (73ms)

  ✔ transpile(test-maxmin.calc, out-maxmin.js) (No errors: true) (71ms)

  ✔ transpile(test-mixed.calc, out-mixed.js) (No errors: true) (69ms)

  ✔ transpile(test-assign1.calc, out-assign1.js) (No errors: true) (68ms)
  
  ✔ transpile(test-logic1.calc, out-logic1.js) (No errors: true) (69ms)

  27 passing (2s)

## References

- [Repo ULL-ESIT-GRADOII-PL/esprima-pegjs-jsconfeu-talk](https://github.com/ULL-ESIT-GRADOII-PL/esprima-pegjs-jsconfeu-talk)
- [crguezl/hello-jison](https://github.com/crguezl/hello-jison)
- [Espree](https://github.com/eslint/espree)
  - [Options for parse and tokenize methods](https://github.com/eslint/espree#options)
- <a href="https://astexplorer.net/" target="_blank">astexplorer.net demo</a>
- [idgrep.js](https://github.com/ULL-ESIT-GRADOII-PL/esprima-pegjs-jsconfeu-talk/blob/master/idgrep.js)
- [Introducción a los Compiladores](https://ull-esit-gradoii-pl.github.io/temas/introduccion-a-pl/esprima.html) con Jison y Espree