const gulp = require('gulp');
	uglify = require('gulp-uglify'),
	sass = require('gulp-ruby-sass');
    cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();
const child = require('child_process');
// const gutil = require('gulp-util');
const siteRoot = '_site';

//default task
gulp.task('default', ['scripts', 'styles', 'jekyll', 'serve']);

//scripts task, also "Uglifies" JS
gulp.task('scripts', function() {
	gulp.src('dev/js/*.js')
	.pipe(uglify())
	.pipe(gulp.dest('build/js'))
	// .pipe(browserSync.stream());
});

//styles build/minification
gulp.task('styles', function() {
	return sass('dev/scss/styles.scss')
	.pipe(cleanCSS())
	.pipe(gulp.dest('build/css'))
	// .pipe(browserSync.stream());
});

//server + file watching 
gulp.task('serve', function() {

    browserSync.init({
        server: "_site"
    });

    gulp.watch("dev/scss/*.scss", ['styles', 'jekyll']);
    gulp.watch('dev/js/*.js', ['scripts', 'jekyll']);
    gulp.watch('_includes/*.html', ['jekyll']).on('change', browserSync.reload);
    gulp.watch('_site').on('change', browserSync.reload);

});


gulp.task('jekyll', function(gulpCallBack){
    var spawn = require('child_process').spawn;
    // After build: cleanup HTML
    var jekyll = spawn('jekyll', ['build'], {stdio: 'inherit'});

    jekyll.on('exit', function(code) {
        gulpCallBack(code === 0 ? null : 'ERROR: Jekyll process exited with code: '+code);
    });
});
