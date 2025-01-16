const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const postcss = require("gulp-postcss");  // Add vendor prefixes to CSS
const autoprefixer = require('gulp-autoprefixer');  // Correct import

// Task to compile SCSS to CSS
gulp.task('styles', function () {
    return gulp.src('public/scss/**/*.scss') // Source SCSS files
        .pipe(sourcemaps.init()) // Initialize sourcemaps
        .pipe(
            sass({
                outputStyle: "compressed",
            }).on("error", sass.logError)
        ) // Compile SASS to CSS
        .pipe(sourcemaps.write(".")) // Write sourcemaps to the same directory
        .pipe(gulp.dest('public/css')); // Destination folder for compiled CSS
});

// Task to watch SCSS changes and recompile
gulp.task('watch', function () {
    gulp.watch('public/scss/**/*.scss', gulp.series('styles')); // Watch SCSS files for changes
});

// Default task
gulp.task('default', gulp.series('styles', 'watch'));
