# custom-tpl
A lightweight object template. Recursively interpolates all string properties.

`npm i custom-tpl`

Usage example:
```js
const Interpolate = require('./tpl.js')('${', '}'); // You can change the strings to anything else
var tpl = { // The object containing the templates to be replaced
    text: 'Var: ${Text}',
    print: function () {
        console.log(this);
    },
    array: ['${Name}', '${LastName}'],
    obj: {
        innertext: '${Text2}',
        innertext2: '${Text3}',
        innerobj: {
            innertext: '${Text2} ${example} ${DateTime}'
        }
    }
};
var obj = { // The object containing the text that will be replaced in the template object
    Text: 'First text',
    Text2: 'Example',
    Text3: 'This is a test',
    Name: 'Joe',
    LastName: 'Smith',
    DateTime: new Date().toLocaleString()
};
Interpolate(tpl, obj);
tpl.print();
```

Output: 
```
{
  text: 'Var: First text',
  print: [Function: print],
  array: [ 'Joe', 'Smith' ],
  obj: {
    innertext: 'Example',
    innertext2: 'This is a test',
    innerobj: { innertext: 'Example ${example} 28/02/2020 04:18:58' }
  }
}
```
