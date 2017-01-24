'use strict';

var gulp = require('gulp'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	uglify = require('gulp-uglify'),
	jshint = require('gulp-jshint'),
	cssnano = require('gulp-cssnano'),
	babel = require('gulp-babel'),
	concat = require('gulp-concat'),
	imagemin = require('gulp-imagemin'),
	cmq = require('gulp-combine-mq'),
	rename = require('gulp-rename'),
	add = require('gulp-add-src'),
	pug = require('gulp-pug');

const dirs = {
	src:    './_src/',
	build:  './public'
},

styles = {
	src:    `${dirs.src}/sass`,
	build:  `${dirs.build}/css`
},

scripts = {
	src:    `${dirs.src}/scripts`,
	build:  `${dirs.build}/js`
},

images = {
	src:    `${dirs.src}/images`,
	build:  `${dirs.build}/images`   
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

	gulp.src(`${styles.src}/app.scss`)
	.pipe(sass({errLogToConsole: true}))
	.pipe(autoprefixer('last 8 version'))
	.pipe(cmq())
	.pipe(gulp.dest(styles.build))
	.pipe(cssnano())
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
		`${scripts.src}/libs/tweenmax.min.js`,
		`${scripts.src}/libs/jquery-3.1.1.min.js`,
		`${scripts.src}/libs/masonry.js`,
		`${scripts.src}/app.js`
		])
	.pipe(babel({presets: ['es2015']}))
	.pipe(add.prepend(`${scripts.src}/libs/jquery-3.1.1.min.js`))
	.pipe(add.prepend(`${scripts.src}/libs/tweenmax.min.js`))
	.pipe(add.prepend(`${scripts.src}/libs/masonry.js`))
	.pipe(concat('app.js'))
	.pipe(gulp.dest(scripts.build))
	.pipe(concat('app.js'))
	.pipe(uglify())
	.pipe(rename({ suffix: '.min' }))
	.pipe(gulp.dest(scripts.build));
});


/*
 *  IMAGE minificatiooooon
 */
 gulp.task('images', function() {

	console.log('starting task: [images]');

	gulp.src(`${images.src}/*`)
	.pipe(imagemin())
	.pipe(gulp.dest(images.build))
});

gulp.task('templates', function() {
	gulp.src('./_src/templates/index.pug')
	.pipe(pug())
	.pipe(rename({extname:'.html'}))
	.pipe(gulp.dest('./'))
});


/*
 *  WATCH tasks to serve up
 */
 gulp.task('watch', ['styles', 'scripts', 'templates'], function() {
	gulp.watch(`${styles.src}/**/*.scss`, ['styles']);
	gulp.watch(`${scripts.src}/**/*.js`, ['scripts']);
	gulp.watch(`${templates.src}/**/*.pug`, ['templates']);
});


/*
 *  DEFAULT tasks to serve up
 */
 gulp.task('default', ['styles', 'scripts', 'templates']);

