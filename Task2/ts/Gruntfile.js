module.exports = function (grunt) {

    // load the task
    grunt.loadNpmTasks("grunt-ts");

    // Configure grunt here
    grunt.initConfig({
        ts: {
            options: {
                module: 'commonjs',     // compile to commonjs rahter than amd
                sourcemap: false        // generate .js.map files?
            },
            dev: {
                src: ["app/**/*.ts"],   // compile all .ts files in the app directory
                watch: 'app'            // watch the app directory for changes
            },
        }
    });

    grunt.registerTask("default", ["ts:dev"]);
}