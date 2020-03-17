const Escape = require('regex-escape');
/**
 * @param {string} left The left side string. e.g.: '${'
 * @param {string} right The right side string. e.g.: '}'
 * @returns {function(object, object): any}
 */
module.exports = function (left = '${', right = '}') {
    return function (template, object) {
        return ReplaceAll(left, right, template, object);
    }
}
function ReplaceKeys(tpl, object, matches, left, right) {
    let str = tpl;
    if (matches != null) {
        for (let key of matches) {
            if (typeof object[key] === 'string' || str !== left + key + right) {
                if (object[key] !== undefined) {
                    str = str.replace(left + key + right, object[key]);
                }
            } else {
                return object[key];
            }
        }
    }
    return str;
}
/**
 * @param {string} left 
 * @param {string} right 
 * @param {object | string} template 
 * @param {object} object 
 */
function ReplaceAll(left, right, template, object) {
    if (template == null) return template;
    let output;
    const regex = new RegExp(`(?<=${Escape(left)})[\\w-]+(?=${Escape(right)})`, 'g');
    switch (typeof template) {
        case 'object':
            if (template instanceof Array) {
                output = [];
            } else {
                output = {};
                Object.setPrototypeOf(output, Object.getPrototypeOf(template));
            }
            break;
        case 'string':
            return ReplaceKeys(template, object, template.match(regex), left, right);
        default:
            return template;
    }
    for (let templateKey in template) {
        switch (typeof template[templateKey]) {
            case 'string':
                output[templateKey] = ReplaceKeys(template[templateKey], object, template[templateKey].match(regex), left, right);
                break;
            case 'object':
                output[templateKey] = ReplaceAll(left, right, template[templateKey], object);
                break;
            default:
                output[templateKey] = template[templateKey];
                break;
        }
    }
    return output;
}