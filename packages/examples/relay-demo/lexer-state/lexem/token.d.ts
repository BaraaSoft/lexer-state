export interface TokenType {
    [key: string]: number;
}
export interface ILexerStatePrimitive extends TokenType {
    [key: string]: number;
}
export type TokenClassType = keyof TokenType;
export type TokenKey = TokenType[TokenClassType];
