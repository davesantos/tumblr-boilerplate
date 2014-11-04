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
	return gulp.src('./src/_sass/*.scss')
		.pipe(compass({
			config_file: 'config.rb',
			css: './src/css',
			sass: 'src/_sass', //Must not have .
			require: ['susy'] }))
		.on('error', errorHandler)
		.pipe(gulp.dest('./src/css'))
		.pipe(livereload());
});

gulp.task('jade', function(){
	gulp.src('./src/*.jade')
		.pipe(jade())
		.pipe(gulp.dest('./src'))
		.pipe(livereload());
})

gulp.task('indent', function(){
	gulp.src('src/*.html')
		.pipe(prettify({
			indent_inner_html: true,
			indent_with_tabs: true,
			indent_char:"	",
			indent_size: 1,
			preserve_newlines: false
		}))
		.pipe(gulp.dest('src'));
});


gulp.task('watch', function(){
	var server = livereload();
	gulp.watch('./src/_sass/**/*', ['compass']);
	gulp.watch('./src/css/*').on('change', livereload.changed);
	gulp.watch('./src/*.jade', ['jade']);
})

gulp.task('default', ['compass', 'watch']);

