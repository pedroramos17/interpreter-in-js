import { Tokens } from './token/token.js'
import Identifier from './identifier.js'
import LetStatement from './letStatement.js'
import ReturnStatement from './returnStatement.js'
import Program from './program.js'

export default class Parser {
  lexer
  currentToken
  peekToken
  errors

  constructor(lexer) {
    this.lexer = lexer
    this.errors = []
    this.nextToken() // current token
    this.nextToken() // next token
  }

  nextToken() {
    this.currentToken = this.peekToken
    this.peekToken = this.lexer.nextToken()
  }

  parseProgram() {
    const program = new Program()

    while (this.currentToken.type !== Tokens.EOF) {
      const statement = this.parseStatement()
      
      if (statement !== null) {
        program.statements.push(statement)
      }

      this.nextToken()
    }

    return program
  }

  parseLetStatement() {
    const statement = new LetStatement(this.currentToken)

    if(!this.expectPeek(Tokens.IDENT)) {
      return null
    }

    const identifier = new Identifier(
      this.currentToken,
      this.currentToken.literal
    )

    statement.name = identifier

    if(!this.expectPeek(Tokens.ASSIGN)) {
      return null
    }

    while (!this.currentTokenIs(Tokens.SEMICOLON)) {
      this.nextToken()
    }

    return statement
  }

  parseReturnStatement() {
    const statement = new ReturnStatement(this.currentToken)

    while (!this.currentTokenIs(Tokens.SEMICOLON)) {
      this.nextToken()
    }

    return statement
  }

  currentTokenIs(token) {
    return this.currentToken.type === token
  }

  peekTokenIs(token) {
    return this.peekToken.type === token
  }
  

  expectPeek(token) {
    if (this.peekTokenIs(token)) {
      this.nextToken()
      return true
    }

    this.peekError(token)
    return false
  }

  getErrors() {
    return this.errors
  }

  peekError(token) {
    const msg = `expected next token to be ${token}, got ${this.peekToken.type} instead`
    this.errors.push(msg)
  }

  parseStatement() {
    switch (this.currentToken.type) {
      case Tokens.LET:
        return this.parseLetStatement()
      
      case Tokens.RETURN:
        return this.parseReturnStatement()

      default:
        return null
    }
  }
}