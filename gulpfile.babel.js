import gulp from 'gulp';
import sass from 'gulp-sass';
import header from 'gulp-header';
import cleanCSS from 'gulp-clean-css';
import rename from "gulp-rename";
import uglify from 'gulp-uglify';
import autoprefixer from 'gulp-autoprefixer';
import imagemin from 'gulp-imagemin';
import del from 'del';
import pkg from './package.json';

const paths = {
  styles: {
    src: 'themes/clean-blog/scss/**/*.scss',
    dest: 'themes/clean-blog/static/css/'
  },
  scripts: {
    src: 'themes/clean-blog/js/**/*.js',
    dest: 'themes/clean-blog/static/js/'
  },
  vendor: {
    root: 'themes/clean-blog/static/vendor/',
    jquery: 'themes/clean-blog/static/vendor/jquery/',
    bootstrap: 'themes/clean-blog/static/vendor/bootstrap/',
  },
  img: {
    src: 'src/img/**/*.{jpg,jpeg,png}',
    dest: 'static/img/'
  }
};

// Set the banner content
const banner = ['/*!\n',
  ' * Start Bootstrap - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
  ' * Copyright 2013-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
  ' * Licensed under <%= pkg.license %> (https://github.com/BlackrockDigital/<%= pkg.name %>/blob/master/LICENSE)\n',
  ' */\n',
  '\n'
].join('');

export const clean = () => del([ 'public' ]);

// Copy third party libraries from /node_modules into /vendor
// Bootstrap
const bootstrap =  () => gulp.src([
  './node_modules/bootstrap/dist/**/*',
  '!./node_modules/bootstrap/dist/css/bootstrap-grid*',
  '!./node_modules/bootstrap/dist/css/bootstrap-reboot*'
]).pipe(gulp.dest(paths.vendor.bootstrap));

// Font Awesome
const font =  () => gulp.src([
  './node_modules/@fortawesome/**/*',
]).pipe(gulp.dest(paths.vendor.root));

// jQuery
const jquery =  () => gulp.src([
  './node_modules/jquery/dist/*',
  '!./node_modules/jquery/dist/core.js'
]).pipe(gulp.dest(paths.vendor.jquery));

const vendor = gulp.parallel(jquery, font, bootstrap);

// Compile SCSS
function csscompile() {
  return gulp.src(paths.styles.src)
    .pipe(sass.sync({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(header(banner, {
      pkg: pkg
    }))
    .pipe(gulp.dest(paths.styles.dest))
}

// Minify CSS
function cssminify() {
  return gulp.src([
    `${paths.styles.dest}*.css`,
    `!${paths.styles.dest}*.min.css`
  ])
  .pipe(cleanCSS())
  .pipe(rename({
    suffix: '.min'
  }))
  .pipe(gulp.dest(paths.styles.dest));
}

// CSS
const styles =  gulp.series(csscompile, cssminify);

// Minify JavaScript
function scripts() {
  return gulp.src([
    paths.scripts.src,
    `!${paths.scripts.dest}*.min.js`
  ])
  .pipe(uglify())
  .pipe(rename({
    suffix: '.min'
  }))
  .pipe(header(banner, {
    pkg: pkg
  }))
  .pipe(gulp.dest(paths.scripts.dest));
}


function images() {
  return gulp.src(paths.img.src, {since: gulp.lastRun(images)})
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest(paths.img.dest));
}

// Default task
const build = gulp.series(clean, gulp.parallel(styles, scripts, vendor, images));
gulp.task('build', build);
export default build;

function watchFiles() {
  gulp.watch(paths.img.src, images);
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.styles.src, styles);
}
export { watchFiles as watch };
