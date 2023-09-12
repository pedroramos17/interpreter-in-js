import readline from 'node:readline';
import { Tokens } from './token/token.js';
import Lexer from './lexer.js';

const ScannerClose = {
  exit: 'exit',
  quit: 'quit',
};

const exits = [ScannerClose.exit, ScannerClose.quit];

export function startRepl() {
  const scanner = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  function repl() {
    scanner.question('> ', (input) => {
      if (exits.includes(input)) return scanner.close();

      const lexer = new Lexer(input);

      for (
        let token = lexer.nextToken();
        token.type !== Tokens.EOF;
        token = lexer.nextToken()
      ) {
        console.log(token);
      }

      repl();
    });
  }

  console.log('Welcome to interpreter.ts');
  repl();
}