module.exports = function (grunt) {  
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
    // Project configuration.  
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
		copy: {
		  main: {
		    files: [
				{src: 'src/manifest.json',	dest: 'dist/manifest.json'},
				{src: '**', cwd: 'src/_locales/', expand: true, dest: 'dist/_locales/'},
				{src: '**', cwd: 'src/css/', expand: true, dest: 'dist/css/'},
				{src: '**', cwd: 'src/icons/', expand: true, dest: 'dist/icons/'},
				{src: '**', cwd: 'src/page_action/', expand: true, dest: 'dist/page_action/'},
				{src: '**', cwd: 'src/js/libs/', expand: true, dest: 'dist/js/libs/'},
			]
		  },
		},
        uglify: {  
            options: {  
                compress: true  
            },  
            background: {
                src: [
					'src/js/bg/background.js',
                ],
                dest: 'dist/js/bg/background.js'  
            },
		    inject: {
                src: [
					'src/js/inject/inject.js',
                ],
                dest: 'dist/js/inject/inject.js'  
            }
        },
		compress: {
		  main: {
			options: {
			  archive: 'dist/myspass.zip'
			},
			files: [
				{src: '**', cwd: 'dist/', expand: true, dest: ''},
			]
		  }
		}
    });  
    // Default task.  
    grunt.registerTask('default', ['copy', 'uglify', 'compress']);  
};