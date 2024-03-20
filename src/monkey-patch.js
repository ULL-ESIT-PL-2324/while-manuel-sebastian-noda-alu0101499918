// Monkey patching is a technique to add, modify, or suppress the default behavior of a piece of code at runtime without changing its original source code.
// It refers to dynamic modifications of a class or module at runtime, motivated by the intent to patch existing third-party code as a workaround to a bug or feature which does not act as desired. 

let Operators = {
  add: '+',
  mul: '*',
  div: '/',
  equals: '==',
  pow: '**',
  neg: '-' // unary minus
};

let booleanHandler = Object.create(null); // no prototype

booleanHandler.boolean = function (op, other) {
  if (op === 'equals') {
    return this == other
  }
  let className = other?.constructor?.name || typeof other;
  throw new Error(`Boolean "${this}" does not support "${Operators[op] || op}" for "${other}"`)
}

booleanHandler.object = function (op, other) {
  if (op === 'add') {
    return other.add(Number(this))
  }
  throw new Error(`Boolean "${this}" does not support "${Operators[op] || op}" for "${other}"`)
}

let functionHandler = Object.create(null); // no prototype

functionHandler.boolean = function (op, other) {
  return (...x) => this(...x)[op](Number(other))
}

functionHandler.function = function (op, other) {
  return (...x) => {
    try {
      return this(...x)[op](other(...x))
    } catch (e) {
      throw new Error(`Unsupported ${op} for ${other}`)
    }
  }
}

functionHandler.object = function (op, other) {
  return (...x) => { // other is likely a complex number
    try {
      return this(...x)[op](other)
    } catch (e) {
      throw new Error(`Unsupported ${op} for ${other}`)
    }
  }
}

booleanHandler.default = functionHandler.default = function (op, other) {
  throw new Error(`Boolean "${this}" does not support "${Operators[op] || op}" for "${other}"`)
}

let stringHandler = Object.create(null); // no prototype

stringHandler.default = function (op, other) {
  // fill in
}

// add any code need for symmetry

for (let op in Operators) {
  // Extending the boolean class to give error messages for all airthmetic operations
  Boolean.prototype[op] = function (other) {
    return booleanHandler[typeof other]?.call(this, op, other) || booleanHandler.default.call(this, op, other)
  };
  Function.prototype[op] = function (other) {
    return functionHandler[typeof other]?.call(this, op, other) || functionHandler.default.call(this, op, other)
  };
  String.prototype[op] = function (other) {
    // fill in
  }
}
