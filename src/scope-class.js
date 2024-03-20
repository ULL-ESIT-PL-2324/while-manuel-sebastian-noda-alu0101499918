const {
  buildIdentifier,
  buildVariableDeclaration,
  buildVariableDeclarator,
} = require('./ast-build');
const { difference } = require('./utils.js');

class Scope {
  constructor(parent) {
    this.parent = parent;
    this.initialized = new Set();
    this.used = new Set();
    this.VarDeclarators = []; //list of VariableDeclarator ASTs for let $a = 4, $b = 5, ... declarations
  }
  add(name) {
    this.initialized.add(name);
    this.VarDeclarators.push(buildVariableDeclarator(buildIdentifier(name)));
  }
  setAsInitialized(name) {
    this.initialized.add(name);
  }
  setAsUsed(name) {
    this.used.add(name);
  }
  // Returns true if the variable is declared in this scope
  has(name) {
    return this.initialized.has(name);
  }
  buildDeclaration() {
    return buildVariableDeclaration(this.VarDeclarators);
  }
  // Returns the scope where the variable is declared or null if not found
  lookup(name) {
    if (this.has(name)) return this;
    if (this.parent) return this.parent.lookup(name);
    return null;
  }
  // Return the set of not declared variables
  notDeclared() { 
    let notDeclared = difference(this.used, this.initialized);
    for(let v of this.used) {
      let s = this.lookup(v);
      if (s) notDeclared.delete(v);
    }
    return notDeclared;
  }
  notDeclaredMessage() {
    let d = this.notDeclared();
    if (d.size > 0) { 
      return Array.from(d).
         map(x => x.replace(/^[$]/, '')).
         map(x => `Not declared variable '${x}'`).join(',')
    }
    return null;
  }

  // accessor property. 
  get length() {
    return this.VarDeclarators.length;
  }
}

module.exports = Scope;