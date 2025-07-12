const path = require('path')

const appDir = process.cwd()

const resolveApp = (relativePath) => {
  return path.resolve(appDir, relativePath)
}

module.exports = resolveApp
