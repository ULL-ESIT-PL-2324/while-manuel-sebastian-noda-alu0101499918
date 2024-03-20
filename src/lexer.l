%{
const reservedWords = ["fun", "true", "false", "i", "while", "for"]  
const predefinedIds = ["print", "write" ]

function removeQuotes(s) {
  return s.substring(1, s.length - 1);
}

const idOrReserved = text => {
                 if (reservedWords.find(w => w == text)) return text.toUpperCase();
                 if (predefinedIds.find(w => w == text)) return 'PID'
                 return 'ID';
               }
%}
number [0-9]+(\.[0-9]+)?([eE][+-]?[0-9]+)?"i"?|"i"
string \"([^\"\\]|\\.)*\"

%%
\s+            /* skip whites */;
"#".*          /* skip comments */;
{number}       return 'N';
{string}       { yytext = removeQuotes(yytext); return 'STRING'; }
[a-zA-Z_]\w*   return idOrReserved(yytext); // must be after number
'**'           return '**';
'=='           return '==';
'&&'           return '&&';
'||'           return '||';
[-=+*/!(),<>@&{}\[\];]  return yytext;
