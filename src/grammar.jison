%{
const { 
  buildRoot, 
  buildBinaryExpression, 
  buildLiteral, 
  buildUnaryExpression,
  buildCallExpression, 
  //buildIdentifierOrCalls,
  buildIdentifier,
  buildAssignmentExpression,
  buildSequenceExpression,
  buildCallMemberExpression,
  buildMax,
  buildMin,
  buildArrowFunctionExpression,
  buildFunctionExpression,
  buildLogicalExpression,
  buildParOrCallExpression,
  buildWhileExpression,
  buildForExpression
} = require('./ast-build');
// Prefix with '$'' all user input variables to avoid collisions with our own compiler variables
const {$} = require('./utils.js')
%}

// complete with the missing operators
%left ','
%right '='
%nonassoc '<' '>'
%left '&&' '||'
%nonassoc '==' 
%left '@'
%left '&'
%left '-' '+'
%left '*' '/'
%nonassoc UMINUS
%right '**'
%left '!'
%%
es: e { return { ast: buildRoot($e) }; }
;

e: 
    e ',' e             { $$ = buildSequenceExpression([$e1, $e2])  }
  | ID '=' e            { $$ = buildAssignmentExpression($($ID), '=', $e); }
  | e '==' e            { $$ = buildCallMemberExpression($e1, 'equals', [$e2]); }   
  | e '<' e             { $$ = buildCallMemberExpression($e1, 'lessThan', [$e2]); } 
  | e '>' e             { $$ = buildCallMemberExpression($e1, 'greaterThan', [$e2]); }   
  | e '&&' e            { $$ = buildLogicalExpression($e1, '&&', $e2); }   
  | e '||' e            { $$ = buildLogicalExpression($e1, '||', $e2); } 
  | '!' e               { $$ = buildUnaryExpression('!', $e); }  
  | e '@' e             { $$ = buildMax($e1, $e2, true); }
  | e '&' e             { $$ = buildMin($e1, $e2, true); }
  | e '-' e             { $$ = buildCallMemberExpression($e1, 'sub', [$e2]); }
  | e '+' e             { $$ = buildCallMemberExpression($e1, 'add', [$e2]); }
  | e '*' e             { $$ = buildCallMemberExpression($e1, 'mul', [$e2]); }
  | e '/' e             { $$ = buildCallMemberExpression($e1, 'div', [$e2]); }
  | e '**' e            { $$ = buildCallMemberExpression($e1, 'pow', [$e2]); }
  | '(' e ')'  apply    { $$ = buildParOrCallExpression($e, $apply); }
  | '-' e %prec UMINUS  { $$ = buildCallMemberExpression($e, 'neg', []); }
  | e '!'               { $$ = buildCallExpression('factorial', [$e], true); }
  | N                   { $$ = buildCallExpression('Complex',[buildLiteral($N)], true); }
  | TRUE                { $$ = buildLiteral(true); }
  | FALSE               { $$ = buildLiteral(false); }
  | STRING              { $$ = buildLiteral($STRING); }
  | WHILE  // fill in
  | FOR    // fill in
  | PID '(' eList ')'   { /* fill in. Allow for list of arguments */ }
  | ID  apply           { $$ = buildParOrCallExpression(buildIdentifier($($ID)), $apply); }
  | FUN '(' idOrEmpty ')' '{' e '}'   
                        { $$ = buildFunctionExpression($idOrEmpty, $e); } 
;

apply:
    /* empty */      { $$ = []; }
  | '('  ')' apply   { $$ = [ null ].concat($apply); }
  | '(' e ')' apply  { $$ = [$e].concat($apply); }
;

idOrEmpty:
   /* empty */    { $$ = []; } 
  | ID            { $$ = [ buildIdentifier($($ID)) ]; }   
;

eList: 
  // fill in
;