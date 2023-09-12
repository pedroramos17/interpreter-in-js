import { StatementKind } from "./statementKind.js"
import { Token } from "./token/token.js"

export default class LetStatement {
  token
  name
  value
  kind

  constructor(token) {
    this.token = token
    this.kind = StatementKind.LET
  }

  tokenLiteral() {
    return this.token.literal
  }
}