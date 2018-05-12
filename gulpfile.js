// Package & gulp

const pkg = require('./package.json');

const gulp = require('gulp');
const $ = require('gulp-load-plugins')({
  pattern: ['*'],
  scope: ['dependencies']
});


// Tasks

gulp.task('build:html', () => {
  return gulp.src('src/docs/*.html')
    .pipe($.hb()
      .data({pkg: pkg})
      .partials('src/docs/partials/**/*.hbs')
    )
    .pipe(gulp.dest('docs'));
});
gulp.task('watch:html', () => {
  return gulp.watch(['src/docs/**/*.{html,hbs}'], gulp.series('build:html'));
});

gulp.task('build:js', () => {
  return gulp.src('src/js/*.js')
    .pipe($.uglify())
    .pipe($.rename({suffix: '.min'}))
    .pipe(gulp.dest('docs/js'));
});
gulp.task('watch:js', () => {
  return gulp.watch(['src/js/*.js'], gulp.series('build:js'));
});

gulp.task('build:styles', () => {
  return gulp.src('src/docs/css/*.less')
    .pipe($.less({
      //plugins: [new $.lessPluginLists()]
    }))
    .pipe($.hb().data({pkg: pkg}))
    .pipe($.autoprefixer())
    .pipe(gulp.dest('docs/css'))
    .pipe($.cleanCss({
      format: {
        breaks: {afterComment: true, afterRuleEnds: true} // Debug only
        //breaks: {afterComment: true}
      },
      level: {
        1: {specialComments: '1'},
        2: {restructureRules: true}
      }
    }))
    .pipe($.rename({suffix: '.min'}))
    .pipe(gulp.dest('docs/css'));
});
gulp.task('watch:styles', () => {
  return gulp.watch(['src/less/*.{less,css}', 'src/docs/css/*.less'], gulp.series('build:styles'));
});

gulp.task('watch', gulp.parallel('watch:html', 'watch:js', 'watch:styles'));

gulp.task('browserSync', () => {
  $.browserSync.init({
    server: 'docs',
    files: ['docs/*.html', 'docs/js/*.min.js', 'docs/css/*.min.css'],
    browser: ['chrome']
  });
});

gulp.task('default',
  gulp.series(
    gulp.parallel('build:html', 'build:js', 'build:styles'),
    gulp.parallel('browserSync', 'watch')
  )
);
