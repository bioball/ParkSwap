module.exports = function(grunt){

  grunt.initConfig({
    'concat': {
      'dist': {
        'src': ['public/client/main.js', 'public/client/**/*.js'],
        'dest': 'public/client/application.js'
      }
    },
    'sass': {
      'dist': {
        'options': {
          'style': 'expanded'
        },
        'files': {
          'public/stylesheets/style.css': 'public/stylesheets/style.sass'
        }
      }
    },
    'mochaTest': {
      'test': {
        'options': {
          'reporter': 'spec'
        },
        'src': ['spec/server/*.js', 'spec/server/**/*.js']
      }
    },
    'nodemon': {
      'dev': {
        'options': {
          'file': 'app/main.js',
          'nodeArgs': ['--debug']
        }
      }
    },
    'node-inspector': {
      'default': {}
    },
    'concurrent': {
      'dev': {
        'tasks': ['nodemon', 'node-inspector']
      }
    },
    'clean': {
      'build': ['public/client/application.js']
    },
    'watch': {
      'css': {
        'files': ['public/stylesheets/*.scss', 'public/stylesheets/*.sass', 'public/stylesheets/partials/*.sass'],
        'tasks': ['sass']
      },
      'js': {
        'files': ['public/client/config/*.js', 'public/client/controllers/*.js', 'public/client/directives/*.js', 'public/client/services/*.js', 'public/client/views/*.js'],
        'tasks': ['clean', 'concat']
      }
    }
  });

  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-node-inspector');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('default', 'concurrent:dev');
};