// export const TokenType = {
//   EPSILON: 0,
//   SYMBOL: 1,
//   EQL: 2,
//   INT: 3,
//   FLOAT: 4,
//   SEMI: 5,
//   PAREN: 6,
//   OPERATOR: 7,
//   GENERIC: 8,
// } as const;

export interface TokenType {
  [key: string]: number;
}

// name alias
export interface ILexerStatePrimitive extends TokenType {
  [key: string]: number;
}

export type TokenClassType = keyof TokenType;
export type TokenKey = TokenType[TokenClassType];
