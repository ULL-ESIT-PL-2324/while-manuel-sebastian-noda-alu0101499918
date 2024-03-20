require('./monkey-patch.js');
let Complex = require('complex.js');

Complex.prototype.lessThan = function (other) {
  if (this.re < other.re) return true;
  if (this.re == other.re && this.im < other.im) return true; 
  return false;
}

// CAMBIASTE EL < POR UN > (por si da un posible error)
Complex.prototype.greaterThan = function (other) {
  if (this.re > other.re) return true;
  if (this.re == other.re && this.im > other.im) return true;
  return false;
}

let Operators = new Set(['add', 'sub', 'mul', 'div', 'equals', 'pow', 'neg', 'lessThan'])
//AQUI QUE HAY QEU CAMBIAR????
let oldComplex = Object.create(null); // no prototype
for (let op of Operators) {
  oldComplex[op] = Complex.prototype[op];
  Complex.prototype[op] = function (other) {
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
  }
}

Complex.prototype.call = function (other) {
  return this
}

module.exports = Complex;
