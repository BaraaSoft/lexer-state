import { ILexem } from './ILexem';
import { TokenType, TokenClassType } from './token';

export class GenericEvent implements ILexem {
  public readonly tokenClass: TokenClassType = 'GENERIC';
  public readonly tokenKey: (typeof TokenType)[TokenClassType] = 3;
  constructor(public readonly matchers: RegExp) {}
}
export class IntState implements ILexem {
  public readonly tokenClass: TokenClassType = 'INT';
  public readonly tokenKey: (typeof TokenType)[TokenClassType] = 3;
  constructor(public readonly matchers: RegExp) {}
}

export class FloatState implements ILexem {
  public readonly tokenClass: TokenClassType = 'FLOAT';
  public readonly tokenKey: (typeof TokenType)[TokenClassType] = 0;
  constructor(public readonly matchers?: RegExp) {}
}

export class SymbolState implements ILexem {
  public readonly tokenClass: TokenClassType = 'SYMBOL';
  public readonly tokenKey: (typeof TokenType)[TokenClassType] = 3;
  constructor(public readonly matchers: RegExp) {}
}

export class SemiState implements ILexem {
  public readonly tokenClass: TokenClassType = 'SEMI';
  public readonly tokenKey: (typeof TokenType)[TokenClassType] = 5;
  constructor(public readonly matchers: RegExp) {}
}

export class EpsilonState implements ILexem {
  public readonly tokenClass: TokenClassType = 'EPSILON';
  public readonly tokenKey: (typeof TokenType)[TokenClassType] = 0;
  constructor(public readonly matchers?: RegExp) {}
}
export class ParenState implements ILexem {
  public readonly tokenClass: TokenClassType = 'PAREN';
  public readonly tokenKey: (typeof TokenType)[TokenClassType] = 0;
  constructor(public readonly matchers: RegExp) {}
}
export class OperatorState implements ILexem {
  public readonly tokenClass: TokenClassType = 'OPERATOR';
  public readonly tokenKey: (typeof TokenType)[TokenClassType] = 0;
  constructor(public readonly matchers: RegExp) {}
}
export class EqlState implements ILexem {
  public readonly tokenClass: TokenClassType = 'EQL';
  public readonly tokenKey: (typeof TokenType)[TokenClassType] = 0;
  constructor(public readonly matchers: RegExp) {}
}
