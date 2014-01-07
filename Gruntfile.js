module.exports = function(grunt){
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-node-inspector');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
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
      default: {}
    },
    'concurrent': {
      'dev': {
        'tasks': ['nodemon', 'node-inspector']
      }
    },
    'watch': {
      'css': {
        'files': ['public/stylesheets/*.scss', 'public/stylesheets/*.sass'],
        'tasks': ['sass']
      }
    }
  });

  grunt.registerTask('default', 'concurrent:dev');
};