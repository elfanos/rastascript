/**
 * Created by Rasmus on 2018-03-22.
 */
function generator (rasta_code) {
    function createAttrString (attr) {
        return Object.keys(attr).map(function (key){
            return attr[key]
        }).join(' ')
    }
    var elements = rasta_code.body.map(function (node) {
        return createAttrString(node.attr)
    });
    return '<h1>' + elements + '</h1>'
}