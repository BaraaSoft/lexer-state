import { ILexem } from './ILexem';
import { TokenType, TokenClassType } from './token';
export declare class GenericEvent implements ILexem {
    readonly matchers: RegExp;
    readonly tokenClass: TokenClassType;
    readonly tokenKey: TokenType[TokenClassType];
    constructor(matchers: RegExp);
}
export declare class IntState implements ILexem {
    readonly matchers: RegExp;
    readonly tokenClass: TokenClassType;
    readonly tokenKey: TokenType[TokenClassType];
    constructor(matchers: RegExp);
}
export declare class FloatState implements ILexem {
    readonly matchers?: RegExp;
    readonly tokenClass: TokenClassType;
    readonly tokenKey: TokenType[TokenClassType];
    constructor(matchers?: RegExp);
}
export declare class SymbolState implements ILexem {
    readonly matchers: RegExp;
    readonly tokenClass: TokenClassType;
    readonly tokenKey: TokenType[TokenClassType];
    constructor(matchers: RegExp);
}
export declare class SemiState implements ILexem {
    readonly matchers: RegExp;
    readonly tokenClass: TokenClassType;
    readonly tokenKey: TokenType[TokenClassType];
    constructor(matchers: RegExp);
}
export declare class EpsilonState implements ILexem {
    readonly matchers?: RegExp;
    readonly tokenClass: TokenClassType;
    readonly tokenKey: TokenType[TokenClassType];
    constructor(matchers?: RegExp);
}
export declare class ParenState implements ILexem {
    readonly matchers: RegExp;
    readonly tokenClass: TokenClassType;
    readonly tokenKey: TokenType[TokenClassType];
    constructor(matchers: RegExp);
}
export declare class OperatorState implements ILexem {
    readonly matchers: RegExp;
    readonly tokenClass: TokenClassType;
    readonly tokenKey: TokenType[TokenClassType];
    constructor(matchers: RegExp);
}
export declare class EqlState implements ILexem {
    readonly matchers: RegExp;
    readonly tokenClass: TokenClassType;
    readonly tokenKey: TokenType[TokenClassType];
    constructor(matchers: RegExp);
}
