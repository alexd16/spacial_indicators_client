var gulp = require('gulp');
var rename = require('gulp-rename');
var connect = require('gulp-connect');
var proxy = require('proxy-middleware');
var url = require('url');
var htmlReplace = require('gulp-html-replace');
var glob = require('multi-glob').glob;


gulp.task('connect', connect.server({
  root: ['src/'],
  port: 9000,
  livereload: true,
  open: {
    browser: 'google-chrome'
  },
  middleware: function(connect, o){
    var options = url.parse('http://localhost:3000/api');
    options.route = '/api';
    return [proxy(options)];
  }
}));

gulp.task('replace', function(){
  glob(['app/app.js', 'app/routes.js', 'app/**/*.js'], {cwd: 'src/'}, function(er, files){
    console.log(files);
    gulp.src('src/application.html')
      .pipe(htmlReplace({
        'app_js': files
      }, true))
      .pipe(rename('index.html'))
      .pipe(gulp.dest('src/'));
  });
});

gulp.task('html', function(){
  gulp.src(['src/index.html','src/app/**/*.html'])
    .pipe(connect.reload());
});

gulp.task('styles', function(){
  gulp.src(['src/app/**/*.css'])
    .pipe(connect.reload());
});

gulp.task('scripts', function(){
  gulp.src(['src/app/**/*.js'])
    .pipe(connect.reload());
});

gulp.task('watch', function(){
  gulp.watch(['src/application.html', 'src/app/**/*.html'], ['replace','html']);
  gulp.watch(['src/app/css/*.css'], ['styles']);
  gulp.watch(['src/app/**/*.js'], ['replace','scripts']);
});

gulp.task('default', ['replace', 'connect', 'watch'])
