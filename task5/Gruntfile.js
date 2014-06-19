module.exports = function (grunt) {

    // load the tasks
    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jasmine');

    // Configure grunt here
    grunt.initConfig({
        ts: {
            options: {
                module: 'amd',     // compile to commonjs or amd?
                sourcemap: false        // generate .js.map files?
            },
            dev: {
                src: ["app/**/*.ts"],   // compile all .ts files in the app directory
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
        },
        connect: {
            test : {
              port : 8000
            }
        },
        jasmine: {
            taskName: {
                src: 'app/ts/**/*.js',
                options: {
                    specs: 'test/unit/*Spec.js',
                    host: 'http://localhost:8000/',
                    template: require('grunt-template-jasmine-requirejs'),
                    templateOptions: {
                      requireConfigFile: 'test/test-main.js'
                    }
                }
            }
        }
    });

    grunt.registerTask('default', ['ts:dev', 'sass', 'watch']);
}