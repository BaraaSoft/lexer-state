import { TokenType, TokenClassType } from './token';

export interface ILexem {
  tokenClass: TokenClassType;
  tokenKey: TokenType[TokenClassType];
  matchers?: RegExp;
}
