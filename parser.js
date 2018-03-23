/**
 * Created by Rasmus on 2018-03-22.
 */
function parser (tokens) {
    var AST = {
        type: 'Drawing',
        body: []
    }
    function checkBracket(str){
        console.log("string?" + str);
        return str.substring(str.lastIndexOf("(")+1,str.lastIndexOf(")"));
    }
    // extract a token at a time as current_token. Loop until we are out of tokens.
    while (tokens.length > 0){
        var current_token = tokens.shift();
        console.log(current_token);
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
                //Jaman rasta need to shift da shit
                case 'I':
                    current_token = tokens.shift();
                    if(current_token.value === "say") {
                        current_token = tokens.shift();
                        if(checkBracket(current_token.value) !== undefined){
                            AST.body.push(
                                {
                                    type: 'CallExpression',
                                    name: 'I say',
                                    arguments: []
                                }
                            );
                        }else{
                            throw 'Fix the bracket man in the I say man. '
                        }
                    }else{
                        throw 'This code seems to have been taken of the ganja man.' +
                        ' If you want to speek the rasta fix the I say';
                    }
                break;
            }
        }
    }
    return AST
}