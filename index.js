/* eslint-disable quotes */
const escapeQuotes = require('escape-quotes')
const isPlainObject = require('lodash.isplainobject')

const phpLexer = {
  L_PARENTHESIS: '(',
  R_PARENTHESIS: ')',
  ARRAY_POINTER: '=>',
  ARRAY_KEYWORD: 'array',
  NULL_KEYWORD: 'null',
  EMPTY_KEYWORD: "''",
  COMMA: ','
}

const indentTypes = {
  SPACE: ' ',
  TAB: '\t'
}

const quoteTypes = {
  SINGLE: "'",
  DOUBLE: '"'
}

const isString = str => {
  return typeof str === 'string'
}

const isArray = arr => {
  return typeof arr === 'object' && Array.isArray(arr)
}

const isJSON = json => {
  try {
    return JSON.parse(json)
  } catch (err) {
    return false
  }
}

const literal = string => {
  return {
    isLiteral: true,
    string
  }
}

const parser = (obj, options, tree = 1) => {
  tree = tree < 0 ? 0 : tree
  const result = []
  const objSize = typeof obj === 'object' && obj !== null ? Object.keys(obj).length : 0
  const hasIndent = options.indent > 0
  const indentChar = options.space ? indentTypes.SPACE : indentTypes.TAB

  const addTabTo = (arr, treeCount) => {
    if (!treeCount && isNaN(treeCount)) {
      treeCount = tree
    }

    if (hasIndent) {
      const indentChars = []
      for (let i = 0; i < options.indent * treeCount; i++) {
        indentChars.push(indentChar)
      }
      arr.push(indentChars.join(''))
    }
  }

  const addNewLineTo = arr => {
    if (hasIndent) {
      arr.push('\n')
    }
  }

  const addSpaceTo = arr => {
    if (hasIndent) {
      arr.push(' ')
    }
  }

  if (isPlainObject(obj) && obj.isLiteral) {
    return obj.string
  } else if (isPlainObject(obj)) {
    result.push(phpLexer.ARRAY_KEYWORD)
    result.push(phpLexer.L_PARENTHESIS)
    addNewLineTo(result)

    let index = 0
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const arrKey = options.quote + escapeQuotes(key) + options.quote
        const arrValue = obj[key]
        addTabTo(result)
        result.push(arrKey)
        addSpaceTo(result)
        result.push(phpLexer.ARRAY_POINTER)
        addSpaceTo(result)
        result.push(parser(arrValue, options, tree + 1))
        index++
      }

      if (index < objSize) {
        result.push(phpLexer.COMMA)
        addNewLineTo(result)
      }
    }

    addNewLineTo(result)
    addTabTo(result, tree - 1)
    result.push(phpLexer.R_PARENTHESIS)
    return result.join('')
  } else if (isArray(obj)) {
    result.push(phpLexer.ARRAY_KEYWORD)
    result.push(phpLexer.L_PARENTHESIS)
    obj.forEach((item, index) => {
      addNewLineTo(result)
      addTabTo(result)
      result.push(parser(item, options, tree + 1))
      if (index < obj.length - 1) {
        result.push(phpLexer.COMMA)
      } else {
        addNewLineTo(result)
        addTabTo(result, tree - 1)
      }
    })
    result.push(phpLexer.R_PARENTHESIS)
    return result.join('')
  } else if (isString(obj)) {
    return options.quote + escapeQuotes(obj) + options.quote
  } else if ((!obj || objSize === 0) && isPlainObject(obj)) {
    result.push(phpLexer.ARRAY_KEYWORD)
    result.push(phpLexer.L_PARENTHESIS)
    result.push(phpLexer.R_PARENTHESIS)
    return result.join('')
  } else if (obj === null) {
    result.push(phpLexer.NULL_KEYWORD)
    return result.join(null)
  } else if (isNaN(obj)) {
    result.push(phpLexer.EMPTY_KEYWORD)
    return result.join('')
  }

  return obj
}

exports.quoteTypes = quoteTypes

exports.arrify = (json, options) => {
  const defaultOptions = Object.assign({}, {
    prettify: false,
    indent: 1,
    space: false,
    quote: quoteTypes.DOUBLE
  })
  options = Object.assign(defaultOptions, options)
  options.indent = (options.prettify === false) ? 0 : options.indent

  const validJSON = isJSON(json)
  let object = validJSON || {}
  object = isPlainObject(json) ? json : object

  const phpArray = parser(object, options)
  return `${phpArray};`
}

exports.literal = literal
