var gulp = require('gulp'),
        gulpsync = require('gulp-sync')(gulp),
        connect = require('gulp-connect'),
        jshint = require('gulp-jshint'),
        stylish = require('jshint-stylish'),
        less = require('gulp-less'),
        uglify = require('gulp-uglify'),
        uncss = require('gulp-uncss'),
        templateCache = require('gulp-angular-templatecache'),
        concat = require('gulp-concat'),
        watch = require('gulp-watch'),
        historyApiFallback = require('connect-history-api-fallback'),
        cssnano = require('gulp-cssnano'),
        batch = require('gulp-batch'),
        replace = require('gulp-replace'),
        template = require('gulp-template'),
        cleanCSS = require('gulp-clean-css'),
        through = require('through2'),
        rename = require("gulp-rename"),
        browserSync = require('browser-sync').create();

var fs = require('fs');


var dir = {
    root: 'app/',
    static: 'static/',
    js: 'js/',
    i18n: 'i18n/',
    css: 'css/',
    templates: 'templates/',
    lib: 'lib/',
    dist: 'dist/',
    generated: 'generated/'
};

var node_modules = "./node_modules/";
var filesCSS = [
    node_modules + "bootstrap/dist/css/bootstrap.min.css",
    node_modules + "font-awesome/css/font-awesome.min.css"
];

var filesJS = [
    node_modules + 'jquery/dist/jquery.min.js',
    
    node_modules + "angular/angular.js",
    node_modules + "angular-translate/dist/angular-translate.min.js",
    node_modules + "angular-translate-loader-partial/angular-translate-loader-partial.min.js",
    node_modules + "angular-translate-loader-static-files/angular-translate-loader-static-files.min.js",
    node_modules + "angular-ui-router/release/angular-ui-router.min.js",
    node_modules + "angular-animate/angular-animate.min.js",
    node_modules + "angular-aria/angular-aria.min.js",
    node_modules + "angular-bootstrap/ui-bootstrap.min.js",
    node_modules + "angular-bootstrap/ui-bootstrap-tpls.min.js",
    node_modules + 'blueimp-file-upload/js/jquery.iframe-transport.js',
    node_modules + 'jquery-ui/ui/widget.js',
    node_modules + 'blueimp-file-upload/js/jquery.fileupload.js',
];



var cache = function (req, res, next) {
    if (req && req.url && req.url.match(/(css|js|img|font)/)) {
    } else {
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Last-Modified', new Date().toGMTString());
    }
    next();
};

gulp.task('server-dev', function () {
    browserSync.init({
        port: process.env.PORT || 8000,
        server: './' + dir.generated,
        middleware: [
            historyApiFallback()
        ],
        notify: false,
        ghostMode: false,
        open: false
    });

});


gulp.task("checkout-js", function () {
    return gulp.src(['./' + dir.root + dir.js + '**/*.js', './' + dir.root + dir.js + 'app.js'])
            .pipe(jshint())
            .pipe(jshint.reporter(stylish));
});


gulp.task('process-less', function () {
    var promises = [new Promise(function (resolve, reject) {
            gulp.src('./' + dir.root + dir.css + '*.less')
                    .pipe(less())
                    .pipe(concat('main.css'))
                    .pipe(gulp.dest('./' + dir.generated + 'css/'))
                    .on('error', reject)
                    .on('end', resolve);
        })];

    proccessPromises(promises);

});

gulp.task('create-parameters', function () {
    return new Promise(function (resolve, reject) {
        if (!fs.existsSync('./parameters.json')) {
            gulp.src("./parameters.dist.json")
                    .pipe(rename("parameters.json"))
                    .pipe(gulp.dest("./"))
                    .on('error', reject)
                    .on('end', resolve);
            ;
        } else {
            resolve();
        }
    })
});

var reloadBrowser = function () {
    gulp.src('./' + dir.root + '**/*.html')
            .pipe(browserSync.stream());
};

