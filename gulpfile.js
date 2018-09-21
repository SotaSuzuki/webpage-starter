'use strict';

const path = require('path')
const fs = require('fs-extra')
const gulp = require('gulp')
const browserSync = require('browser-sync')
const autoprefixer = require('autoprefixer')
const $postcss = require('gulp-postcss')
const $sass = require('gulp-sass')
const $plumber = require('gulp-plumber')

const {
  src,
  sassOptions,
  autoprefixerOptions,
  browserSyncOptions
} = require('./gulpconfig')

gulp.task('default', () => {
  gulp.start(['serve'])
})

gulp.task('serve', ['generateIndex', 'sass'], () => {
  browserSync.init(browserSyncOptions)
  gulp.watch(src.html).on('change', browserSync.reload)
  gulp.watch(src.scss, ['generateIndex', 'sass'])
})

gulp.task('generateIndex', () => {
  const pwd = process.cwd()
  const generateIndex = (dirpath) => {
    const dir = path.join(pwd, dirpath)
    const files = fs.readdirSync(dir).filter((it) => ['.scss', ''].indexOf(path.extname(it)) !== -1 && path.basename(it) !== '_index.scss')
    const names = files.map((file) => path.basename(file, '.scss').replace('_', ''))
    const importBody = names.map((name) => `@import '${name}';`).join('\n')
    fs.writeFileSync(dir + '/_index.scss', [importBody].join('\n', console.error))
  }

  ['./app/assets/scss/components'].forEach(generateIndex)
})

gulp.task('sass', () => {
  const postcssProcessers = [autoprefixer(autoprefixerOptions)]
  return gulp.src(src.scss)
    .pipe($plumber())
    .pipe($sass(sassOptions).on('error', $sass.logError))
    .pipe($postcss(postcssProcessers))
    .pipe(gulp.dest(src.css))
    .pipe(browserSync.stream())
})

gulp.task('build', async () => {
  const removeTargets = [
    `${src.dist}/assets/scss`
  ]
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
