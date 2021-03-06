/**
 * Created by Rasmus on 2018-03-22.
 */
 const state = {name: 'null', stage: null, expression: ''};
 const memory = [];

 function clearState(){
   state.name = 'null';
   state.stage = null;
   state.expression = '';
 }

function parser (tokens) {
    var AST = {
        type: 'AST',
        body: []
    }

    // extract a token at a time as current_token. Loop until we are out of tokens.
    while (tokens.length > 0){
        // Current node is the current word in the code
        var current_token = tokens.shift();
        // Since number token does not do anything by it self, we only analyze syntax when we find a word.
        if (current_token.type === 'word') {
            switch(state.name) {
              case 'function_name':
                var expression = {
                  type: 'function',
                  name: current_token.value,
                  body: [], // Body consists of expressions
                  arguments: []
                }
                state.name = 'function_end'
                state.stage = expression;
                break;
              case 'function_args':
                  if(current_token.value !== 'jah' && current_token.value !== 'rasta'){
                    state.stage.arguments.splice(state.stage.arguments.length, 0, current_token.value); // Inserts into last position of array
                  }
                break;
              case 'cout':
                if(current_token.value !== 'Bless' && current_token.value !== 'up'){ // Semicolon check
                  state.expression += current_token.value;
                }
                break;
            }
            switch (current_token.value) {
                case 'thanks': // Give thanks : function type, if to is followed, arguments are added
                  if(memory[0].value === 'Give'){

                  }else {
                    throw 'Ya need to give thanks to Jah mon'
                  }
                  break;
                case 'to': // If it follows a thanks then arguments are added
                  if(memory[0].value === 'thanks'){
                    state.name = 'function_name';
                  }else {
                    throw 'Who you giving thanks to mon'
                  }
                  break;
                case 'blessings':
                  if(memory[0].value === 'with' && state.name === 'function_end'){
                    state.name = 'function_args';
                  }else{
                    throw 'Whom do you bless rasta'
                  }
                  break;
                case 'rasta':
                  if(memory[0].value === 'jah'){
                    if(state.name === 'function_args'){
                      state.name = 'function_inside'
                    }
                  }else{
                    throw 'Wagwan Haile Selassie himself would not use the lords name in vain'
                  }
                  break;
                case 'say':
                  if(memory[0].value === 'I'){
                      state.name = 'cout'
                  }else{
                    throw 'Praise be who did say?'
                  }
                  break;
                case 'up':
                  if(memory[0].value === 'Bless'){
                      var expression = {
                        type: 'cout',
                        body: (JSON.parse(JSON.stringify(state.expression)))
                      }
                      state.expression = null;
                      if(state.stage.type === 'function'){
                        state.name = 'function_inside';
                      }
                      state.stage.body.splice(state.stage.body.length, 0, expression);
                  }else{
                    throw 'Where do I and I put my Blessings today?'
                  }
                  break;
                case 'love':
                  if(memory[0].value === 'One'){
                    if(state.stage !== null){ // TODO do some better checks here
                      AST.body.push(JSON.parse(JSON.stringify(state.stage)));
                      clearState();
                    }
                  }else{
                    throw 'You blodclot One love'
                  }
            }
        }
        memory.splice(0, 0, current_token);
    }
    if(state.stage !== null){
      AST.body.push(JSON.parse(JSON.stringify(state.stage)));
      clearState();
    }
    console.log("Jah we are done parsing the file now mon!");
    console.log(AST);
    console.log(AST.body[0]);
    return AST
}
