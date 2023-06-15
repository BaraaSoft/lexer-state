import { TokenType, TokenClassType } from './token';

export interface ILexem {
  tokenClass: TokenClassType;
  tokenKey: (typeof TokenType)[TokenClassType];
  matchers?: RegExp;
}
