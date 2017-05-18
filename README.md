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

console.log(jsonStr)
/**
* Example of json file

{
  "greetings": "Hello",
  "answers": 42,
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
```

PHP Array Output  
```php
array(
        "greetings" => "Hello",
        "answers" => 42,
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

### Options
`jsonar(json: Object | String, prettify?: Boolean = false, indent?: Number = 1, withTab?: Boolean = true)`


| Arguments | Description |
| --- | --- |
| **json** | JSON string or Javascript Object. |
| **prettify** | Pretty Format. |
| **indent** | How many indentation you want to use. |
| **withTab** | Using space or tab. Set false if you wanna use space. |

## License
MIT © [oknoorap](https://github.com/oknoorap)
