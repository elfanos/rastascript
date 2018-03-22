/**
 * Created by Rasmus on 2018-03-22.
 */
function transformer (ast) {
    var svg_ast = {
        tag : 'svg',
        attr: {
            output: ''
        },
        body:[]
    };
    while (ast.body.length > 0) {
        var node = ast.body.shift()
        switch (node.name) {
            case 'GiveThanksTo':
                    svg_ast.body.push({ // add rect element information to svg_ast's body
                        tag : 'GiveThankTo',
                        attr : {
                            output: 'Wag wan!'
                        }
                    });
                break;
        }
    }
    console.log("before return");
    return svg_ast
}