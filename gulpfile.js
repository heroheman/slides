var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename');
    shell = require('gulp-shell');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    newer = require('gulp-newer');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');

var config = {
    imageIn: 'images_input/**/*',
    imageOut: 'images/',
    scss: 'scss/**/*.scss',
    css: 'css/'
}

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('bs-reload', function () {
    browserSync.reload();
});

gulp.task('images', function(){
    gulp.src( config.imageIn )
        .pipe( newer(config.imageIn) )
        .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
        .pipe(gulp.dest( config.imageOut ));
});

gulp.task('styles', function(){
    gulp.src( config.scss )
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error.message);
                this.emit('end');
            }}))
            .pipe(sass())
            .pipe(autoprefixer('last 2 versions'))
            .pipe(gulp.dest('css/'))
            .pipe(browserSync.reload({stream:true}))
});


gulp.task('default', ['images','browser-sync'], function(){
    gulp.watch( config.scss );
    gulp.watch( config.imageIn, ['images']);
    gulp.watch("*.html", ['bs-reload']);
});
