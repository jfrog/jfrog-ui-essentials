var gulp = require("gulp");
var gutil = require("gulp-util");
var webpack = require("webpack");
var path = require('path');
var concat = require('gulp-concat');
var html2js = require('gulp-html2js');
var webpackConfig = require('./webpack.config');
var less = require('gulp-less');
var sourceMaps = require('gulp-sourcemaps');
var CONFIG = require('./jfrog-ui-essentials.config');
var install = require("gulp-install");
var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');
var runSequence = require('run-sequence');
var webserver = require('gulp-webserver');
var prefixer = require('gulp-autoprefixer');
var combiner = require('stream-combiner2');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var RevAll = require('gulp-rev-all');
var revReplace = require("gulp-rev-replace");
var revNapkin = require('gulp-rev-napkin');
var rimraf = require('gulp-rimraf');
var clean = require('gulp-clean');
var preprocess = require('gulp-preprocess');
var file = require('gulp-file');
require("any-promise/register")("bluebird");
var inject = require('gulp-inject');
var karma = require('karma');

// default task runs the development tasks seq
gulp.task('default',['build', 'watch']);


// Build tasks common to dev and production
gulp.task('build:common',
    function(callback) {
        runSequence(
            'clean',
            [
                'webpack',
                'templates',
/*
                'vendorStylesAssets',
*/
                'vendorFonts',
                'vendorScripts',
                'vendorStyles',
                'less',
                'fonts',
                'images',
                'copyBowerJson'
            ],
            'concatAllJS',
            'preprocessJS',
            'preprocessBowerJSON',
            'checkBuildVersion',
//            'concatAllCSS',
            'cleanTemp',
            callback
        );
    }
);


// Build the client. This is run by Jenkins
gulp.task('build',
    function(callback) {
        delete webpackConfig.devtool; //don't generate source maps on production build
        runSequence(
            'build:common',
            //'revreplace',
            callback
        );
    }
);

// Same as build:common just copy styleguide
gulp.task("build:dev", 
    function(callback) {
        runSequence(
            'build:common',
            'copyStyleguide',
            callback
        );
    }
);

// Clean up
gulp.task('clean', function() { 
    return gulp.src(CONFIG.DESTINATIONS.TARGET, { read: false })
        .pipe(rimraf({ force: true }));
});


gulp.task('checkBuildVersion', function() {
    if (!process.env.BUILD_VERSION) {
        return file('.dev-version', '', { src: false })
            .pipe(gulp.dest(CONFIG.DESTINATIONS.TARGET));
    }
});

// Set watchers and run relevant tasks - then reload (when running under browsersync)
gulp.task('watch', function () {
    gulp.watch(CONFIG.SOURCES.APPLICATION_JS, sequence('build'));
    gulp.watch(CONFIG.SOURCES.TEMPLATES, sequence('build'));
    gulp.watch(CONFIG.SOURCES.LESS, sequence('build'));
    gulp.watch(CONFIG.SOURCES.DIRECTIVES_LESS, sequence('build'));
/*
    gulp.watch(CONFIG.SOURCES.REQUIRED_TEMPLATES, sequence('webpack', 'reload'));
    gulp.watch(CONFIG.SOURCES.VENDOR_JS, sequence(['vendorScripts', 'vendorStyles', 'vendorStylesAssets', 'vendorFonts'], 'reload'));
    gulp.watch(CONFIG.SOURCES.VENDOR_CSS, sequence(['vendorStyles'], 'reloadCss'));
    gulp.watch(CONFIG.SOURCES.FONTS, sequence('fonts', 'reload'));
    gulp.watch(CONFIG.SOURCES.INDEX, sequence('copyHtml', 'reload'));
*/
});

