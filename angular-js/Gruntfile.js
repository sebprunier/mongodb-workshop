module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        // Directories
        reportsDir: 'reports',
        // delete files and folders
        clean: ['<%= reportsDir %>'],
        // JSHint
        jshint: {
            all: ['app/app.js', 'app/controller/*.js', 'app/filters/*.js'],
            options: {
                reporter: 'checkstyle',
                reporterOutput: '<%= reportsDir %>/checkstyle.xml',
                force: true,
                globals: {
                    angular: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('default', ['clean', 'jshint']);
};