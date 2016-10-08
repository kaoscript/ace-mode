/**
 * kaoscript.js
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
var TextMode = require("./text").Mode;
var KaoscriptHighlightRules = require("./kaoscript_highlight_rules").KaoscriptHighlightRules;
var MatchingBraceOutdent = require("./matching_brace_outdent").MatchingBraceOutdent;
var CstyleBehaviour = require("./behaviour/cstyle").CstyleBehaviour;
var CStyleFoldMode = require("./folding/cstyle").FoldMode;

var Mode = function() {
	this.HighlightRules = KaoscriptHighlightRules;
	
	this.$outdent = new MatchingBraceOutdent();
	this.$behaviour = new CstyleBehaviour();
	this.foldingRules = new CStyleFoldMode();
};
oop.inherits(Mode, TextMode);

(function() {
	this.$id = "ace/mode/kaoscript";
	
	this.lineCommentStart = "//";
	this.blockComment = {start: "/*", end: "*/"};
}).call(Mode.prototype);

exports.Mode = Mode;
});