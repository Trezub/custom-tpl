# custom-tpl
A lightweight object template. Recursively interpolates all string properties.

`npm i custom-tpl`

If a string contains only a tag, and no more text, the string will be replaced by the object value. Else, the object's string representation will be used instead.

Usage example:
```js
const Interpolate = require('./tpl.js')('${', '}');
var tpl = {
    text: 'Var: ${Text} ${Text2}',
    print: function () {
        console.log(this);
    },
    array: ['${Name}', '${LastName}'],
    obj: {
        innertext: '${Text2}',
        innertext2: '${Text3} Parameter: ${Object}', // String representation of a object
        parameter: '${Object}', // Object reference.
        innerobj: {
            innertext: '${Text2} ${example} ${DateTime}'
        }
    }
};
var obj = {
    Text: 'First text',
    Text2: 'Example',
    Text3: 'This is a test.',
    Name: 'Joe',
    LastName: 'Smith',
    DateTime: new Date().toLocaleString(),
    Object: {
        a: 1,
        b: 2
    }
};
let v = Interpolate(tpl, obj);
v.print();
```

Output: 
```js
{
  text: 'Var: First text Example',
  print: [Function: print],
  array: [ 'Joe', 'Smith' ],
  obj: {
    innertext: 'Example',
    innertext2: 'This is a test. Parameter: [object Object]',
    parameter: { a: 1, b: 2 },
    innerobj: { innertext: 'Example ${example} 10/03/2020 08:42:58' }
  }
}
```
