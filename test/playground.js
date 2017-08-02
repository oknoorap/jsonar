const {readFileSync} = require('fs')
const path = require('path')
const jsonar = require('../index')

const exampleFile = path.join(__dirname, 'example.json')
const json = readFileSync(exampleFile, 'ascii')

/* eslint-disable no-console */
const output = jsonar.arrify(json, {prettify: true, quote: jsonar.quoteTypes.SINGLE})
console.log(output)

const secondJson = Object.assign({}, JSON.parse(json))
secondJson.fn = jsonar.literal('__( \'Hello World\' , \'text-domain\', true, 10 )')

const secondOutput = jsonar.arrify(secondJson, {prettify: true, quote: jsonar.quoteTypes.SINGLE})
console.log(secondOutput)
console.log('parsing', JSON.stringify(jsonar.parse(secondOutput), null, 2))
/* eslint-enable */
