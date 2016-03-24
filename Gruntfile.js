// do not show debug from nodemon express and send
var debugNamespaces = '*,-nodemon*,-express*,-send';

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    dirs: {
      client: {
        src: 'client',
        dest: 'client/assets'
      },
      server: {
        src: 'server',
        dest: 'server'
      }
    },

    casperjsArgs: '--host=http://localhost:3000 --includes=client/scripts/controllers/tests/config/config.js',

    clean: {
      options: {
        force: true // delete outside path
      },
      default: ['<%= dirs.client.dest %>', '.tmp']
    },

    sass: {
      default: {
        files: [{
          expand: true,
          cwd: '<%= dirs.client.src %>/styles',
          src: ['*.scss'],
          dest: '.tmp',
          ext: '.tmp.css'
        }]
      }
    },

    // autoprefix css and does nano(minify)
    postcss: {
      options: {
        processors: [
          require('autoprefixer')({
            browsers: ['last 2 versions']
          })
        ]
      },
      debug: {
        files: [{
          expand: true,
          cwd: '.tmp',
          src: ['*.tmp.css'],
          dest: '<%= dirs.client.dest %>/css/',
          ext: '.debug.css'
        }]
      },
      min: {
        options: {
          processors: [
            require('cssnano')()
          ]
        },
        files: [{
          expand: true,
          cwd: '.tmp',
          src: ['*.tmp.css'],
          dest: '<%= dirs.client.dest %>/css/',
          ext: '.min.css'
        }]
      }
    },

    jshint: {
      options: {
        reporter: require('jshint-stylish'),
        expr: true // ignore chai.expect expr syntax warning
      },
      default: {
        src: [
          'GruntFile.js', 
          '<%= dirs.server.src %>/**/*.js',
          '<%= dirs.client.src %>/scripts/*.js',
          '!<%= dirs.client.src %>/scripts/yapi.js', // ignore yapi.js/
          '<%= dirs.client.src %>/scripts/components/*.js',
          '<%= dirs.client.src %>/scripts/controllers/*.js',
        ]
      }
    },

    nodemon: {
      local: {
        script: 'index.js',
        options: {
          env: {
            DEBUG: debugNamespaces,
            NODE_ENV: 'local'
          }
        }
      },
      dev: {
        script: 'index.js',
        options: {
          env: {
            DEBUG: debugNamespaces
          }
        }
      }
    },

    run: {
      options: {
        wait: false
      },
      local: {
        exec: 'DEBUG=' + debugNamespaces + ' NODE_ENV=local node index.js'
      },
      production: {
        exec: 'NODE_ENV=production node index.js'
      },
      webpack: {
        options: {
          wait: true
        },
        exec: 'node ./node_modules/webpack/bin/webpack.js --display-chunks'
      },
      'webpack-min': {
        options: {
          wait: true
        },
        exec: 'node ./node_modules/webpack/bin/webpack.js --display-chunks -p'
      },
      casperjs: {
        options: {
          wait: true
        },
        exec: './node_modules/casperjs/bin/casperjs test <%= dirs.client.src %>/scripts/controllers/tests/*.js <%= casperjsArgs %>'
      },
      'casperjs-xunit': {
        options: {
          wait: true
        },
        exec: './node_modules/casperjs/bin/casperjs test <%= dirs.client.src %>/scripts/controllers/tests/*.js <%= casperjsArgs %> --xunit=coverage/client/controllers/report.xml'
      }
    },

    copy: {
      fonts: {
        files: [
          {
            expand: true,
            cwd: '<%= dirs.client.src %>/styles/fontawesome/fonts/',
            src: ['*'],
            dest: '<%= dirs.client.dest %>/fonts'
          }
        ]
      },
      images: {
        files: [
          {
            expand: true,
            cwd: '<%= dirs.client.src %>/images/',
            src: ['*'],
            dest: '<%= dirs.client.dest %>/images'
          }
        ]
      },
      yapi: {
        files: [
          {
            expand: true,
            flatten: true,
            cwd: '<%= dirs.client.src %>/scripts/yapi.js/dist',
            src: ['yapi.min.js'],
            dest: '<%= dirs.client.dest %>/js'
          },
          {
            expand: true,
            cwd: '<%= dirs.client.src %>/scripts/yapi.js/dist/ui',
            src: ['default-ui.min.css'],
            dest: '<%= dirs.client.dest %>/css'
          },
          {
            expand: true,
            cwd: '<%= dirs.client.src %>/scripts/yapi.js/dist/ui/images',
            src: ['*'],
            dest: '<%= dirs.client.dest %>/images'
          }
        ]
      }
    },

    // server side test cases
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          clearRequireCache: true
        },
        src: [
          '<%= dirs.server.src %>/test/spec/**/*.js'
        ]
      }
    },

    // code coverage
    mocha_istanbul: {
      coverage: {
        src: [
          '<%= dirs.server.src %>/test/spec/**/*.js'
        ],
        options: {
          mask: '*Spec.js',
          coverageFolder: 'coverage/server/'
        }
      }
    },

    watch: {
      options: {
        spawn: false
      },
      server: {
        // include src files and test/ files
        // except files under test/helpers/
        files: [
          '<%= dirs.server.src %>/**/*.js',
          '!<%= dirs.server.src %>/helpers/**/*.js',
        ],
        tasks: ['jshint', 'mochaTest'/*, 'mocha_istanbul'*/]
      },
      'non-server': {
        files: [
          '<%= dirs.server.src %>/helpers/**/*.js',
        ], 
        tasks: ['jshint', 'mochaTest', 'mocha_istanbul']
      },
      style: {
        files: [
          '<%= dirs.client.src %>/styles/*.scss',
        ],
        tasks: ['style']
      },
      jshint: {
        files: [
          '<%= dirs.client.src %>/scripts/**/*.js',
          '!**/node_modules/**'
        ],
        tasks: ['jshint']
      },
      webpack: {
        files: [
          '<%= dirs.client.src %>/scripts/**/*',
          '!<%= dirs.client.src %>/scripts/controllers/tests/*',
          '!**/node_modules/**'
        ],
        tasks: ['run:webpack']
      },
      'client-controller': {
        files: [
          '<%= dirs.client.src %>/scripts/controllers/**/*.js'
        ],
        tasks: ['run:casperjs']
      }
    }
  });

  // On watch events, if the changed file is a test file then configure mochaTest to only
  // run the tests from that file. Otherwise run all the tests
  var defaultTestSrc = grunt.config('mochaTest.test.src');
  grunt.event.on('watch', function (action, filepath) {
    grunt.config('mochaTest.test.src', defaultTestSrc);

    if (filepath.match(grunt.config('dirs.server.src') + '/test')) {
      // overwrite mochaTest.test.src
      grunt.config('mochaTest.test.src', filepath);
    }

    // overwrite casperjs.exec
    // to run only changed casperjs script
    // it can be controller or test itself
    // verify by name
    // so we must name test suffixed with `Test`
    function replaceCtrlToTest(filepath) {
      var splited = filepath.split('/');
      splited[splited.length] = splited[splited.length-1];
      splited[splited.length-2] = 'tests';
      splited[splited.length-1] = splited[splited.length-1].replace(/\./, 'Test.');
      return splited.join('/');
    }

    if (filepath.match(grunt.config('dirs.client.src') + '/scripts/controllers')) {
      // if controller is changing
      // replace it with controllerName + 'Test'

      var newExec;
      if (/Test/.test(filepath)) {
        newExec = './node_modules/casperjs/bin/casperjs test ' + filepath + ' ' + grunt.config('casperjsArgs');
      } else {
        newExec = './node_modules/casperjs/bin/casperjs test ' + replaceCtrlToTest(filepath) + ' ' + grunt.config('casperjsArgs');
      }
      console.log('new exec', newExec);
      grunt.config('run.casperjs.exec', newExec);
    }

    // only run jshint on changed files
    grunt.config('jshint.default.src', filepath);
  });

  grunt.registerTask('style', [
    'copy:fonts',
    'sass',
    'postcss:debug'
  ]);

  grunt.registerTask('style-min', [
    'copy:fonts',
    'sass',
    'postcss:min'
  ]);

  grunt.registerTask('debug', [
    'clean',
    'jshint',
    'copy:images',
    'copy:yapi',
    'style',
    'run:webpack'
  ]);

  grunt.registerTask('test', [
    'mochaTest',
    'mocha_istanbul',
    'run:local',
    'run:casperjs'
  ]);

  grunt.registerTask('build', [
    'clean',
    'jshint',
    'copy:images',
    'copy:yapi',
    'style-min',
    'run:webpack-min'
  ]);
};
