const path = require('path')
const fs = require('fs')

const generateScssIndex = (dirpath) => {
  const pwd = process.cwd()
  const dir = path.join(pwd, dirpath)
  const files = fs.readdirSync(dir).filter((file) => path.basename(file) !== '_index.scss')
  const names = files.map((file) => path.basename(file, '.scss').replace('_', ''))
  const importBody = names.map((name) => `@import '${name}';`).join('\n')
  fs.writeFileSync(`${dir}/_index.scss`, [importBody].join('\n'), console.error)
}

module.exports = {
  generateScssIndex,
}
