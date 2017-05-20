'use strict';

var gulp = require('gulp'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	uglify = require('gulp-uglify'),
	jshint = require('gulp-jshint'),
	cssnano = require('gulp-cssnano'),
	babel = require('gulp-babel'),
	concat = require('gulp-concat'),
	cmq = require('gulp-combine-mq'),
	rename = require('gulp-rename'),
	add = require('gulp-add-src'),
	pug = require('gulp-pug');

var dirs = {
	src:    './_src/',
	build:  './public'
},

styles = {
	src:    '${dirs.src}/sass',
	build:  './public/css'
},

scripts = {
	src:    '${dirs.src}/scripts',
	build:  './public/js'
},

templates = {
	src:    '${dirs.src}/templates',
	build:  '../'
};

/*
 *  CSS task
 */
 gulp.task('styles', function () {

	console.log('starting task: [styles]');

	gulp.src('./_src/sass/app.scss')
	.pipe(sass({errLogToConsole: true}))
	.pipe(cmq({
        beautify: false
    }))
    .pipe(autoprefixer({
		browsers: ['last 2 versions'],
		cascade: false
	}))
	.pipe(gulp.dest(styles.build))
	.pipe(concat('app.css'))
	.pipe(rename({ suffix: '.min' }))
	.pipe(gulp.dest(styles.build));
});

/*
 *  JS task
 */
 gulp.task('scripts',function(){

	console.log('starting task: [scripts]');
	
	// Custom JS
	gulp.src([
		'./_src/scripts/libs/tweenmax.min.js',
		'./_src/scripts/libs/jquery-3.1.1.min.js',
		'./_src/scripts/libs/scrollToPlugin.min.js',
		'./_src/scripts/app.js'
		])
	.pipe(babel({presets: ['es2016']}))
	.pipe(add.prepend('./_src/scripts/libs/jquery-3.1.1.min.js'))
	.pipe(add.prepend('./_src/scripts/libs/tweenmax.min.js'))
	.pipe(add.prepend('./_src/scripts/libs/scrollToPlugin.min.js'))
	.pipe(concat('app.js'))
	.pipe(gulp.dest(scripts.build))
	.pipe(concat('app.js'))
	.pipe(uglify())
	.pipe(rename({ suffix: '.min' }))
	.pipe(gulp.dest('./public/js'));
});

gulp.task('templates', function() {
	gulp.src('./_src/templates/index.pug')
	.pipe(pug({
		pretty: true
	}))
	.pipe(rename({extname:'.html'}))
	.pipe(gulp.dest('./'));
});

/*
 *  WATCH tasks to serve up
 */
 gulp.task('watch', ['styles', 'scripts', 'templates'], function() {
	gulp.watch('${styles.src}/**/*.scss', ['styles']);
	gulp.watch('${scripts.src}/**/*.js', ['scripts']);
	gulp.watch('${templates.src}/**/*.pug', ['templates']);
});

/*
 *  DEFAULT tasks to serve up
 */
 gulp.task('default', ['styles', 'scripts', 'templates']);

