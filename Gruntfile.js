module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    watch: {
      files: [
        '.eslintrc',
        'spec/.eslintrc',
        'Gruntfile.js',
        'src/**/*.js',
        'spec/**/*.js'
      ],
      tasks: [
        'clear', 'clean',
        'clear', 'babel:dev',
        'clear', 'eslint',
        'clear', 'test'
      ]
    },

    clean: ['lib'],

    babel: {
      dist: {
        files: [{
          expand: true,
          src: '**/*',
          cwd: 'src',
          dest: 'lib'
        }]
      },
      dev: {
        options: {
          sourceMap: true
        },
        files: [{
          expand: true,
          src: '**/*',
          cwd: 'src',
          dest: 'lib'
        }]
      }
    },

    eslint: {
      target: [
        'Gruntfile.js',
        'lib/*.js',
        'spec/*.js'
      ]
    },

    jasmine_nodejs: {
      options: {
        specNameSuffix: "spec.js",
        helperNameSuffix: "helper.js",
        useHelpers: true,
        stopOnFailure: true,
        reporters: {
          console: {
            colors: true,
            cleanStack: 1,
            verbosity: 4,
            listStyle: "indent",
            activity: false
          }
        }
      },
      your_target: {
        specs: [
          "spec/**/*.js"
        ],
        helpers: [
          "spec/helpers/**"
        ]
      }
    }
  });

  grunt.registerTask('dist', ['clear', 'babel:dist']);
  grunt.registerTask('test', ['jasmine_nodejs']);
  grunt.registerTask('dev', ['watch']);
  grunt.registerTask('default', ['test', 'eslint']);
};
