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

gulp.task('build:styles', () => {

  // return gulp.src('css/styles.less')
  //   .pipe($.less({
  //     //plugins: [new $.lessPluginLists()]
  //   }))
  //   .pipe($.hb().data({pkg: pkg}))
  //   .pipe($.autoprefixer())
  //   .pipe(gulp.dest('css'))
  //   .pipe($.cleanCss({
  //     format: {
  //       breaks: {afterComment: true}
  //     },
  //     level: {
  //       1: {specialComments: '1'},
  //       2: {restructureRules: true}
  //     }
  //   }))
  //   .pipe($.rename({suffix: '.min'}))
  //   .pipe(gulp.dest('css'));
  //   //.pipe($.browserSync.stream());
});
gulp.task('watch:styles', () => {
  return gulp.watch(['**/*.less'], gulp.series('build:styles'));
});

gulp.task('watch', gulp.parallel('watch:html', 'watch:styles'));

gulp.task('browserSync', () => {
  // $.browserSync.init({
  //   server: true,
  //   files: ['*.html', 'css/styles.min.css'],
  //   browser: ['chrome'],
  //   //notify: false
  // });
});

gulp.task('default',
  gulp.series(
    gulp.parallel('build:html', 'build:styles'),
    gulp.parallel('browserSync', 'watch')
  )
);
