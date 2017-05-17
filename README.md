# :sunny: JSONAR
Convert JSON to PHP native Array.

## Install
Using NPM  
`npm install jsonar --save`

Using JSON  
`yarn add jsonar`

## Usage
```javascript
const fs = require('fs')
const path = require('path')
const jsonar = require('jsonar')
const jsonStr = fs.readFileSync(path.join(__dirname, 'test.json'), 'ascii')

console.log(jsonStr)
/**
* Example of json file

{
  "test": "abc",
  "hello": [1, 2 "string"],
  "tada": {
    "surprise": true,
    "good": "yes",
    "sub": {
      "tree": 2
    }
  },
  "arr": [
    {
      "id": "plntX",
	  "content": "Planet X"
    },

    {
      "id": "plntY",
	  "content": "Planet Y"
    }
  ]
}
*/
```

PHP Array Output  
```php
array(
	"test" => "abc",
	"hello" => array(
		1,
		2,
		"string"
	),
	"tada" => array(
		"surprise" => true,
		"good" => "yes",
		"sub" => array(
			"tree" => 2
		)
	),
	"arr" => array(
		array(
			"id" => "plntX",
			"content" => "Planet X"
		),

		array(
			"id" => "plntY",
			"content" => "Planet Y"
		)
	)
);

```

## License
MIT © [oknoorap](https://github.com/oknoorap)
