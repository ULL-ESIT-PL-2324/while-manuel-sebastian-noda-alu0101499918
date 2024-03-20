const visit = require("ast-types").visit;
const { RegexpFromNames } = require('./utils.js');

// Detect what support functions are used: dependency analysis
function dependencies(dAst) {
  // fill in with your code here
  return dAst;
}

// Builds the set of variables that are initialized in the program
const scopeAnalysis = (dAst) => {
  const Scope = require('./scope-class.js');
  let scope = new Scope(null); // global scope
  let ast = dAst.ast;
  
  visit(ast, {
    visitFunctionExpression(path) {
      // Use arrowfunctions for developer functions and function expressions for user functions
      // if (!["ArrowFunctionExpression", "FunctionExpression"].includes(node.type)) return false;
      // Fill in with your code here
    },
    visitAssignmentExpression(path) {
      // Fill in with your code here
    },
    visitIdentifier(path) {
      // Fill in with your code here
    }
  });

  // Insert declarations at the beginning of the programs
  if (scope.length > 0) {
    ast.body.unshift(scope.buildDeclaration());
  }

  // Save scope info as a property of the program node
  ast.scope = scope;
  
  // Show warnings if any
  let d = scope.notDeclaredMessage();
  if (d) console.error(d + ' used in global scope')

  return dAst;
};

module.exports = {
  scopeAnalysis,
  dependencies,
}