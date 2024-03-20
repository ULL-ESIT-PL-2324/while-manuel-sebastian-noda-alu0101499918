const { $ } = require('./utils.js')

// Fill with the exported functions
/**
 * @brief Construye el nodo raíz del AST.
 *
 * Esta función construye el nodo raíz del AST con el nodo hijo dado.
 *
 * @param {*} child - El nodo hijo.
 * @return {ASTNode} El nodo raíz.
 */
function buildRoot(child) {
  return {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: child,
      },
    ],
    sourceType: "script",
  };
}

/**
 * @brief Construye un nodo literal del AST.
 *
 * Esta función construye un nodo literal con el valor especificado.
 *
 * @param {*} value - El valor del literal.
 * @return {ASTNode} El nodo literal.
 */
function buildLiteral(value) {
  return {
    type: "Literal",
    value: value,
    raw: `"${value}"`, // Recast compatibility!! escodegen does not need the extra quotes
  };
}

/**
 * @brief Construye un nodo de expresión binaria del AST.
 *
 * Esta función construye un nodo de expresión binaria con los operandos izquierdo y derecho y el operador especificados.
 *
 * @param {*} left - El operando izquierdo.
 * @param {*} op - El operador.
 * @param {*} right - El operando derecho.
 * @return {ASTNode} El nodo de expresión binaria.
 */
function buildBinaryExpression(left, op, right) {
  return {
    type: "BinaryExpression",
    left: left,
    operator: op,
    right: right,
  };
}
/**
 * @brief Construye un nodo de expresión de llamada del AST.
 *
 * Esta función construye un nodo de expresión de llamada con la función, los argumentos y la palabra reservada especificados.
 *
 * @param {*} functionName - El nombre de la función.
 * @param {*} arguments - Los argumentos de la llamada.
 * @param {boolean} [reservedWord=false] - Indica si es una palabra reservada.
 * @return {ASTNode} El nodo de expresión de llamada.
 */


function buildCallExpression(functionName, arguments, reservedWord = false) {
  return {
    type: "CallExpression",
    callee: {
      type: "Identifier",
      name: reservedWord ? functionName : $(functionName)
    },
    arguments: arguments
  }
}

/**
 * @brief Construye un nodo de expresión unaria del AST.
 *
 * Esta función construye un nodo de expresión unaria con el operador, el argumento y la indicación de prefijo especificados.
 *
 * @param {*} op - El operador.
 * @param {*} argument - El argumento de la expresión unaria.
 * @param {boolean} prefix - Indica si es un prefijo.
 * @return {ASTNode} El nodo de expresión unaria.
 */


function buildUnaryExpression(op, argument, prefix) {
  return {
    type: "UnaryExpression",
    operator: op,
    argument: argument,
    prefix: prefix,
  };
}

/**
 * @brief Construye un nodo de identificador o llamadas del AST.
 *
 * Esta función construye un nodo de identificador o llamadas con el nombre y las llamadas especificadas.
 *
 * @param {*} name - El nombre del identificador.
 * @param {*} calls - Las llamadas.
 * @return {ASTNode} El nodo de identificador o llamadas.
 */

function buildIdentifierOrCalls(name, calls) {
  let id = {
    type: "Identifier",
    name: name,
  };
  if (calls.length === 0) {
    return id;
  }
  debugger;
  let node = id;
  calls.forEach(ast => {
    let parent = {
      type: "CallExpression",
      callee: node,
      arguments: ast === null? [] : [ast],
    };
    node = parent;
  });
  return node;
}


function buildIdentifier(name) {
  return {
    type: "Identifier",
    name: name,
  };
}

/**
 * @desc Builds a variable declaration node of the AST
 * @param {*} declarations 
 */
function buildVariableDeclaration(declarations) {
  return {
    type: "VariableDeclaration",
    declarations: declarations,
    kind: "let",
  };
}

/**
 * @desc Builds a variable declarator node of the AST
 * @param {*} id 
 */
function buildVariableDeclarator(id) {
  return {
    type: "VariableDeclarator",
    id: id,
    init: null,
  };
}


function buildAssignmentExpression(name, operator, right) {
  return {
    type: "AssignmentExpression",
    operator,
    left: buildIdentifier(name),
    right: right,
  };
}


function buildSequenceExpression(expressions) {
  return {
    type: "SequenceExpression",
    expressions: expressions,
  };
}


function buildCallMemberExpression(caller, names, args) {
  let namesList = names.split('.');
  return {
    type: "CallExpression",
    callee: buildMemberExpression(caller, namesList),
    arguments: args,
  };
}


function buildMemberExpression(caller, names) {
  if (names.length === 1) {
    return {
      type: "MemberExpression",
      property: {
        type: "Identifier",
        name: names.pop()
      },
      object: caller
    };
  }
  return {
    type: "MemberExpression",
    property: {
      type: "Identifier",
      name: names.pop()
    },
    object: buildMemberExpression(caller, names),
  };
}


