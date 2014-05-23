module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: ['app/app.js', 'app/controller/*.js', 'app/filters/*.js']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');


    grunt.registerTask('default', ['jshint']);
};