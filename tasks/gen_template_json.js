/*
 *
 */

'use strict';

module.exports = function(grunt) {

	// Please see the Grunt documentation for more information regarding task
	// creation: http://gruntjs.com/creating-tasks

	grunt.registerMultiTask('gen_template_json', 'Generate JSON', function() {
		var dest, prop, obj;
		if (this.data.dest){
			dest = this.data.dest;
		} else {
			grunt.fail.warn('Destination JSON file is missing', 3);
		}

        if ( ! this.data.src) {
            return grunt.fail.warn('Src is missing. Object src: {file: {path: "", method: ""}} or src: {object: {key: value}} required', 3);            
        }

        try {
            if (this.data.src.file && typeof this.data.src.file.path === 'string' && typeof this.data.src.file.method === 'string') {
                var file = require(this.data.src.file.path);
                var method = this.data.src.file.method;
                obj = JSON.parse(JSON.stringify(file[method]()));
                
                // insert template.html
                if (typeof obj.template !== 'undefined') {
                    obj.template = grunt.file.read(config.src.config + "template.html");
                }
            }
            else if (typeof this.data.src.object === 'object') {
                // todo
            }
		} 
        catch (e){
			grunt.log.error(e);
			grunt.fail.warn("Error parsing json the data.", 3);
		}
		grunt.file.write(dest, JSON.stringify(obj, null, 4));
	});

};