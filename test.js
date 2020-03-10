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
