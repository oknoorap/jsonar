const {readFileSync} = require('fs')
const path = require('path')
const jsonar = require('../index')

const exampleFile = path.join(__dirname, 'example.json')
const json = readFileSync(exampleFile, 'ascii')
console.log(jsonar(json, true)) // eslint-disable-line no-console
