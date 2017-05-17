# :sunny: JSONAR
Convert JSON to PHP native Array.

## Install
Using NPM  
`npm install jsonar --save`

Using JSON  
`yarn add jsonar`

## Usage
JSON  
```javascript
const jsonar = require('jsonarr')
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
			"test": 0
		},

		{
			"test": 1
		}
	]
}
```

PHP Array  
```php
<?php

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
            "test" => 0
		    ),

        array(
            "test" => 1
		    )
    )
);

```

## License
MIT © [oknoorap](https://github.com/oknoorap)
