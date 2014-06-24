/*jslint node: true */

module.exports = function (grunt) {

    'use strict';

    var LIVERELOAD_PORT = 35729;
    var lrSnippet = require('connect-livereload')({
      port: LIVERELOAD_PORT
    });

    var mountFolder = function(connect, dir) {
        return connect.static(require('path').resolve(dir));
    };

    // Configure grunt here
    grunt.initConfig({
        ts: {
            options: {
                module: 'amd',     // compile to commonjs or amd?
                sourcemap: false        // generate .js.map files?
            },
            dev: {
                src: ["app/**/*.ts"]   // compile all .ts files in the app directory
            }
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
        connect: {
            test: {
                options: {
                    port: 9000,
                    base: '.',
                    hostname: 'localhost',
                    middleware: function(connect) {
                        return [lrSnippet, mountFolder(connect, '.')];
                    }
                }
            },
            app: {
                options: {
                    port: 8080,
                    base: 'app',
                    hostname: 'localhost',
                    middleware: function(connect) {
                        return [connect.logger('dev'), mountFolder(connect, 'app')];
                    }
                }
            }
        },
        jasmine: {
            unit: {
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
        },
        open: {
            dev: {
                path: 'http://localhost:<%= connect.test.options.port %>/_SpecRunner.html'
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
            },
            tests: {
                files: ['<%= jasmine.unit.src %>', '<%= jasmine.unit.options.specs %>']
            },
            options: {
                livereload: true
            }
        },
        
    });

    // load the tasks
    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('connect-livereload');

    grunt.registerTask('default', ['ts:dev', 'sass', 'connect:app', 'connect:test', 'open', 'watch']);
};