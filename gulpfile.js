'use strict';

const fs = require('fs-extra')
const gulp = require('gulp')
const browserSync = require('browser-sync')
const autoprefixer = require('autoprefixer')
const $postcss = require('gulp-postcss')
const $sass = require('gulp-sass')
const $plumber = require('gulp-plumber')

const { generateScssIndex } = require('./lib/helpers')
const {
  src,
  sassOptions,
  autoprefixerOptions,
  browserSyncOptions
} = require('./gulpconfig')

gulp.task('default', () => {
  gulp.start(['serve'])
})

gulp.task('serve', ['sass'], () => {
  browserSync.init(browserSyncOptions)
  gulp.watch(src.html).on('change', browserSync.reload)
  gulp.watch(src.scss, ['sass'])
})

gulp.task('generateScssIndex', () => {
  ['./app/assets/scss/components'].forEach(generateScssIndex)
})

gulp.task('sass', ['generateScssIndex'], () => {
  const postcssProcessers = [autoprefixer(autoprefixerOptions)]
  return gulp.src(src.scss)
    .pipe($plumber())
    .pipe($sass(sassOptions).on('error', $sass.logError))
    .pipe($postcss(postcssProcessers))
    .pipe(gulp.dest(src.css))
    .pipe(browserSync.stream())
})

gulp.task('build', ['sass'], async () => {
  const removeTargets = [`${src.dist}/assets/scss`]

  try {
    await fs.copy(src.app, src.dist)
    removeTargets.forEach((it) => {
      if (fs.existsSync(it)) {
        fs.remove(it)
      }
    })
  } catch (err) {
    console.error(err)
  }
})
