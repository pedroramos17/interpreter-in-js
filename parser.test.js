import { describe, it } from 'node:test'
import assert from 'node:assert'
import Parser from './parser.js'
import Lexer from './lexer.js'

describe('Parser', () => {
  describe('parserProgram', () => {
    it('should parses the let statement', () => {
      const input = `
        let x = 5;
        let y = 10;
        let foobar = 10000;
      `

      const lexer = new Lexer(input)
      const parser = new Parser(lexer)
      const program = parser.parseProgram()

      const tests = [
        { identifier: 'x' },
        { identifier: 'y' },
        { identifier: 'foobar' },
      ]

      tests.forEach(({identifier}, index) => {
        const statement = program.statements[index]

        console.log(statement.tokenLiteral())

        assert.equal(statement.tokenLiteral(), 'let')
        assert.equal(statement.name.value, identifier)
        assert.equal(statement.name.tokenLiteral(), identifier)
      })
    })

    it('should parses an input with error', () => {
      const input = `
        let 123;
        let a;
      `

      const lexer = new Lexer(input)
      const parser = new Parser(lexer)
      
      parser.parseProgram()

      const errors = parser.getErrors()
      const expectedErrors = [
        'expected next token to be IDENT, got INT instead',
        'expected next token to be =, got ; instead',
      ]

      errors.forEach((error, index) => {
        assert.equal(error, expectedErrors[index])
      })
    })

    it('parses the return statement', () => {
      const input = `
        return 5;
        return 10;
        return 10000;
      `

      const lexer = new Lexer(input)
      const parser = new Parser(lexer)
      const program = parser.parseProgram()

      const tests = [
        { tokenLiteral: 'return' },
        { tokenLiteral: 'return' },
        { tokenLiteral: 'return' },
      ]

      tests.forEach(({tokenLiteral}, index) => {
        const statement = program.statements[index]

        assert.equal(statement.tokenLiteral(), tokenLiteral)
      })
    })
  })
})