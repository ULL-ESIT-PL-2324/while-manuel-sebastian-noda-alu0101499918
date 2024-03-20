require('./monkey-patch.js');
let Complex = require('complex.js');

/**
 * @memberof Complex
 * @brief Comprueba si el número complejo actual es menor que otro número complejo.
 * @param {Complex} other - El otro número complejo con el que comparar.
 * @returns {boolean} True si el número complejo actual es menor que el otro, false en caso contrario.
 */
Complex.prototype.lessThan = function (other) {
  if (this.re < other.re) return true;
  if (this.re == other.re && this.im < other.im) return true; 
  return false;
}



/**
 * @memberof Complex
 * @brief Comprueba si el número complejo actual es mayor que otro número complejo.
 * @param {Complex} other - El otro número complejo con el que comparar.
 * @returns {boolean} True si el número complejo actual es mayor que el otro, false en caso contrario.
 */

Complex.prototype.greaterThan = function (other) {
  if (this.re > other.re) return true;
  if (this.re == other.re && this.im > other.im) return true;
  return false;
}
/**
 * @memberof Complex
 * @brief Agrega soporte para diversas operaciones aritméticas y de comparación.
 * @param {Complex} other - El otro número complejo u operación a realizar.
 * @returns {Complex} Resultado de la operación.
 */
let Operators = new Set(['add', 'sub', 'mul', 'div', 'equals', 'pow', 'neg', 'lessThan'])
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
