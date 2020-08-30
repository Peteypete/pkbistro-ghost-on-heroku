// ----- Define workers -----

var gulp             = require('gulp');
var livereload       = require('gulp-livereload');
var sourcemaps       = require('gulp-sourcemaps');
var postcss          = require('gulp-postcss');
var atImport         = require('postcss-import');
var customMedia      = require('postcss-custom-media');
var customProperties = require('postcss-custom-properties');
var autoprefixer     = require('autoprefixer');
var nano             = require('gulp-cssnano');
var uglify           = require('gulp-uglify');
var rename           = require('gulp-rename');
var concat           = require('gulp-concat');
var simpleExtend     = require('postcss-extend');
var zip              = require('gulp-zip');


// ----- Tasks -----

// Combine all js plugins from src folder
gulp.task('concat-plugins', function(cb) {
  gulp.src('assets/js/src/lib/*.js')
    .pipe(concat('plugins.js'))
    .pipe(gulp.dest('assets/js/src/'));
  cb();
});

// Compress all js files and combine in one file
gulp.task('js-minify', function(cb) {
  // Plugins and main script file
  gulp.src(['assets/js/src/plugins.js', 'assets/js/src/main.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('all.js'))
    .pipe(gulp.dest('assets/js/dist/'))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('assets/js/dist/'))
    .pipe(livereload());
  cb();
});

// Do magic on CSS
gulp.task('css', function(cb) {
  var processors = [
    atImport,
    simpleExtend,
    customMedia,
    customProperties,
    autoprefixer
  ];
  gulp.src(['assets/css/src/main.css'])
    .pipe(sourcemaps.init())
    .pipe(postcss(processors))
    .pipe(gulp.dest('assets/css/dist/'))
    .pipe(nano())
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('assets/css/dist/'))
    .pipe(livereload());
  cb();
});

gulp.task('zip', function (cb) {
  var targetDir = '../';
  var themeName = require('./package.json').name;
  var filename = themeName + '.zip';

  gulp.src([
    '**',
    '!.git',
    '!.git/**',
    '!node_modules', '!node_modules/**',
    '!dist', '!dist/**'
  ])
    .pipe(zip(filename))
    .pipe(gulp.dest(targetDir));
  cb();
});


// ----- Console tasks -----

// Default task
gulp.task('default', gulp.series('concat-plugins', 'js-minify', 'css'));

// Track changes in important folders
gulp.task('watcher', function() {
  livereload.listen();
  gulp.watch('assets/js/src/lib/*.js', gulp.series('concat-plugins'));
  gulp.watch(['assets/js/src/plugins.js', 'assets/js/src/main.js'], gulp.series('js-minify'));
  gulp.watch('assets/css/src/*.css', gulp.series('css'));
});
