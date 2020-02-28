/**
 * @param {string} left The left side string. e.g.: '${'
 * @param {string} right The right side string. e.g.: '}'
 * @returns {function(object, object): void}
 */
module.exports = function (left = '${', right = '}') {
    return function (template, object) {
        ReplaceAll(left, right, template, object);
    }
}
function ReplaceAll(left, right, template, object) {
    for (let tkey in template) {
        switch (typeof template[tkey]) {
            case 'string':
                for (let okey in object) {
                    let replaced = template[tkey].replace(`${left}${okey}${right}`, object[okey]);
                    if (replaced !== template[tkey]) {
                        template[tkey] = replaced;
                    }
                }
                break;
            case 'object':
                ReplaceAll(left, right, template[tkey], object);
        }
    }
}