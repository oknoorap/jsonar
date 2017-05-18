import {readFile} from 'fs'
import path from 'path'
import test from 'ava'
import jsonar from '../index'

const exampleFile = path.join(__dirname, 'example.json')
const jsonFile = () => {
  return new Promise(resolve => {
    readFile(exampleFile, 'ascii', (err, data) => {
      if (err) {
        throw new Error(err)
      }
      resolve(data)
    })
  })
}

/*
Output:
array(
  "greetings" => "hello",
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
        "inception": true
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
      "desc" => "The Most Efficient Way to Destroy the Universe – False Vacuum"
    )
  ),
  "weird" => "Hello Universe is a \"Virtual 'World'\""
);
*/
test('json is valid PHP array (minified)', async t => {
  await jsonFile().then(result => {
    t.is(jsonar(result), `array("greetings"=>"hello","answers"=>42,"inception"=>array("nested"=>array("object"=>true),"array"=>array("string",true,100,array("inception":true))),"playlist"=>array(array("id"=>"DHyUYg8X31c","desc"=>"Do Robots Deserve Rights? What if Machines Become Conscious?"),array("id"=>"ijFm6DxNVyI","desc"=>"The Most Efficient Way to Destroy the Universe – False Vacuum")),"weird"=>"Hello Universe is a \\"Virtual 'World'\\"");"`)
  })
})

test('json is valid PHP array (prettify)', async t => {
  await jsonFile().then(result => {
    t.is(jsonar(result, true), ``)
  })
})

test('json is valid PHP array (prettify) 2 indentation', async t => {
  await jsonFile().then(result => {
    t.is(jsonar(result, true, 2), ``)
  })
})
