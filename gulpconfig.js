module.exports = {
  src: {
    app: 'app',
    dist: 'dist',
    html: 'app/**/*.html',
    css: 'app/assets/css',
    scss: 'app/assets/scss/**/*.scss',
  },

  sassOptions: {
    outputStyle: 'expanded',
  },

  autoprefixerOptions: {
    grid: true,
  },

  browserSyncOptions: {
    server: 'app',
    ui: false,
    port: 9001,
    open: false,
  },
}
