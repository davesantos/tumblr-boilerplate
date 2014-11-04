var gulp = require('gulp'),
	jade = require('gulp-jade'),
	compass = require('gulp-compass'),
	newer = require('gulp-newer'),
	prettify = require('gulp-prettify'),
	livereload = require('gulp-livereload');


function errorHandler(error) {
	console.error(String(error));
	this.emit('end');
}

// Compass compile and livereload
gulp.task('compass', function(){
	return gulp.src('./_sass/*')
		.pipe(compass({
			config_file: 'config.rb',
			css: './css',
			sass: '_sass', //Must not have .
			require: ['susy'] }))
		.on('error', errorHandler)
		.pipe(gulp.dest('./css'))
		.pipe(livereload());
});

gulp.task('jade', function(){
	gulp.src('./*.jade')
		.pipe(jade({
			pretty: true
		}))
		.pipe(gulp.dest('.'))
		.pipe(livereload());
})

gulp.task('indent', function(){
	gulp.src('*.html')
		.pipe(prettify({
			indent_inner_html: true,
			indent_with_tabs: true,
			indent_char:"	",
			indent_size: 1,
			preserve_newlines: false
		}))
		.pipe(gulp.dest('.'));
});


gulp.task('watch', function(){
	var server = livereload();
	gulp.watch('./_sass/**/*', ['compass']);
	gulp.watch('./css/*').on('change', livereload.changed);
	gulp.watch('./*.jade', ['jade']);
})

gulp.task('default', ['compass', 'watch']);

