broccoli-sass-image-compiler
====

### MIT License

This is a broccoli library for processing image files and creating SASS variables with Data URIs in them.

### NOTES:

1. file names must make good SASS variable names. Names like "my awesome image.gif" will not work because of the spaces.
2. file names don't need the $ prefix.
3. file names should be unique regardless of folder depth. This script is "dumb" and just uses the file name.
4. Do a little dance.
5. Make a little love.
6. Get down tonight.

## Usage

```JavaSript
var sassImageCompiler = require('broccoli-sass-image-compiler');

var imageTree = sassImageCompiler('/some_dir', {
	inputFiles: [
		'**/*.png', // all png files
		'someFile.svg' // specific svg file
	],

	// specify the output file you want created
	outputFile: '/compiled-images.scss'
});
```


Then in your SASS

```SCSS
@import 'path/to/compiled-images';

.custom-class {
	background-image: url($someFile); // derived from 'someFile.svg'
}

.other-class {
	background-image: url($icon_16x16); // if you had a file named "whatever/icon_16x16.png"
}
```