var proccessPromises = function (promises) {
    Promise.all(promises).then(function () {
        reloadBrowser();
    }, function () {
    });
};

gulp.task('concat-js', function () {
    var parameters = JSON.parse(fs.readFileSync('./parameters.json'));
    var promises = [];

    promises.push(new Promise(function (resolve, reject) {
        gulp.src(['./' + dir.root + dir.js + '/**/*.js','!./' + dir.root + dir.js + '/**/*.spec.js'])
                .pipe(concat('app.js'))
                .pipe(template(parameters))
                .pipe(gulp.dest('./' + dir.generated + 'js/'))
                .on('error', reject)
                .on('end', resolve);
    }));
    proccessPromises(promises);
});


gulp.task('compress-css', function () {
    gulp.src('./' + dir.generated + 'css/vendor.css').pipe(cleanCSS({processImport: false}))
            .pipe(gulp.dest('./' + dir.generated + 'css/'));

    gulp.src('./' + dir.generated + 'css/main.css').pipe(cleanCSS({processImport: false}))
            .pipe(gulp.dest('./' + dir.generated + 'css/'));

});

gulp.task('compress', ['compress-css']);


gulp.task('init-copy', function () {
    gulp.src('./' + dir.root + 'index.html').pipe(template({})).pipe(gulp.dest('./' + dir.generated));
    gulp.src('./' + dir.root + 'i18n/**').pipe(gulp.dest('./' + dir.generated + 'i18n/'));
    gulp.src(node_modules + "font-awesome/fonts/**").pipe(gulp.dest('./' + dir.generated + 'fonts/'));
    gulp.src('./' + dir.root + 'fonts/**').pipe(gulp.dest('./' + dir.generated + 'fonts/'));

    gulp.src(filesJS).pipe(concat('vendor.js')).pipe(gulp.dest('./' + dir.generated + dir.js));
    gulp.src(filesCSS).pipe(concat('vendor.css')).pipe(gulp.dest('./' + dir.generated + dir.css));
    gulp.src('./' + node_modules + 'jquery/dist/jquery.min.js').pipe(gulp.dest('./' + dir.generated + dir.js));
    gulp.src('./' + dir.root + 'img/**').pipe(gulp.dest('./' + dir.generated + 'img/'));
    gulp.src('./' + dir.root + 'templates/**').pipe(gulp.dest('./' + dir.generated));
    gulp.src('./' + dir.root + dir.static + '**').pipe(gulp.dest('./' + dir.generated));
});
gulp.task('init-copy-i18n', function () {
    var promises = [new Promise(function (resolve, reject) {
            gulp.src('./' + dir.root + 'i18n/**').pipe(gulp.dest('./' + dir.generated + 'i18n/')).on('error', reject)
                    .on('end', resolve);
        })];
    proccessPromises(promises);

});
gulp.task('copy-templates', function () {
    var promises = [new Promise(function (resolve, reject) {
            gulp.src('./' + dir.root + 'templates/**').pipe(gulp.dest('./' + dir.generated)).on('error', reject)
                    .on('end', resolve);
        })];
    proccessPromises(promises);
});

gulp.task('watch', function () {
    gulp.watch('./' + dir.root + 'templates/**/*.html', {debounceDelay: 3000}, gulpsync.sync(['copy-templates']));
    gulp.watch(['./' + dir.root + dir.css + '**/*.less'], gulpsync.sync(['process-less']));
    gulp.watch(['./' + dir.root + dir.js + '**/*.js', './parameters.json'], gulpsync.sync(['concat-js']));
    gulp.watch(['./' + dir.root + dir.i18n + '**/*.json'], gulpsync.sync(['init-copy-i18n']));
});

//Default
gulp.task('default', gulpsync.sync(['create-parameters', 'init-copy', 'process-less', 'concat-js', 'server-dev', 'watch']));
gulp.task('dist', gulpsync.sync(['create-parameters', 'init-copy', 'process-less', 'concat-js', 'server-dist', "compress-css"]));