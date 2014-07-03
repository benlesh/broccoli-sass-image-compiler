/**
 *	broccoli-sass-image-compiler
 *  ©2014 Ben Lesh <ben@benlesh.com>
 *  MIT License <https://github.com/blesh/broccoli-sass-image-compiler/blob/master/LICENSE.txt>
 */

var Writer = require('broccoli-writer');
var DataURI = require('datauri');
var helpers = require('broccoli-kitchen-sink-helpers');
var path = require('path');
var fs = require('fs');
var mkdirp = require('mkdirp');

function ImageCompiler(inputTree, options){
	if(!(this instanceof ImageCompiler)) {
		return new ImageCompiler(inputTree, options);
	}
	this.options = options || {};
	this.inputTree = inputTree;
	this.inputFiles = options.inputFiles;
	this.outputFile = options.outputFile;
}

ImageCompiler.prototype.constructor = ImageCompiler;

ImageCompiler.prototype = Object.create(Writer.prototype);

ImageCompiler.prototype.write = function(readTree, destDir) {
	var self = this;

	return readTree(self.inputTree).then(function(srcDir){
		var inputFiles = helpers.multiGlob(self.inputFiles, { cwd: srcDir });

		var output = inputFiles.map(function(filepath) {
			var dataUri = new DataURI(filepath);
			var uri = dataUri.content;
			var varname = path.basename(filepath, path.extname(filepath));
			return '$' + varname + ': ' + dataUri.content + '; //' + filepath;
		});

    helpers.assertAbsolutePaths([self.outputFile]);
    mkdirp.sync(path.join(destDir, path.dirname(self.outputFile)));
    fs.writeFileSync(path.join(destDir, self.outputFile), output.join('\n'));
	});
};