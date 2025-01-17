const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const postcss = require("gulp-postcss");  // Add vendor prefixes to CSS
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

var path = {
    // source paths
    src: {
        pages: "public/**/*.html",
        styles: "public/assets/styles/scss/**/*.scss",
        scripts: "public/assets/scripts/**/*.js",
        plugins: "public/plugins/**/*"
    },

    // build paths
    build: {
        dir: "public/",
        styles: "public/assets/styles/css/",
        scripts: "public/assets/scripts/",
        plugins: "public/plugins/",
    },
};

// Task to compile SCSS to CSS
gulp.task('styles', function () {
    return gulp.src(path.src.styles) // Source SCSS files
        .pipe(sourcemaps.init()) // Initialize sourcemaps
        .pipe(
            sass({
                outputStyle: "compressed",
            }).on("error", sass.logError)
        ) // Compile SASS to CSS
        .pipe(
            postcss([
                autoprefixer(), // Add vendor prefixes
                cssnano() // Further minify CSS using PostCSS
            ])
        )
        .pipe(sourcemaps.write(".")) // Write sourcemaps to the same directory
        .pipe(gulp.dest(path.build.styles)); // Destination folder for compiled CSS
});

// Task to watch SCSS changes and recompile
gulp.task('watch', function () {
    // gulp.watch(path.src.pages).on('change', browserSync.reload);
    gulp.watch(path.src.styles, gulp.parallel("styles"));
    // gulp.watch(path.src.scripts, gulp.parallel("scripts"));
    // gulp.watch(path.src.plugins, gulp.parallel("plugins"));
});

// dev Task
gulp.task(
    "dev",
    gulp.series(
        // "clean",
        "styles",
        // "scripts",
        // "plugins",
        // gulp.parallel("watch", "serve")
        gulp.parallel("watch")
    )
);
