import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import del from 'del';
import cp from 'child_process';
import {stream as wiredep} from 'wiredep';
import fs from 'fs';
import rs from 'run-sequence';

var argv = require('yargs').argv;

const $ = gulpLoadPlugins();
const reload = browserSync.reload;
const pkg = require('./package.json');

var env = argv.env || pkg.config.dev_destination;

gulp.on('err', function(err){
    process.exit(1);
    throw Error('Build Failed');
});

/*
* Compiles Jekyll then refreshes once done
*/
gulp.task('jekyll', (done) => {
    browserSync.notify('Jekyll rebuilt');
    cp.spawn('jekyll', ['build', '--destination', env], {stdio: 'inherit'}).on('close', function(){
        done();
        reload();
    });
});

/*
* Compiles SCSS Files into the env folder
*/
gulp.task('styles', () => {
    return gulp.src('_scss/*.scss')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass.sync({
        outputStyle: 'expanded',
        precision: 10,
        includePaths: ['.']
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(env + '/assets/css'))
    .pipe(reload({stream: true}));
});

/*
* Runs ESLint on JS
*/
function lint(files) {
  return () => {
    return gulp.src(files)
      .pipe(reload({stream: true, once: true}))
      .pipe($.eslint({
        "env": {
            "browser": true,
            "node": true
        },
        "globals" : {
            "$": true,
            "_": true,
            "$f": true
        },
        "rules": {
            "no-undef": false,
            "no-multi-spaces": false
        }
      }))
      .pipe($.eslint.format())
      .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
  };
}

gulp.task('lint', lint(['scripts/*.js', '!scripts/nodes.js']));

/*
* Find our generated html files
* and inline the critical css
*/
gulp.task('inline-critical', () => {
    return gulp.src(env + '/**/*.html')
    .pipe($.inlineSource())
    .pipe(gulp.dest(env));
});

/*
* Download google tools
*/
gulp.task('google-things', () => {
    $.download('https://www.google-analytics.com/analytics.js')
    .pipe(gulp.dest('scripts/vendor'))
    $.download('https://raw.githubusercontent.com/typekit/webfontloader/master/webfontloader.js')
    .pipe(gulp.dest('scripts/vendor'))
});

/*
* Minify JS, CSS, HTML and include critical.css
*/
gulp.task('minify', () => {

    /*
    * Take all the generated .html files
    * and we pull out the .js and css files
    * we then concatinate them and minify
    */
    return gulp.src( env + '/**/*.html')
    .pipe($.useref({searchPath: ['.tmp', env, '.', 'scripts', 'assets/css', 'assets/js']}))
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.html', $.htmlmin({
        collapseWhitespace: true,
        removeComments: true
    })))
    .pipe(gulp.dest(env));

});

gulp.task('minify-sass', () => {

    /*
    * Once everythings extracted we minify the sass
    */
    return gulp.src( env + '/assets/css/site.css')
    .pipe($.cssnano({
        discardComments: { removeAll: true },
        discardEmpty: true
    }))
    .pipe(gulp.dest(env + '/assets/css'));
});

/*
* Optimises Images for Distribution
*/
gulp.task('images', () => {
    return gulp.src( './assets/img/**/*.*')
    .pipe($.if($.if.isFile, $.cache($.imagemin({
        progressive: true,
        interlaced: true,
        svgoPlugins: [{cleanupIDs: false}]
    }))
    .on('error', function (err) {
        console.log(err);
        this.end();
    })))
    .pipe(gulp.dest(env + '/assets/img'));
});

/*
* Copies any extra files like robots.txt etc
*/
gulp.task('extras', () => {
    return gulp.src([
        env + '/*.*',
        '!' + env + '/**/*.html'
        ], {
        dot: true
    }).pipe(gulp.dest(env));
});

gulp.task('clean', del.bind(null, ['.tmp', 'dist', 'dev', env]));

/*
* Boot up browser-sync then
* start some watchers to inject
* updated code, then we force generate the
* styles
*/
gulp.task('serve', ['clean','jekyll'], (done) => {

    /*
    * Boots up bS
    */
    browserSync({
        notify: false,
        port: 9000,
        open: false,
        server: {
            baseDir: [env, '.', 'assets'],
            routes: {
                '/bower_components': 'bower_components'
            }
        }
    });

    /*
    * Watch some files to inject
    */
    gulp.watch([
        'scripts/**/*.js',
        env + '/images/**/*',
    ]).on('change', reload);

    gulp.watch('scripts/**/*.js', ['lint','dev-scripts']);
    gulp.watch('_scss/**/*.scss', ['styles']);
    gulp.watch('bower.json', ['wiredep']);
    gulp.watch(['**/*.html', '**/*.md', '!' + env + '/**/*.html'], ['rebuild-jekyll']);

    /*
    * Just force runs it the first time
    */
    gulp.start('styles');
});

gulp.task('rebuild-jekyll', (cb) => {
    return rs('jekyll', 'styles', function(){
        reload();
        cb();
    });
});

gulp.task('serve:dist', () => {

    /*
    * Boots up bS from the distribution folder
    */
    browserSync({
        notify: false,
        port: 9000,
        server: {
            baseDir: [pkg.config.dist_destination]
        }
    });
});

gulp.task('dev-scripts', () => {

    /*
    * Copies JS into temp folders
    */
    gulp.src('scripts/**/*.js')
    .pipe(wiredep({
        ignorePath: /^(\.\.\/)+/
    }))
    .pipe(gulp.dest( env + '/scripts'));
});

/*
* Listens for new dependencies from bower and injects them
*/
gulp.task('wiredep', () => {

    gulp.src('_scss/*.scss')
        .pipe(wiredep({
        ignorePath: /^(\.\.\/)+/
    }))
    .pipe(gulp.dest( env + '/assets/css'));

    gulp.src('_layouts/*.html')
        .pipe(wiredep({
        ignorePath: /^(\.\.\/)*\.\./
    }))
    .pipe(gulp.dest( '_layouts' ));

    gulp.src('_includes/footer.html')
        .pipe(wiredep({
        ignorePath: /^(\.\.\/)*\.\./
    }))
    .pipe(gulp.dest( '_includes' ));
});

/*
* Alias task to force order running
*/
gulp.task('build', (cb) => {
    return rs('clean', ['lint', 'jekyll', 'images'], 'styles', ['extras', 'minify'], 'minify-sass','inline-critical', cb);
});

/*
* Default task - which is distrubtion mode
*/
gulp.task('default', ['clean'], () => {
  env = pkg.config.dist_destination;
  return gulp.start('build');
});

/*
* Pre-Hook task
*/
gulp.task('precommit', ['clean'], (cb) => {
  env = pkg.config.dist_destination;
  return rs('clean', ['lint', 'jekyll'], 'styles');
});

