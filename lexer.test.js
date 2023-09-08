import { describe, it } from 'node:test'
import assert from 'node:assert'
import { Tokens } from './token/token.js'
import Lexer from './lexer.js'

describe('Lexer', () => {
  it('matches each token', () => {
    const input = `
      let five = 5;
      let ten = 10;
      
      let add = fn(x, y) {
        x + y;
      };
      
      let result = add(five, ten);
    `
    const tokens = [
      { type: Tokens.LET, literal: 'let' },
      { type: Tokens.IDENT, literal: 'five' },
      { type: Tokens.ASSIGN, literal: '=' },
      { type: Tokens.INT, literal: '5' },
      { type: Tokens.SEMICOLON, literal: ';' },
      { type: Tokens.LET, literal: 'let' },
      { type: Tokens.IDENT, literal: 'ten' },
      { type: Tokens.ASSIGN, literal: '=' },
      { type: Tokens.INT, literal: '10' },
      { type: Tokens.SEMICOLON, literal: ';' },
      { type: Tokens.LET, literal: 'let' },
      { type: Tokens.IDENT, literal: 'add' },
      { type: Tokens.ASSIGN, literal: '=' },
      { type: Tokens.FUNCTION, literal: 'fn' },
      { type: Tokens.LPAREN, literal: '(' },
      { type: Tokens.IDENT, literal: 'x' },
      { type: Tokens.COMMA, literal: ',' },
      { type: Tokens.IDENT, literal: 'y' },
      { type: Tokens.RPAREN, literal: ')' },
      { type: Tokens.LBRACE, literal: '{' },
      { type: Tokens.IDENT, literal: 'x' },
      { type: Tokens.PLUS, literal: '+' },
      { type: Tokens.IDENT, literal: 'y' },
      { type: Tokens.SEMICOLON, literal: ';' },
      { type: Tokens.RBRACE, literal: '}' },
      { type: Tokens.SEMICOLON, literal: ';' },
      { type: Tokens.LET, literal: 'let' },
      { type: Tokens.IDENT, literal: 'result' },
      { type: Tokens.ASSIGN, literal: '=' },
      { type: Tokens.IDENT, literal: 'add' },
      { type: Tokens.LPAREN, literal: '(' },
      { type: Tokens.IDENT, literal: 'five' },
      { type: Tokens.COMMA, literal: ',' },
      { type: Tokens.IDENT, literal: 'ten' },
      { type: Tokens.RPAREN, literal: ')' },
      { type: Tokens.SEMICOLON, literal: ';' },
      { type: Tokens.EOF, literal: '' },
    ]

    const lexer = new Lexer(input)

    tokens.forEach(({ type, literal }) => {
      const inputToken = lexer.nextToken()

      assert.equal(inputToken.type, type)
      assert.equal(inputToken.literal, literal)
    });

  });
  it('matches each single character', () => {
    const input = `
      !-/*5;
      5 < 10 > 5;
    `

    const tokens = [
      { type: Tokens.BANG, literal: '!' },
      { type: Tokens.MINUS, literal: '-' },
      { type: Tokens.SLASH, literal: '/' },
      { type: Tokens.ASTERISK, literal: '*' },
      { type: Tokens.INT, literal: '5' },
      { type: Tokens.SEMICOLON, literal: ';' },
      { type: Tokens.INT, literal: '5' },
      { type: Tokens.LESS_THAN, literal: '<' },
      { type: Tokens.INT, literal: '10' },
      { type: Tokens.GREATER_THAN, literal: '>' },
      { type: Tokens.INT, literal: '5' },
      { type: Tokens.SEMICOLON, literal: ';' },
    ]

    const lexer = new Lexer(input)

    tokens.forEach(({ type, literal }) => {
      const inputToken = lexer.nextToken()

      assert.equal(inputToken.type, type)
      assert.equal(inputToken.literal, literal)
    })
  })

  it('matches conditionals', () => {

    const input = `
      if (5 < 10) {
        return true;
      } else {
        return false;
      }
    `

    const tokens = [
      { type: Tokens.IF, literal: 'if' },
      { type: Tokens.LPAREN, literal: '(' },
      { type: Tokens.INT, literal: '5' },
      { type: Tokens.LESS_THAN, literal: '<' },
      { type: Tokens.INT, literal: '10' },
      { type: Tokens.RPAREN, literal: ')' },
      { type: Tokens.LBRACE, literal: '{' },
      { type: Tokens.RETURN, literal: 'return' },
      { type: Tokens.TRUE, literal: 'true' },
      { type: Tokens.SEMICOLON, literal: ';' },
      { type: Tokens.RBRACE, literal: '}' },
      { type: Tokens.ELSE, literal: 'else' },
      { type: Tokens.LBRACE, literal: '{' },
      { type: Tokens.RETURN, literal: 'return' },
      { type: Tokens.FALSE, literal: 'false' },
      { type: Tokens.SEMICOLON, literal: ';' },
      { type: Tokens.RBRACE, literal: '}' },
    ]

    const lexer = new Lexer(input)

    tokens.forEach(({ type, literal }) => {
      const inputToken = lexer.nextToken()

      assert.equal(inputToken.type, type)
      assert.equal(inputToken.literal, literal)
    })
  })

  it('matches equal and not equal operators', () => {
    const input = `
      10 == 10;
      10 != 9;
    `

    const tokens = [
      { type: Tokens.INT, literal: '10' },
      { type: Tokens.EQUAL, literal: '==' },
      { type: Tokens.INT, literal: '10' },
      { type: Tokens.SEMICOLON, literal: ';' },
      { type: Tokens.INT, literal: '10' },
      { type: Tokens.NOT_EQUAL, literal: '!=' },
      { type: Tokens.INT, literal: '9' },
      { type: Tokens.SEMICOLON, literal: ';' },
    ]

    const lexer = new Lexer(input)

    tokens.forEach(({ type, literal }) => {
      const inputToken = lexer.nextToken()

      assert.equal(inputToken.type, type)
      assert.equal(inputToken.literal, literal)
    })
  })
});