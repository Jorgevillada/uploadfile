// Karma configuration
// Generated on Sat May 23 2015 16:11:32 GMT+0200 (CEST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'node_modules/jquery/dist/jquery.min.js',
      
      "node_modules/angular/angular.js",
      "node_modules/angular-translate/dist/angular-translate.min.js",
      "node_modules/angular-translate-loader-partial/angular-translate-loader-partial.min.js",
      "node_modules/angular-translate-loader-static-files/angular-translate-loader-static-files.min.js",
      "node_modules/angular-ui-router/release/angular-ui-router.min.js",
      "node_modules/angular-animate/angular-animate.min.js",
      "node_modules/angular-aria/angular-aria.min.js",
      "node_modules/angular-bootstrap/ui-bootstrap.min.js",
      "node_modules/angular-bootstrap/ui-bootstrap-tpls.min.js",
      'node_modules/blueimp-file-upload/js/jquery.iframe-transport.js',
      'node_modules/jquery-ui/ui/widget.js',
      'node_modules/blueimp-file-upload/js/jquery.fileupload.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'app/js/**/*.module.js',
      'app/js/**/*.js',
      'app/templates/*.html'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'app/**/*.html': ['ng-html2js'],
      'app/**/!(*.mock|*.spec).js': ['coverage']
    },


    ngHtml2JsPreprocessor: {
      // strip this from the file path
      stripPrefix: 'app/',
      // create a single module that contains templates from all the files
      moduleName: 'templates'
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],


    coverageReporter: {
      type : 'html',
      dir : 'coverage/'
    },


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};