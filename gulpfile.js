'use strict';

const fs = require('fs-extra')
const gulp = require('gulp')
const browserSync = require('browser-sync')
const autoprefixer = require('autoprefixer')
const $postcss = require('gulp-postcss')
const $sass = require('gulp-sass')
const $plumber = require('gulp-plumber')

const { generateScssIndex } = require('./build/lib/helpers')
const {
  src,
  sassOptions,
  autoprefixerOptions,
  browserSyncOptions
} = require('./build/config')

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
  const excludedPaths = ['/assets/scss']
  const dist = src.dist

  try {
    await fs.copy(src.app, dist)
    excludedPaths.forEach((path) => {
      const dir = `${dist}${path}`
      if (fs.existsSync(dir)) {
        fs.remove(dir)
      }
    })
  } catch (err) {
    console.error(err)
  }
})
