// Previous version of the file monkey-patch.js but with a case instead of using strategy pattern.
// Monkey patching is a technique to add, modify, or suppress the default behavior of a piece of code at runtime without changing its original source code.
// It refers to dynamic modifications of a class or module at runtime, motivated by the intent to patch existing third-party code as a workaround to a bug or feature which does not act as desired. 

// Extending the boolean class to support an API like the complex class
let Operators = {
  add: '+',
  mul: '*',
  div: '/',
  equals: '==',
  pow: '**',
  neg: '-' // unary minus
};

for (let op in Operators) {
  Boolean.prototype[op] = function (other) {
    throw new Error(`Unsupported "${Operators[op]}" for ${other}`)
  };
  Function.prototype[op] = function (other) {
    switch (typeof other) {
      case 'boolean':
        return (...x) => this(...x)[op](Number(other))
      case 'object':
        if (other instanceof Complex) {
            return (...x) => this(...x)[op](other)
        }  else {
          throw new Error(`Unsupported ${op} for ${other}`)
        }
      case 'function':
        try {
          return (...x) => this(...x)[op](other(...x))
        } catch (e) {
          throw new Error(`Unsupported ${op} for function ${other}`)
        }
      default:
        throw new Error(`Unsupported ${op} for type ${typeof other}`)
    }
  }
}
