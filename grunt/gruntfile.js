/* Change the destination and source file details as needed */

module.exports = function(grunt){

    //Grunt Configuration
    grunt.initConfig({
        // Concat specifications and locations
        concat:{
            js:{
                //choosing every files with '.js' extensions
                src:['../js/**/*.js'],
                //saving the concated scripts at a single folder
                dest: 'concated/script.js'
            },
            css:{
                //choosing every files with '.css' extensions
                src:['../css/**/*.css'],
                //saving the concated scripts at a single folder
                dest: 'concated/style.css'
            }
        },
        // Minifying the css files
        cssmin: {
            options: {
              mergeIntoShorthands: false,
              roundingPrecision: -1
            },
            target: {
              files: {  
                '../../htdocs/src/css/master.css': ['concated/style.css'] //destination : [src]
              }
            }
          },
          //minifying the js files
          uglify: {
            options: {
              mangle: false
            },
            my_target: {
              files: {
                'uglified/uglified.js': ['concated/script.js'] //destination : [src]
              }
            }
          },
          //obfuscating the minified js files
          obfuscator: {
            options: {
              debugProtection: true,
              debugProtectionInterval: true,
              //Locks the domain so that no one can inspect
              domainLock: ['pixlet.selfmade.chat']
            },
            task1: {
              
              files:{
                '../../htdocs/src/js/master.js': [
                  'uglified/uglified.js',
                ] //destination : [src]
              }
            }
          },
          watch: {
            css: {
              files: ['../css/**/*.css'],
              tasks: ['concat:css', 'cssmin'],
              options: {
                spawn: false,
              },
            },
            
            
            js: {
              files: ['../js/**/*.js'],
              tasks: ['concat:js', 'uglify', 'obfuscator'],
              options: {
                spawn: false,
              },
            },
          },
    
      });

    //Loading plugins
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-obfuscator');
    grunt.loadNpmTasks('grunt-contrib-watch');
    


    //Registering tasks
    grunt.registerTask('default',['obfuscator', 'concat', 'cssmin', 'uglify', 'watch']);
  

};