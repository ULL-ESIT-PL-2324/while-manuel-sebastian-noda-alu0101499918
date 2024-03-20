const SEPARATION_STRING = '\n/* End of support code */\n\n'
const recast = require("recast");
const Support = require("./support-lib.js");

const path = require('path');

/* INLINE SUPPORT CODE
const functionTemplate = (name, fun) => `const ${name} = ${fun.toString()};\n`;

function buildSupportCode(dependencies) {
  let code = '';
  for (let name of dependencies) {
    code += functionTemplate(name, Support[name]);
  }
  code += SEPARATION_STRING;
  //console.error('code:', code)
  return code;
}

module.exports = function codeGen(ast) {
  let fullPath = path.join(__dirname, 'complex.js');
  let preamble = 
`#!/usr/bin/env node
const Complex = require("${fullPath}");  
`;
  preamble += buildSupportCode(ast.dependencies);
  let output = preamble+recast.print(ast.ast).code;
  return output;  
}
*/

let template = (dependencies, fullPath, code) => {
  if (dependencies.length === 0) {
    return code;
  }
  return `#!/usr/bin/env node
  const { ${dependencies} } = require("${fullPath}"); 
  ${SEPARATION_STRING} 
  ${code}
  `
}
;

module.exports = function codeGen(ast) {
  let fullPath = path.join(__dirname, 'support-lib.js');
  let dependencies = Array.from(ast.dependencies).join(", "); 
  let output = template(dependencies, fullPath, recast.print(ast.ast).code);
  return output;  
}