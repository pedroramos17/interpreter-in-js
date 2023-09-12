export const Tokens = Object.freeze({
  ILLEGAL: 'ILLEGAL',
  EOF: 'EOF',
  IDENT: 'IDENT',
  INT: 'INT',
  ASSIGN: '=',
  PLUS: '+',
  COMMA: ',',
  SEMICOLON: ';',
  LPAREN: `(`,
  RPAREN: ')',
  LBRACE: '{',
  RBRACE: '}',
  FUNCTION: 'FUNCTION',
  LET: 'LET',
  MINUS: '-',
  BANG: '!',
  ASTERISK: '*',
  SLASH: '/',
  LESS_THAN: '<',
  GREATER_THAN: '>',
  TRUE: 'TRUE',
  FALSE: 'FALSE',
  IF: 'IF',
  ELSE: 'ELSE',
  RETURN: 'RETURN',
  EQUAL: '==',
  NOT_EQUAL: '!=',
})

const Keywords = {
  fn: Tokens.FUNCTION,
  let: Tokens.LET,
  true: Tokens.TRUE,
  false: Tokens.FALSE,
  if: Tokens.IF,
  else: Tokens.ELSE,
  return: Tokens.RETURN,
};

export function lookupIdent(ident) {
  return ident in Keywords ? Keywords[ident] : Tokens.IDENT;
}

export class Token {
  type
  literal
  
  constructor(type, literal) {
    this.type = type
    this.literal = literal
  }
}	