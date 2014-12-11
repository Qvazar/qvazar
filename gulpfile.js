var gulp = require('gulp'),
	jade = require('gulp-jade'),
	amd = require('gulp-wrap-amd');
	traceur = require('gulp-traceur')
	uglify = require('gulp-uglify'),
	less = require('gulp-less')
	concat = require('gulp-concat');

gulp.task('jade', function() {
	return gulp.src('src/*.jade')
		.pipe(jade({
			pretty: true
		}))
		.pipe(gulp.dest('build/dev/'))
		//.pipe(uglify())
		.pipe(gulp.dest('build/dist/'));
});

gulp.task('jade-client', function() {
	return gulp.src('src/js/**/*.jade')
		.pipe(jade({ client: true }))
		.pipe(amd({
			pretty: true,
			deps: ['jade'],
			params: ['jade']
		}))
		.pipe(gulp.dest('build/dev/js/'))
		.pipe(uglify())
		.pipe(gulp.dest('build/dist/js/'));
});

gulp.task('js', function() {
	return gulp.src('src/js/**/*.js')
		.pipe(gulp.dest('build/dev/js/'))
		.pipe(traceur({ modules: 'instantiate' }))
		.pipe(uglify())
		.pipe(gulp.dest('build/dist/js/'));
});

gulp.task('css', function() {
	return gulp.src('src/style/**/*.less')
		.pipe(less())
		.pipe(concat('all.css'))
		.pipe(gulp.dest('build/dev/style'))
		.pipe(gulp.dest('build/dist/style'));
});

gulp.task('default', ['jade', 'jade-client', 'js', 'css']);