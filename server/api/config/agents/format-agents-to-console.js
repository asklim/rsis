const { format } = require('util');


/**
 * Форматирует ответ от Agents collection
 * для вывода в лог.
 * @param {*} content - может быть Array or Object
 *        one object - если возврат одного элемента
 *  array of objects - если возврат всех элементов
 *   array of string - если возврат списка types, groups or ids
 * @returns {String}
 */

module.exports = function logAgents (content) {


    //console.log('typeof content: ', typeof content); // object
    //console.log('content isArray: ', Array.isArray(content));
    if( Array.isArray( content )) {

        if( !content.length) {
            return format('agent [empty]:\n%o', content );
        }

        //console.log('typeof content[0]: ', typeof content[0] );
        // object or string

        if( typeof content[0] === 'string') {
            return format('agents [string, ...]:\n%o', content );
        }

        //console.log('logAgents: ', Object.keys(content[0]));
        // [ '$__', 'isNew', 'errors', '_doc', '$init' ]

        //console.log('logAgents: ');
        //console.dir( content[0], {colors: true});
        const shortAgents = content.map(
            (agent) => {
                const { id, type, group, caption } = agent._doc;
                let res = { id, };
                if( type ) res = { ...res, type };
                if( group ) res = { ...res, group };
                if( caption ) res = { ...res, caption };
                return res;
            }
        );
        return format('agents [{}, ... ]:\n%o', shortAgents );
    }
    else {
        return format('agent one {object}:\n%o', content );
    }
};
