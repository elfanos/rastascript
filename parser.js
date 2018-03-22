/**
 * Created by Rasmus on 2018-03-22.
 */
function parser (tokens) {
    var AST = {
        type: 'Drawing',
        body: []
    }
    // extract a token at a time as current_token. Loop until we are out of tokens.
    while (tokens.length > 0){
        var current_token = tokens.shift();

        // Since number token does not do anything by it self, we only analyze syntax when we find a word.
        if (current_token.type === 'word') {
            switch (current_token.value) {
                case 'GiveThanksTo' :
                    console.log("yolo inside pushish?");
                    var expression = {
                        type: 'CallExpression',
                        name: 'GiveThanksTo',
                        arguments: []
                    };
                    AST.body.push(expression);
                break;
            }
        }
    }
    return AST
}