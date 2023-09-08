export default class Identifier {
  token
  value

  constructor(token, value) {
    this.token = token
    this.value = value
  }

  tokenLiteral() {
    return this.token.literal
  }
}