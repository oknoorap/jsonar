const isPlainObject = require('lodash.isplainobject')

const phpLexer = {
  L_PARENTHESIS: '(',
  R_PARENTHESIS: ')',
  ARRAY_POINTER: '=>',
  ARRAY_KEYWORD: 'array',
  NULL_KEYWORD: '""',
  COMMA: ','
}

const indentType = {
  SPACE: ' ',
  TAB: '\t'
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

const parser = (obj, indent, tree = 1, indentCharTab) => {
  tree = tree < 0 ? 0 : tree
  const result = []
  const objSize = typeof obj === 'object' ? Object.keys(obj).length : 0
  const hasIndent = indent && indent > 0
  const indentChar = indentCharTab ? indentType.TAB : indentType.SPACE

  const addTabTo = (arr, treeCount) => {
    if (!treeCount && isNaN(treeCount)) {
      treeCount = tree
    }

    if (hasIndent) {
      const indentChars = []
      for (let i = 0; i < indent * treeCount; i++) {
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

  if ((!obj || objSize === 0) && isPlainObject(obj)) {
    result.push(phpLexer.ARRAY_KEYWORD)
    result.push(phpLexer.L_PARENTHESIS)
    result.push(phpLexer.R_PARENTHESIS)
    return result.join('')
  }

  if (!obj) {
    result.push(phpLexer.NULL_KEYWORD)
    return result.join('')
  }

  if (isPlainObject(obj)) {
    result.push(phpLexer.ARRAY_KEYWORD)
    result.push(phpLexer.L_PARENTHESIS)
    addNewLineTo(result)

    let index = 0
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const arrKey = JSON.stringify(key)
        const arrValue = obj[key]
        addTabTo(result)
        result.push(arrKey)
        addSpaceTo(result)
        result.push(phpLexer.ARRAY_POINTER)
        addSpaceTo(result)
        result.push(parser(arrValue, indent, tree + 1, indentCharTab))
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
      result.push(parser(item, indent, tree + 1, indentCharTab))
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
    return JSON.stringify(obj)
  }

  return obj
}

module.exports = (json, prettify = false, indent = 1, indentCharTab = true) => {
  const validJSON = isJSON(json)
  let object = validJSON || {}
  object = isPlainObject(json) ? json : object

  const phpArray = parser(object, (prettify === false) ? 0 : indent, 1, indentCharTab)
  return `${phpArray};`
}
