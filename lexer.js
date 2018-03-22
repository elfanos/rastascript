/**
 * Created by Rasmus on 2018-03-22.
 */
function lexer (code) {
    return code.split(/\s+/)
        .filter(function (t) { return t.length > 0 })
        .map(function (t) {
            return isNaN(t)
                ? {type: 'word', value: t}
                : {type: 'number', value: t}
        })
}