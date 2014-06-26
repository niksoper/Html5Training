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
                proxies: [
                    {
                        context: '/blockexplorer',
                        host: 'blockexplorer.com',
                        changeOrigin: true,
                        xForward: false,
                        rewrite: {
                            '^/blockexplorer': ''
                        }
                    }
                ],
                options: {
                    port: 8080,
                    base: 'app',
                    logger: 'dev',
                    hostname: 'localhost',
                    middleware: function(connect) {

                        var proxy = require('grunt-connect-proxy/lib/utils').proxyRequest;

                        return [proxy, connect.logger('dev'), mountFolder(connect, 'app')];
                    }
                }
            }
        },
        jasmine: {
            unit: {
                options: {
                    specs: 'test/unit/*Spec.js',
                    //host: 'http://localhost:9000/',
                    template: require('grunt-template-jasmine-requirejs'),
                    templateOptions: {
                        requireConfigFile: 'test/test-main.js'
                    },
                    keepRunner: true
                }
            }
        },
        open: {
            unit: {
                path: 'http://localhost:<%= connect.test.options.port %>/_SpecRunner.html'
            },
            app: {
                path: 'http://localhost:<%= connect.app.options.port %>'
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
                files: ['app/ts/**/*.js', '<%= jasmine.unit.options.specs %>'],
                tasks: ['jasmine']
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
    grunt.loadNpmTasks('grunt-connect-proxy');

    grunt.registerTask('default', ['ts:dev', 'sass', 'jasmine', 'configureProxies:app', 'connect:app', 'connect:test', 'open', 'watch']);
    grunt.registerTask('test', ['connect:test', 'jasmine', 'open:tests', 'watch']);
    grunt.registerTask('server', ['configureProxies:app', 'connect:app']);
};