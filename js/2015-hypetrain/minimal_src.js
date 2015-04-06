// miniMAL
// Copyright (C) 2014 Joel Martin
// Licensed under MPL 2.0

// 2 args: eval_ast, 3 args: env_bind
function eval_ast_or_bind(ast, env, exprs) {
    if (exprs) {
        // Return new Env with symbols in ast bound to
        // corresponding values in exprs
        env = Object.create(env);
        for (var i=0; i<ast.length; i++) {
            if (ast[i] == "&") {
                // variable length arguments
                env[ast[i+1]] = Array.prototype.slice.call(exprs, i);
                break;
            } else {
                env[ast[i]] = exprs[i];
            }
        }
        return env;
    }
    // Evaluate the form/ast
    return Array.isArray(ast)                        // list?
        ? ast.map(function(e){return EVAL(e, env);}) // list
        : (typeof ast == "string")                   // symbol?
            ? ast in env                             // symbol in env?
                ? env[ast]                           // lookup symbol
                : null[ast]                          // undefined symbol
            : ast;                                   // ast unchanged
}

function EVAL(ast, env) {
  while (true) {
    //console.log("EVAL:", ast);
    if (!Array.isArray(ast)) return eval_ast_or_bind(ast, env);

    // apply
    if (ast[0] == "def") {        // update current environment
        return env[ast[1]] = EVAL(ast[2], env);
    } else if (ast[0] == "let") { // new environment with bindings
        env = Object.create(env);
        for (var i in ast[1]) {
            if (i%2) {
                env[ast[1][i-1]] = EVAL(ast[1][i], env);
            }
        }
        ast = ast[2]; // TCO
    } else if (ast[0] == "`") {   // quote (unevaluated)
        return ast[1];
    } else if (ast[0] == ".-") {  // get or set attribute
        var el = eval_ast_or_bind(ast.slice(1), env);
        var x = el[0][el[1]];
        return 2 in el ? el[0][el[1]] = el[2] : x;
    } else if (ast[0] == ".") {   // call object method
        var el = eval_ast_or_bind(ast.slice(1), env);
        var x = el[0][el[1]];
        return x.apply(el[0], el.slice(2));
    } else if (ast[0] == "do") {  // multiple forms (for side-effects)
        var el = eval_ast_or_bind(ast.slice(1,ast.length-1), env);
        ast = ast[ast.length-1]; // TCO
    } else if (ast[0] == "if") {  // branching conditional
        ast = EVAL(ast[1], env) ? ast[2] : ast[3]; // TCO
    } else if (ast[0] == "fn") {  // define new function (lambda)
        var f = function() {
            return EVAL(ast[2], eval_ast_or_bind(ast[1], env, arguments));
        }
        f.ast = [ast[2], env, ast[1]]; // f.ast compresses more than f.data
        return f;
    } else {                      // invoke list form
        var el = eval_ast_or_bind(ast, env);
        var f = el[0];
        if (f.ast) {
            ast = f.ast[0];
            env = eval_ast_or_bind(f.ast[2], f.ast[1], el.slice(1)); // TCO
        } else {
            return f.apply(f, el.slice(1))
        }
    }
  }
}

E = Object.create(this);
E["js"]    = eval;
E["eval"]  = function(a)   { return EVAL(a, E); }

// These could all also be interop
E["="]     = function(a,b) { return a===b; }
E["<"]     = function(a,b) { return a<b; }
E["+"]     = function(a,b) { return a+b; }
E["-"]     = function(a,b) { return a-b; }
E["*"]     = function(a,b) { return a*b; }
E["/"]     = function(a,b) { return a/b; }
///E["isa"]   = function(a,b) { return a instanceof b; }
///E["type"]  = function(a)   { return typeof a; }
///E["new"]   = function(a)   { return new (a.bind.apply(a, arguments)); }
///E["list"]  = function(a,b) { return Array.prototype.slice.call(arguments); }
E["map"]   = function(a,b) { return b.map(a); }
///E["throw"] = function(a)   { throw(a); }
///E["del"]   = function(a,b) { return delete a[b]; }

///E["read-string"] = function(a) { return JSON.parse(a); }
///E["slurp"] = function(a)   { return require('fs').readFileSync(a,'utf-8'); }
///E["load-file"] = function(a) { return EVAL(JSON.parse(E["slurp"](a)),E);  }

// Web specific
b.innerHTML = '<textarea rows=9 cols=60>["let",["m",["`","mini"]],["+","m",["`","MAL"]]]\n["def","fac",["fn",["n"],["if","n",["*","n",["fac",["-","n",1]]],1]]]\n["map","fac",["`",[7,8,9]]]\n[".","Math",["`","random"]]</textarea><textarea rows=9 cols=60></textarea>';
//b.innerHTML = '<textarea rows=9 cols=60>["let",["m",["`","mini"]],["+","m",["`","MAL"]]]\n["def","fac",["fn",["n"],["if","n",["*","n",["fac",["-","n",1]]],1]]]\n["map","fac",["`",[7,8,9]]]\n[".-", [".-",[".-","t",1],["`","style"]],["`","color"],["`","red"]]</textarea><textarea rows=9 cols=60></textarea>';

t = b.children;
t[0].onkeyup = function(){
    t[1].value = t[0].value.split('\n').map(function(a) {
        return a ? JSON.stringify(EVAL(JSON.parse(a),E)):'';
    }).join('\n');
};
t[0].onkeyup();
