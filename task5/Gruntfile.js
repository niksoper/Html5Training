module.exports = function (grunt) {

    // load the tasks
    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Configure grunt here
    grunt.initConfig({
        ts: {
            options: {
                module: 'amd',     // compile to commonjs or amd?
                sourcemap: false        // generate .js.map files?
            },
            dev: {
                src: ["app/**/*.ts"],   // compile all .ts files in the app directory
                //watch: 'app'            // watch the app directory for changes
            },
        },
        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'app/scss',
                    src: ['*.scss'],
                    dest: 'app/css',
                    ext: '.css'
                }]
            }
        },
        watch: {
            css: {
                files: 'app/scss/*.scss',
                tasks: ['sass']
            },
            ts: {
                files: 'app/ts/**/*.ts',
                tasks: ['ts:dev']
            }
        }
    });

    grunt.registerTask('default', ['ts:dev', 'sass', 'watch']);
}