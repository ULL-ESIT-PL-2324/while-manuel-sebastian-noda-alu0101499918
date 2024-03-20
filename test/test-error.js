const transpile = require("../src/transpile.js");
const assert = require('assert');
const fs = require("fs/promises");

const Tst = require('./test-error-description.js');

const Test = Tst.map(t => ({
  input: __dirname + '/data/input/' + t.input,
  output: __dirname + '/data/actualjs/' + t.output,
  expected: __dirname + '/data/expectedout/' + t.expected,
})
)


function removeSpaces(s) {
  return s.replace(/\s/g, '')
}

for (let i = 0; i < Test.length; i++) {
  it(`transpile(${Tst[i].input}, ${Tst[i].output})`, async () => {

   // Compile the input and check the output program is what expected
   let oldLog = console.error; // mocking console.error
   let result = "";
   console.error = function (...s) {
      //oldLog(...s); 
      result += s.join('')
      return result; 
    }

     await transpile(Test[i].input, Test[i].output);
     let output = result;
     let expected = await fs.readFile(Test[i].expected, 'utf-8')
     //console.log("output\n"+output)
     //console.log("expected\n"+expected)
     assert.equal(removeSpaces(output), removeSpaces(expected));
   console.error = oldLog;
  });
}


