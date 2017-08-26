# :sunny: JSONAR
Convert JSON or javascript object to PHP native Array.

## Install
Using NPM  
`npm install jsonar --save`

Using Yarn  
`yarn add jsonar`

## Usage
```javascript
const fs = require('fs')
const path = require('path')
const jsonar = require('jsonar')
const jsonStr = fs.readFileSync(path.join(__dirname, 'test.json'), 'ascii')
const world = 'World'

console.log(jsonStr)
/**
* Example of json file

{
  "greetings": "Hello",
  "answers": 42,
  "slug": jsonar.literal(`slugify_fn("Hello ${world}")`),
  "inception": {
    "nested": {
      "object": true
    },
    "array": [
      "string",
      true,
      100,
      {
        "inception": true
      }
    ]
  },
  "playlist": [
    {
      "id": "DHyUYg8X31c",
      "desc": "Do Robots Deserve Rights? What if Machines Become Conscious?"
    },
    {
      "id": "ijFm6DxNVyI",
      "desc": "The Most Efficient Way to Destroy the Universe - False Vacuum"
    }
  ]
}
*/

const phpArray = jsonar.arrify(jsonStr, {prettify: true})
```

PHP Array Output  
```php
array(
        "greetings" => "Hello",
        "answers" => 42,
        "slug" => slug_fn("Hello World"),
        "inception" => array(
                "nested" => array(
                        "object" => true
                ),
                "array" => array(
                        "string",
                        true,
                        100,
                        array(
                                "inception" => true
                        )
                )
        ),
        "playlist" => array(
                array(
                        "id" => "DHyUYg8X31c",
                        "desc" => "Do Robots Deserve Rights? What if Machines Become Conscious?"
                ),
                array(
                        "id" => "ijFm6DxNVyI",
                        "desc" => "The Most Efficient Way to Destroy the Universe - False Vacuum"
                )
        )
);
```

```javascript
// Convert array to json again
jsonar.parse(`your php array string here`)
```

### Methods
#### `jsonar.arrify(json: Object | String, options: Object)`

| Arguments | Description |
| --- | --- |
| **json** | JSON string or Javascript Object. |
| **options** | Default options are: `{ prettify: false, indent: 1, space: false, quote: jsonar.quoteTypes.DOUBLE }` |

#### `jsonar.parse(phpString: String, options: Boolean)`

| Arguments | Description |
| --- | --- |
| **phpString** | PHP String. |
| **options** | Default options are: `{ asObject: true, emptyRules: {} }`, `emptyRules` should be objects that has the same structure with your object, if you don't set `emptyRules` all empty objects will be converted as primitive array `[]`, because PHP AST read an empty object as array |

#### `jsonar.literal(string)`

### Constants
`jsonar.quoteTypes.SINGLE = '`  
`jsonar.quoteTypes.DOUBLE = "`

## License
MIT © [oknoorap](https://github.com/oknoorap)