gulp.task('concatAllJS', function() {
    return gulp.src([CONFIG.DESTINATIONS.TARGET + '/jfrog-ui-essentials.js', CONFIG.DESTINATIONS.TARGET_TEMP + '/*.js'])
        .pipe(concat('jfrog-ui-essentials.js'))
        .pipe(uglify({mangle:false}))
        .pipe(gulp.dest(CONFIG.DESTINATIONS.TARGET));
});
gulp.task('preprocessJS', function() {
    return gulp.src(CONFIG.DESTINATIONS.TARGET + '/jfrog-ui-essentials.js')
        .pipe(preprocess())
        .pipe(gulp.dest(CONFIG.DESTINATIONS.TARGET));
});
gulp.task('preprocessBowerJSON', function() {
    return gulp.src(CONFIG.DESTINATIONS.TARGET + '/bower.json')
        .pipe(preprocess())
        .pipe(gulp.dest(CONFIG.DESTINATIONS.TARGET));
});
gulp.task('concatAllCSS', function() {
    return gulp.src([CONFIG.DESTINATIONS.TARGET_TEMP + '/*.css', CONFIG.DESTINATIONS.TARGET + '/*.css'])
        .pipe(concat('jfrog-ui-essentials.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest(CONFIG.DESTINATIONS.TARGET));
});


gulp.task('cleanTemp', function () {
    return gulp.src(CONFIG.DESTINATIONS.TARGET_TEMP, {read: false})
        .pipe(clean({force:true}));
});

// Utility factory function to create a function that runs a sequence
function sequence() {
    var args = arguments;
    return function() {
        runSequence.apply(this, args);
    }
}

// copy bower.json file to dest
gulp.task('copyBowerJson', function () {
    return gulp.src(CONFIG.SOURCES.BOWER_JSON)
        .pipe(gulp.dest(CONFIG.DESTINATIONS.TARGET))
});



// install bower dependedencies
gulp.task('bower', function () {
    return gulp.src(['./bower.json'])
            .pipe(install());
});

// bundle application code
gulp.task("webpack", function (callback) {
    return webpack(webpackConfig, function (err, stats) {
        console.log(err);
        if (err) {
            throw new gutil.PluginError("webpack", err)
        }
        gutil.log("[webpack]", stats.toString({
            // output options
        }));
        callback();
    });
});

// concat vendor scripts
gulp.task('vendorScripts', function () {
    return gulp.src(CONFIG.SOURCES.VENDOR_SCRIPTS)
        .pipe(concat('vendorScripts.js'))
        .pipe(uglify({mangle:false}))
        .pipe(gulp.dest(CONFIG.DESTINATIONS.TARGET));
});

// concat vendor scripts for karma
gulp.task('karmaVendorScripts', function () {
    return gulp.src(CONFIG.SOURCES.VENDOR_SCRIPTS_FOR_KARMA)
        .pipe(concat('karmaVendorScripts.js'))
        .pipe(uglify({mangle:false}))
        .pipe(gulp.dest(CONFIG.DESTINATIONS.KARMA_TEMP));
});

// concat vendor stylesheets
gulp.task('vendorStyles', function () {
    return gulp.src(CONFIG.SOURCES.VENDOR_CSS)
        .pipe(concat('vendorStyles.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest(CONFIG.DESTINATIONS.TARGET));
});

// copy vendor assets to css
gulp.task('vendorStylesAssets', function () {
    return gulp.src(CONFIG.SOURCES.VENDOR_ASSETS)
        .pipe(gulp.dest(CONFIG.DESTINATIONS.TARGET_TEMP));
});

gulp.task('vendorFonts', function () {
    return gulp.src(CONFIG.SOURCES.VENDOR_FONTS)
        .pipe(gulp.dest(CONFIG.DESTINATIONS.TARGET + '/fonts'));
});


// cache templates
gulp.task('templates', function () {
    return gulp.src(CONFIG.SOURCES.TEMPLATES)
            .pipe(html2js({
                outputModuleName: 'jfrog.ui.essentials.templates',
                base: 'src/',
                useStrict: true
            }))
            .pipe(concat('templates.js'))
            .pipe(uglify({mangle:false}))
            .pipe(gulp.dest(CONFIG.DESTINATIONS.TARGET_TEMP))
});

gulp.task('iconfonts', function(){
    return gulp.src(CONFIG.SOURCES.MEDIUM_SVG_ICONS)
            .pipe(iconfontCss({
                fontName: 'medium_svgicons'
            }))
            .pipe(iconfont({
                fontName: 'medium_svgicons'
            }))
            .pipe(gulp.dest(CONFIG.DESTINATIONS.TARGET + '/css'));
});


// compile less
gulp.task('less', function () {

    var injectFiles = gulp.src(CONFIG.SOURCES.DIRECTIVES_LESS, { read: false });

    var injectOptions = {
        transform: function(filePath) {
            filePath='../../'+filePath;
            return '@import "' + filePath + '";';
        },
        starttag: '// injector',
        endtag: '// endinjector',
        addRootSlash: false
    };

    var combined = combiner.obj([
        gulp.src(CONFIG.SOURCES.LESS_MAIN_FILE),
        inject(injectFiles, injectOptions),
        less({paths: [path.join(__dirname, 'less', 'includes')]}),
        prefixer(),
        concat('jfrog-ui-essentials.css'),
        sourceMaps.write(),
        minifyCss(),
        gulp.dest(CONFIG.DESTINATIONS.TARGET)
    ]);

    // any errors in the above streams will get caught
    // by this listener, instead of being thrown:
    combined.on('error', console.error.bind(console));

    return combined;
});


// copy styleguide file to dest - for development only
gulp.task('copyStyleguide', function () {
    return gulp.src(CONFIG.SOURCES.STYLEGUIDE)
        .pipe(gulp.dest(CONFIG.DESTINATIONS.TARGET))
});

//copy fonts
gulp.task('fonts', function () {
    return gulp.src(CONFIG.SOURCES.FONTS)
            .pipe(gulp.dest(CONFIG.DESTINATIONS.TARGET + '/fonts'))
});

//copy images
gulp.task('images', function () {
    return gulp.src(CONFIG.SOURCES.IMAGES)
            .pipe(gulp.dest(CONFIG.DESTINATIONS.TARGET + '/images'))
});

function transformFilename(file, hash) {
    var ext = path.extname(file.path);
    return path.basename(file.path, ext) + '.' + process.env.BUILD_NUMBER + ext; // filename.<BUILD_NUMBER>.ext
}

gulp.task("revision", function(){
    if (process.env.BUILD_NUMBER) {    
        var revAll = new RevAll({transformFilename: transformFilename});
        return gulp.src(CONFIG.DESTINATIONS.TARGET_REV)
            .pipe(revAll.revision())
            .pipe(revNapkin({force:true}))
            .pipe(gulp.dest(CONFIG.DESTINATIONS.TARGET))
            .pipe(revAll.manifestFile())
            //     .pipe(revDel({ dest: CONFIG.DESTINATIONS.TARGET, force: true }))
            .pipe(gulp.dest(CONFIG.DESTINATIONS.TARGET))
    }
})

gulp.task("revreplace", ['revision'], function() {
    if (process.env.BUILD_NUMBER) {    
        var manifest = gulp.src(CONFIG.DESTINATIONS.TARGET + "/rev-manifest.json");
        return gulp.src(CONFIG.SOURCES.INDEX)
            .pipe(revReplace({manifest: manifest}))
            .pipe(gulp.dest(CONFIG.DESTINATIONS.TARGET))
    }
});

gulp.task('karma', function (done) {
    karma.server.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done);
});
