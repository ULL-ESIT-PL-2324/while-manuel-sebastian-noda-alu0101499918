#!/bin/bash

# Examples
# t.sh echo test-name 
#   # prints the contents of test/data/input/test-test-name.calc
# t.sh ready test-name
#   # executes 
    # if bin/calc2js.mjs test/data/input/test"$1".calc -o test/data/expectedjs/correct"$1".js; then
    # and then executes
    # node test/data/expectedjs/correct"$1".js > test/data/expectedout/correct-out"$1".txt
    #if there are errors echoes the errors
# t.sh check test-name
#   # executes check.sh test-name
# t.sh ready-add test-name
#   # executes ready-add.sh test-name


COMMAND=$1
shift
case $COMMAND in
  echo)
    testName="test/data/input/test"$1".calc"
    echo File: $testName
    cat $testName
    echo
    ;;
  ready)
    testName="test/data/input/test"$1".calc"
    if bin/calc2js.mjs $testName -o test/data/expectedjs/correct"$1".js; then
        node test/data/expectedjs/correct"$1".js > test/data/expectedout/correct-out"$1".txt
    else
      echo "input has errors"
      echo $?
    fi 
    ;;
  check)
    bin/calc2js.mjs test/data/input/test"$1".calc -o test/data/actualjs/out"$1".js
    if [ -f test/data/expectedjs/correct"$1".js ]; then
        diff --color=auto test/data/actualjs/out"$1".js test/data/expectedjs/correct"$1".js
    fi
    pygmentize -g test/data/actualjs/out"$1".js
    ;;
  ready-add)
    testName=test/data/input/test"$1".calc
    if bin/calc2js.mjs test/data/input/test"$1".calc -o test/data/expectedjs/correct"$1".js; then
        node test/data/expectedjs/correct"$1".js > test/data/expectedout/correct-out"$1".txt
        node test/scripts/push-description.mjs $1
        npx mocha --grep "test$1\\.calc" test/test.mjs
    else
      cat $testName
      echo "$testName input has errors"
      echo $?
    fi 
    ;;
  mocha)
    npx mocha --grep "test$1" test/test.mjs
    ;;
  *)
    echo "Unknown command: $COMMAND"
    ;;
esac
