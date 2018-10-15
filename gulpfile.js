'use strict';
// 载入外挂
var gulp = require('gulp'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass'),
    minifycss = require('gulp-minify-css'), //css压缩
    cssimport = require("gulp-cssimport"),
    //imagemin = require('gulp-imagemin'), //图片压缩
    //uglify = require('gulp-uglify'), //js压缩
    concat = require('gulp-concat'), //文件合并
    notify = require('gulp-notify'), //提示信息
    livereload = require('gulp-livereload') //网页自动刷新（服务器控制客户端同步刷新）


//使用webserver启动一个Web服务器
gulp.task('webserver', function() {
  gulp.src('') //src--root dir
    .pipe(webserver({
        path: '/',
        host: '127.0.0.1',
        port: '8088',
        livereload: true,
        directoryListing: true,
        open: true
    }));
});
gulp.task('connect', function () {
    connect.server({
        root: './',
        port: 8088,
        host: '127.0.0.1',
        livereload: true
    });
});

//检查文件
gulp.task('html', function () {
    gulp.src('./**/*.html')
        .pipe(connect.reload());  //管道
});

// 编译Scss
gulp.task('sass', function(){
    //sass()方法用于转换sass到css
    return gulp.src('css/main.scss')
        .pipe(sass()) // Converts Sass to CSS with gulp-sass
        .pipe(gulp.dest('dist/css'))  //gulp.dest输出
});

// 合并、压缩css文件
gulp.task('css', function() {
    return gulp.src([
            'lib/bootstrap/dist/css/bootstrap.min.css',
            'font/iconfont.css'
        ])
        //.pipe(concat('all.css'))
        .pipe(gulp.dest('dist/css'))
       // .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
       // .pipe(gulp.dest('dist/css'))
        .pipe(notify({ message: 'css task ok' }))
        //.pipe(webserver());
        .pipe(connect.reload());
});

// 合并、压缩js文件
gulp.task('js', function() {
    return gulp.src([
            'lib/**/*.min.js',
            'lib/requirejs/require.js',
            'js/**/*.js'
        ])
        //.pipe(concat('all.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(notify({ message: 'js task ok' }))
        .pipe(connect.reload());
        //.pipe(webserver());
});
// 复制html
gulp.task('copyhtml', function() {
    return gulp.src('*.html')
        .pipe(gulp.dest('dist'))
    //.pipe(notify({ message: 'lint task ok' }));
});

// 复制font
gulp.task('font', function() {
    return gulp.src('font/*')
       // .pipe(rename({dirname: ''}))
        .pipe(gulp.dest('dist/font'))
    //.pipe(notify({ message: 'lint task ok' }));
});

// 图片压缩
// gulp.task('images', function() {
//     return gulp.src('img/*')
//         .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
//         .pipe(gulp.dest('dist/images'))
//         .pipe(notify({ message: 'Images task complete' }));
// });

// 默认任务
gulp.task('default',['connect','watch']);
gulp.task('build',['copyhtml','font','css', 'js']);

// 监听文件变化
gulp.task('watch', function() {
    // 看守所有.scss档
    //gulp.watch(['**/main.scss'],['sass']);
    //gulp.watch(['**/*.html'], ['html']);
    gulp.watch(['css/*.scss'],['sass']);
    gulp.watch(['./*.html'], ['html']);

});

