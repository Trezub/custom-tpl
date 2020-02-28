const Interpolate = require('./tpl.js')('${', '}');
var tpl = {
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
var obj = {
    Text: 'First text',
    Text2: 'Example',
    Text3: 'This is a test',
    Name: 'Joe',
    LastName: 'Smith',
    DateTime: new Date().toLocaleString()
};
Interpolate(tpl, obj);
tpl.print();
