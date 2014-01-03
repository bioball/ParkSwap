module.exports = function(grunt){
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-node-inspector');

  grunt.initConfig({
    'mochaTest': {
      'test': {
        'options': {
          'reporter': 'spec'
        },
        'src': ['spec/node/*.js', 'spec/node/**/*.js']
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
    }
  });

  grunt.registerTask('default', 'concurrent:dev');
};