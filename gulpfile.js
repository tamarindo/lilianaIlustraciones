'use strict';

var gulp								= require('gulp'),
		nib									= require('nib'),
		rename							= require('gulp-rename'),
		stylus							= require('gulp-stylus'),
		concat 							= require('gulp-concat'),
		sourcemaps 					= require('gulp-sourcemaps'),
		uglify							= require('gulp-uglify'),
		staticPath 					= 'src/',
		publicStaticPath		= 'src/public/',
		ngAnnotate 					= require('gulp-ng-annotate'),
		browserSync         = require('browser-sync'),
		jshint              = require("gulp-jshint"),
		index               = staticPath;

// Proceso para minificar app Angular
		gulp.task('js', function () {
		  gulp.src([staticPath + '/js/app/**/*.js'])
		    .pipe(sourcemaps.init())
				.pipe(jshint())
		    .pipe(concat('main.js'))
		    .pipe(ngAnnotate())
		    .pipe(sourcemaps.write())
				.pipe(rename('app.min.js'))
		    .pipe(gulp.dest(publicStaticPath + 'js/'))
				.pipe(browserSync.reload({stream: true}));
		});


// Proceso para minificar librerias y vendorjs
		gulp.task('vendorjs', function () {
		  gulp.src([ staticPath + 'js/ventor/**/*.js'])
		      .pipe(concat('app.js'))
		      .pipe(ngAnnotate())
		      .pipe(uglify())
		    .pipe(gulp.dest(publicStaticPath + 'js/'))
				.pipe(browserSync.reload({stream: true}));
		});


// Proceso de compilacion de archivos stylus
gulp.task('css', function() {
	gulp.src( staticPath + 'stylus/main.styl' )
		.pipe(stylus({
			use: nib(),
			compress: false
		}))
		.pipe(rename('main.min.css'))
		.pipe(gulp.dest( publicStaticPath + 'css/'))
		.pipe(browserSync.reload({stream: true}));
});

// Proceso de compilacion de archivos stylus
gulp.task('html', function() {
	gulp.src( staticPath + '/*.html' )
	.pipe(browserSync.reload({stream: true}));
});


/*
* Browser Sync task
*/
gulp.task('browser-sync', ['css', 'js', 'vendorjs','html'], function () {
  browserSync({
    server: {
      baseDir: index
    }
  });
});


// Escuchando Cambios
gulp.task('watch', function() {
	gulp.watch([staticPath + '/stylus/**/*.styl'], ['css']);
  gulp.watch([staticPath + '/js/ventor/**/*.js'], ['vendorjs']);
	gulp.watch([staticPath + '/js/app/**/*.js'], ['js']);
	gulp.watch([staticPath + '/**/*.html'], ['html']);
});

gulp.task('default', [ 'browser-sync','watch' ]);
