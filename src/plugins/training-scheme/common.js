const fs = require('fs')
const trainingSchemeList = JSON.parse(fs.readFileSync('src/data/training-scheme-list.json', 'utf8'))

module.exports = { trainingSchemeList }
