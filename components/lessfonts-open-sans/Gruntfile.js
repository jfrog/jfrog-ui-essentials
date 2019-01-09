module.exports = function(grunt) {

    grunt.initConfig({

        /*
        ** CSS Tasks
        */

        // Process Less into CSS
        less: {
            build: {
                files: {
                    'dist/css/open-sans.css': 'src/less/open-sans.less',
                }
            }
        },

        // Minify the processed CSS
        cssmin: {
            build: {
                files: {
                    'dist/css/open-sans.min.css': 'dist/css/open-sans.css',
                }
            }
        },

        /*
        ** Monitoring Tasks
        */

        // Watch files and run tasks when necessary
        watch: {
            css: {
                files: ['src/less/*.less'],
                tasks: ['less', 'cssmin']
            }
        },

        // Run monitoring tasks concurrently
        concurrent: {
            options: {
                logConcurrentOutput: true
            },
            tasks: ['watch']
        }

    });

    /*
    ** Grunt Tasks
    */
    
    // Load grunt tasks
    require('load-grunt-tasks')(grunt);

    // Default grunt task (runs when grunt is used without modifiers)
    grunt.registerTask('default', ['less', 'cssmin', 'concurrent']);

};