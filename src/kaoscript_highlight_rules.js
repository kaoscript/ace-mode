/**
 * kaoscript_highlight_rules.js
 * Version 0.1.0
 * October 8th, 2016
 *
 * Copyright (c) 2016 Baptiste Augrain
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 **/
define(function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var KaoscriptHighlightRules = function() {
	this.$rules = {
        start: [
        	{
				regex: /'/,
				token: 'string',
				next: 'string_dq'
			},
			{
				regex: /'/,
				token: 'string',
				next: 'string_sq'
			},
			{
				regex: /`/,
				token: 'string.quasi.start',
				next: 'template'
			},
			{
				regex: /(class|const|func|enum|impl|let|struct|type)(\s+)([a-zA-Z_$][\w$]*)\b/,
				token: ['storage', 'empty', 'variable']
			},
			{
				regex: /\b(?:0(?:b|B)[01]+|0(?:o|O)[0-7]+|0(?:x|X)[0-9a-fA-F]+|[0-9]+(?:\.[0-9]+)?)\b/,
				token: 'number'
			},
			{
				regex: /\b(import)(\s*\{)/,
				token: ['keyword', 'empty'],
				next: 'import_block'
			},
			{
				regex: /\bimport(?!\s*[:\(])\b/,
				token: 'keyword',
				next: 'import_line'
			},
			{
				regex: /\b(?:await|break|catch|continue|do|else|export|extern|finally|for|if|include|return|switch|throw|try|unless|until|while|as|by|from|in|is|of|til|to|with|async|extends|final|private|protected|public|static|new)(?!\s*:)\b/,
				token: 'keyword'
			},
			{
				regex: /\b(?:super|this)(?!\s*:)\b/,
				token: 'constant.other'
			},
			{
				regex: /\b(?:Array|array|Boolean|bool|class|enum|Function|func|Number|number|Object|object|RegExp|String|string)(?!\s*:)\b/,
				token: 'support.class'
			},
			{
				regex: /\b(?:true|false|null|Infinity|NaN)(?!\s*:)\b/,
				token: 'constant.language'
			},
			{
				regex: /#!?\[.*\]/,
				token: 'meta'
			},
			{
				regex: /\/\/.*/,
				token: 'comment'},
			{
				regex: /\/\*/,
				token: 'comment',
				next: 'comment_asterisk'
			},
			{
				regex: /\-{3,}/,
				token: 'comment',
				next: 'comment_dash'
			},
			{
				regex: /[-+\/*=<>!&\|\^\?:]+|\.\.\./,
				token: 'keyword.operator'
			}
        ],
        comment_asterisk: [
			{
				regex: /.*?\*\//,
				token: 'comment',
				next: 'start'
			},
			{
				regex: /.*/,
				token: 'comment'
			}
		],
		comment_dash: [
			{
				regex: /\-{3,}/,
				token: 'comment',
				next: 'start'
			},
			{
				regex: /.*/,
				token: 'comment'
			}
		],
		import_block: [
			{
				regex: /}/,
				token: 'empty',
				next: 'start'
			},
			{
				regex: /\b(from)(\s*[^:].*$)/,
				token: ['keyword', 'empty']
			},
			{
				regex: /\bas(?!\s*:)\b/,
				token: 'keyword'
			},
			{
				regex: /[a-zA-Z_$][\w$]*/,
				token: 'variable'
			}
		],
		import_line: [
			{
				regex: /\b(from)(\s*[^:].*$)/,
				token: ['keyword', 'empty'],
				next: 'start'
			},
			{
				regex: /\bas(?!\s*:)\b/,
				token: 'keyword'
			},
			{
				regex: /[a-zA-Z_$][\w$]*/,
				token: 'variable'
			}
		],
		string_dq: [
			{
				regex: /'/,
				token: 'string',
				next: 'start'
			},
			{
				regex: /(?:[^\\']|\\(?:.|$))*/,
				token: 'string'
			}
		],
		string_sq: [
			{
				regex: /'/,
				token: 'string',
				next: 'start'
			},
			{
				regex: /(?:[^\\']|\\(?:.|$))*/,
				token: 'string'
			}
		],
		template: [
			{
				regex: /`/,
				token: 'string.quasi.end',
				next: 'start'
			},
			{
				regex: /\\\(/,
				token: 'paren.quasi.start',
				next: 'template_var'
			},
			{
				regex: /(?:[^\\`]|\\(?:[^\(]|$))*/,
				token: 'string.quasi'
			}
		],
		template_var: [
			{
				regex: /\)/,
				next: 'paren.quasi.end'
			},
			{
				regex: /[a-zA-Z_$][\w$]*/,
				token: 'variable'
			}
		]
    };
    
    this.normalizeRules();
};

KaoscriptHighlightRules.metaData = {
    name: "kaoscript",
    scopeName: "source.ks",
    fileTypes: ["ks"]
}


oop.inherits(KaoscriptHighlightRules, TextHighlightRules);

exports.KaoscriptHighlightRules = KaoscriptHighlightRules;
});