let gulp = require('gulp'),
	rename = require('gulp-rename'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync'),
	autoprefixer = require('gulp-autoprefixer'),
	sourcemaps = require('gulp-sourcemaps'),
	del = require('del');

gulp.task('export', function(done) {
	let buildHtml = gulp.src('src/**/*.html')
		.pipe(gulp.dest('dist/'));
	let buildCss = gulp.src('src/css/**/*.*')
		.pipe(gulp.dest('dist/css/'));
	let buildJs = gulp.src('src/js/**/*.*')
		.pipe(gulp.dest('dist/js/'));
	let buildImg = gulp.src('src/img/**/*.*')
		.pipe(gulp.dest('dist/img/'));
	let buildFonts = gulp.src('src/fonts/**/*.*')
		.pipe(gulp.dest('dist/fonts/'));
	done();
});

gulp.task('clean', function(done) {
	del.sync('dist');
	done();
});

gulp.task('scss', function(done) {
	return gulp.src('node_modules/normalize.css/normalize.css')
		.pipe(rename('_libs.scss'))
		.pipe(gulp.dest('src/scss/'))
});

gulp.task('css', function() {
	return gulp.src('src/scss/main.scss')
		.pipe(rename('style.scss'))
		.pipe(rename({suffix: '.min'}))
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: 'compressed'}))
		.pipe(autoprefixer())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('src/css/'))
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('html', function() {
	return gulp.src('src/**/*.html')
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('js', function() {
	return gulp.src('src/js/**/*.js')
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function() {
	browserSync.init({
			server: {
					baseDir: 'src/'
			}
	});
});

gulp.task('watch', function() {
	gulp.watch('src/scss/**/*.scss', gulp.parallel('css'));
	gulp.watch('src/**/*.html', gulp.parallel('html'));
	gulp.watch('src/js/**/*.js', gulp.parallel('js'));
});

gulp.task('default', gulp.series('scss', 'css', gulp.parallel('browser-sync', 'watch')));
gulp.task('build', gulp.series('clean', 'export'));