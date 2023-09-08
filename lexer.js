import { Token, Tokens, lookupIdent } from "./token/token.js"

export default class Lexer {
  input = ''
  position = 0
  readPosition = 0
  char = ''

  INITIAL_POSITION = 0
  EMPTY_CHAR = ''


  constructor(input) {
    this.input = input
    this.setUpInitialState()
    this.readChar()
  }

  setUpInitialState() {
    this.position = this.INITIAL_POSITION
    this.readPosition = this.INITIAL_POSITION
    this.char = this.EMPTY_CHAR
  }

  readChar() {
    if (this.readPosition >= this.input.length) {
      this.char = ''
    } else {
      this.char = this.input[this.readPosition]
    }
  
    this.position = this.readPosition
    this.readPosition += 1
  }

  isDigit(char) {
    return '0' <= char && char <= '9'
  }

  readNumber() {
    const initialIntPosition = this.position
  
    while (this.isDigit(this.char)) {
      this.readChar()
    }
  
    return this.input.substring(initialIntPosition, this.position)
  }

  isLetter(char) {
    return (
      ('a' <= char && char <= 'z') ||
      ('A' <= char && char <= 'Z') ||
      char === '_'
    )
  }

  readIdentifier() {
    const initialCharPosition = this.position
  
    while (this.isLetter(this.char)) {
      this.readChar()
    }
  
    return this.input.substring(initialCharPosition, this.position)
  }

  skipWhitespace() {
    while (
      this.char == ' ' ||
      this.char == '\t' ||
      this.char == '\n' ||
      this.char == '\r'
    ) {
      this.readChar()
    }
  }

  peekChar() {
    if (this.readPosition >= this.input.length) {
      return ''
    } else {
      return this.input[this.readPosition]
    }
  }

  buildToken(type, literal) {
    this.readChar();
    return new Token(type, literal);
  }

  getToken() {
    this.skipWhitespace()

    switch (this.char) {
      case '=':
        if (this.peekChar() === '=') {
          this.readChar();
          return this.buildToken(Tokens.EQUAL, '==');
        } else {
          return this.buildToken(Tokens.ASSIGN, '=');
        }
      case ';':
        return this.buildToken(Tokens.SEMICOLON, ';');
      case '(':
        return this.buildToken(Tokens.LPAREN, '(');
      case ')':
        return this.buildToken(Tokens.RPAREN, ')');
      case ',':
        return this.buildToken(Tokens.COMMA, ',');
      case '+':
        return this.buildToken(Tokens.PLUS, '+');
      case '{':
        return this.buildToken(Tokens.LBRACE, '{');
      case '}':
        return this.buildToken(Tokens.RBRACE, '}');
      case '':
        return this.buildToken(Tokens.EOF, '');
      case '!':
        if (this.peekChar() === '=') {
          this.readChar();
          return this.buildToken(Tokens.NOT_EQUAL, '!=');
        } else {
          return this.buildToken(Tokens.BANG, '!');
        }
      case '-':
        return this.buildToken(Tokens.MINUS, '-');
      case '/':
        return this.buildToken(Tokens.SLASH, '/');
      case '*':
        return this.buildToken(Tokens.ASTERISK, '*');
      case '<':
        return this.buildToken(Tokens.LESS_THAN, '<');
      case '>':
        return this.buildToken(Tokens.GREATER_THAN, '>');
      default:
        if (this.isDigit(this.char)) {
          const tokenLiteral = this.readNumber()
          return new Token(Tokens.INT, tokenLiteral)
        }

        if (this.isLetter(this.char)) {
          const tokenLiteral = this.readIdentifier()
          const tokenType = lookupIdent(tokenLiteral)
          return new Token(tokenType, tokenLiteral)
        }
    }
  }

  nextToken() {
    const token = this.getToken()
    return token
  }
}