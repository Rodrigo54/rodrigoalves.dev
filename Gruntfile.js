var pngquant = require('imagemin-pngquant');
var mozjpeg = require('imagemin-mozjpeg');

module.exports = function(grunt) {
    // Load the plugins.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-banner');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-uncss');

    require('time-grunt')(grunt);
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            main: {
                src: ['js/jquery.js', 'js/bootstrap.js', 'js/<%= pkg.name %>.js'],
                dest: 'js/<%= pkg.name %>.min.js'
            }
        },
        less: {
            expanded: {
                options: {
                    paths: ["css"]
                },
                files: {
                    "css/<%= pkg.name %>.css": "less/<%= pkg.name %>.less"
                }
            },
            minified: {
                options: {
                    paths: ["css"],
                    compress: true
                },
                files: {
                    "css/<%= pkg.name %>.min.css": "less/<%= pkg.name %>.less"
                }
            }
        },
        banner: '/*\n' +
            ' * <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
            ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n' +
            ' */\n',
        usebanner: {
            dist: {
                options: {
                    position: 'top',
                    banner: '<%= banner %>'
                },
                files: {
                    src: ['css/<%= pkg.name %>.css', 'css/<%= pkg.name %>.min.css', 'js/<%= pkg.name %>.min.js']
                }
            }
        },
        watch: {
            scripts: {
                files: ['js/<%= pkg.name %>.js'],
                tasks: ['uglify'],
                options: {
                    spawn: false,
                },
            },
            less: {
                files: ['less/*.less'],
                tasks: ['less'],
                options: {
                    spawn: false,
                }
            },
        },

        imagemin:{
          target: {
            options: {
              optimizationLevel: 3,
              progressive: true,
              use: [pngquant(), mozjpeg()]
            }, // options
            files: [{
              expand: true,
              cwd: 'src_img/',
              src: ['**/*.{png,jpg,jpeg,gif,svg}'],
              dest: 'img/'
            }] // files
          } // target
        }, // imagemin

        shell: {
            jekyllServe: {
                command: "jekyll serve --baseurl '' "
            },
            deleteSite: {
                command: "rd /s _site"
            }
        },

        uncss: {
          options: {
            ignoreSheets : [/fonts.googleapis/],
            ignore: [/.tooltip/, /.collapse/, /.in/, '.highlight'],
            csspath: './css/',
            htmlroot: './_site/'
          },
          dist: {
              src: './_site/**/*.html',
              dest: './css/<%= pkg.name %>.min.css'
          }
        },

    });

    // Default task(s).
    grunt.registerTask('serve', 'shell');
    grunt.registerTask('img', 'imagemin');
    grunt.registerTask('clear', 'shell:deleteSite');
    grunt.registerTask('css', ['less', 'uncss']);
    grunt.registerTask('default', ['uglify', 'less', 'uncss', 'usebanner', 'img']);

};