function buildMin(left, right, reservedWord = false) {
  return buildCallExpression('min', [left, right], reservedWord);
}


function buildMax(left, right, reservedWord = false) {
  return buildCallExpression('max', [left, right], reservedWord);
}


function buildLogicalExpression(left, operator, right) {
  return {
    type: "LogicalExpression",
    left: left,
    operator: operator,
    right: right,
  };
}


function buildFunctionExpression(params, exp) {
  return {
    type: "FunctionExpression",
    id: null,
    params: params,
    body: {
      type: "BlockStatement",
      body: [
        {
          type: "ReturnStatement",
          argument: exp
        }
      ]
    },
    generator: false,
    async: false,
    expression: false
  }
}


function buildIdCalls(id, calls) {
  let n = buildIdentifier(id); 
  calls.forEach(args => {
    let parent = {
      type: "CallExpression",
      callee: n,
      arguments: args,
    }
    n = parent;
  });
  return n;
}


function buildIdentifier(name) {
  return {
    type: "Identifier",
    name: name,
  };
}

/**
 * @brief Construye una expresión de bucle 'while'.
 * @param {Object} test - La condición de prueba del bucle.
 * @param {Object} body - El cuerpo del bucle.
 * @returns {Object} Objeto que representa la expresión de bucle 'while'.
 */
function buildWhileExpression(test, body) {
  // fill with your code here
  return {
    type: "CallExpression",
    callee: {
      type: "ArrowFunctionExpression",
      params: [],
      body: {
        type: "BlockStatement",
        body: [    {
          type: "VariableDeclaration",
          kind: "let",
          declarations: [
            {
              type: "VariableDeclarator",
              id: { 
                type: "Identifier", 
                name: "result" 
              },
              init: { 
                type: "Literal", 
                value: false 
              },
            },
          ],
        },
      {
        type: "WhileStatement",
        test: test,
        body: {
          type: "BlockStatement",
          body: [
            {
              type: "ExpressionStatement",
                  expression: buildAssignmentExpression("result", "=", body),
                },
              ],
            },
          },
        { 
          type: "ReturnStatement",
          argument: { 
            type: "Identifier", 
            name: "result" 
          },
        },
      ],
      },
        async: false,
        generator: false,
        id: null,
        expression: false,
    },
    arguments: [],
  };
}
/**
 * @brief Construye una expresión de bucle 'for'.
 * @param {Object} init - La inicialización del bucle.
 * @param {Object} test - La condición de prueba del bucle.
 * @param {Object} update - La actualización del bucle.
 * @param {Object} body - El cuerpo del bucle.
 * @returns {Object} Objeto que representa la expresión de bucle 'for'.
 */
function buildForExpression(init, test, update, body) {
   return {
    type: "CallExpression",
    callee: {
      type: "ArrowFunctionExpression",
      params: [],
      body: {
        type: "BlockStatement",
        body: [ {
          type: "VariableDeclaration",
          kind: "let",
          declarations: [
            {
              type: "VariableDeclarator",
              id: {
                type: "Identifier",
                name: "result"
              },
              init: {
                type: "Literal",
                value: false
              },
            },
          ],
        },
        {
          type: "ForStatement",
          init: init,
          test: test,
          update: update,
          body: {
            type: "BlockStatement",
            body: [
              {
                type: "ExpressionStatement",
                expression: buildAssignmentExpression("result", "=", body),
              },
            ],
          },
        }, 
        {
          type: "ReturnStatement",
          argument: {
            type: "Identifier",
            name: "result"
          },
        },
        ],

      },
      async: false,
      generator: false,
      id: null,
      expression: false,
    },
    arguments: []
   };
}

/**function buildArrowFunctionExpression(param, exp) {

}*/

/** 
 * @brief Construye una expresión de llamada o identificador.
 * @param {Object} identifier - El identificador o expresión de llamada.
 * @param {Array} apply - Los argumentos de la llamada, si es una llamada.
 * @returns {Object} El identificador o expresión de llamada construido.
 */
function buildParOrCallExpression(identifier,apply ) {
  if(apply.length === 0) return identifier;
  return buildIdentifierOrCalls(identifier.name, apply);
}

module.exports = {
  buildArrowFunctionExpression,
  buildAssignmentExpression,
  buildBinaryExpression,
  buildCallExpression,
  buildCallMemberExpression,
  buildFunctionExpression,
  buildIdentifier,
  buildIdentifierOrCalls,
  buildLiteral,
  buildLogicalExpression,
  buildMax,
  buildMin,
  buildParOrCallExpression,
  buildRoot,
  buildSequenceExpression,
  buildUnaryExpression,
  buildVariableDeclaration,
  buildVariableDeclarator,
  buildWhileExpression,
  buildForExpression,
}