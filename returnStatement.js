import { StatementKind } from "./statementKind.js"

export default class ReturnStatement {
  token
  kind
  returnValue

  constructor(token) {
    this.token = token
    this.kind = StatementKind.LET
  }

  tokenLiteral() {
    return this.token.literal
  }
}