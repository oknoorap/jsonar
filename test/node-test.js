const {readFileSync} = require('fs')
const path = require('path')
const jsonar = require('../index')

const exampleFile = path.join(__dirname, 'example.json')
const json = readFileSync(exampleFile, 'ascii')
console.log(jsonar.arrify(json, {prettify: true, quote: jsonar.quoteTypes.SINGLE})) // eslint-disable-line no-console
