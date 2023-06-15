export declare const TokenType: {
    readonly EPSILON: 0;
    readonly SYMBOL: 1;
    readonly EQL: 2;
    readonly INT: 3;
    readonly FLOAT: 4;
    readonly SEMI: 5;
    readonly PAREN: 6;
    readonly OPERATOR: 7;
    readonly GENERIC: 8;
};
export type TokenClassType = keyof typeof TokenType;
export type TokenKey = (typeof TokenType)[TokenClassType];
