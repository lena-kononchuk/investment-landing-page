import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import uglify from 'gulp-uglify';
import concat from 'gulp-concat';
import rename from 'gulp-rename';
import cleanCSS from 'gulp-clean-css';
import sourcemaps from 'gulp-sourcemaps';
import htmlmin from 'gulp-htmlmin';
import { deleteAsync } from 'del';

// Paths to source files and destination folder
const paths = {
  html: {
    src: 'index.html',
    dest: 'build/'
  },
  styles: {
    src: 'css/styles.min.css',
    dest: 'build/css/'
  },
  scripts: {
    src: ['js/app.js', 'js/validation.js', 'js/range.js'],
    dest: 'build/js/'
  },
  images: {
    src: 'img/**/*',
    dest: 'build/img/'
  },
  sections: {
    src: 'section/*.html',
    dest: 'build/section/'
  },
  fonts: {
    src: 'font/**/*',
    dest: 'build/font/'
  }
};

// Clean task to delete the build folder
const clean = () => {
  return deleteAsync(['build']);
};

// Task for processing HTML files
const html = () => {
  return gulp.src(paths.html.src)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(paths.html.dest));
};

// Task for copying minified CSS
const styles = () => {
  return gulp.src(paths.styles.src)
    .pipe(gulp.dest(paths.styles.dest));
};

// Task for processing and minifying JavaScript files
const scripts = () => {
  return gulp.src(paths.scripts.src)
    .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.scripts.dest));
};

// Task for optimizing images
const images = () => {
  return gulp.src(paths.images.src)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.images.dest));
};

// Task for copying sections
const sections = () => {
  return gulp.src(paths.sections.src)
    .pipe(gulp.dest(paths.sections.dest));
};

// Task for copying fonts
const fonts = () => {
  return gulp.src(paths.fonts.src)
    .pipe(gulp.dest(paths.fonts.dest));
};

// Watch files for changes
const watchFiles = () => {
  gulp.watch(paths.html.src, html);
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.images.src, images);
  gulp.watch(paths.sections.src, sections);
  gulp.watch(paths.fonts.src, fonts);
};

// Defining complex tasks
const build = gulp.series(clean, gulp.parallel(html, styles, scripts, images, sections, fonts));
const watch = gulp.series(build, watchFiles);

// Exporting tasks for CLI usage
export { clean, html, styles, scripts, images, sections, fonts, build, watch };
