var pngquant = require('imagemin-pngquant');
var mozjpeg = require('imagemin-mozjpeg');

module.exports = function(grunt) {
    // Load the plugins.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-banner');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    require('time-grunt')(grunt);
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            main: {
                src: ['src/js/jquery.js', 'src/js/bootstrap.js', 'src/js/<%= pkg.name %>.js'],
                dest: 'static/js/<%= pkg.name %>.min.js'
            }
        },
        less: {
            expanded: {
                options: {
                    paths: ["css"]
                },
                files: {
                    "static/css/<%= pkg.name %>.css": "src/less/<%= pkg.name %>.less"
                }
            },
            minified: {
                options: {
                    paths: ["css"],
                    compress: true
                },
                files: {
                    "static/css/<%= pkg.name %>.min.css": "src/less/<%= pkg.name %>.less"
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
                    src: [
                        'static/css/<%= pkg.name %>.css', 
                        'static/css/<%= pkg.name %>.min.css', 
                        'static/js/<%= pkg.name %>.min.js'
                    ]
                }
            }
        },
        watch: {
            scripts: {
                files: ['src/js/<%= pkg.name %>.js'],
                tasks: ['uglify'],
                options: {
                    spawn: false,
                },
            },
            less: {
                files: ['src/less/*.less'],
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
              cwd: 'src/img/',
              src: ['**/*.{png,jpg,jpeg,gif,svg}'],
              dest: 'static/img/'
            }] // files
          } // target
        }, // imagemin

        shell: {
            jekyllServe: {
                command: "hugo server -w -D"
            }
        },

        copy: {
            fonts: {
                files: [
                    { expand: true, flatten: true, src: ['src/fonts/*'], dest: 'static/fonts/', filter: 'isFile' },
                ],
            },
        },

    });

    // Default task(s).
    grunt.registerTask('serve', 'shell');
    grunt.registerTask('img', 'imagemin');
    grunt.registerTask('css', ['less:minified']);
    grunt.registerTask('default', ['uglify', 'less:minified', 'usebanner', 'img', 'copy']);

};
