"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EqlState = exports.OperatorState = exports.ParenState = exports.EpsilonState = exports.SemiState = exports.SymbolState = exports.FloatState = exports.IntState = exports.GenericEvent = void 0;
class GenericEvent {
    constructor(matchers) {
        this.matchers = matchers;
        this.tokenClass = 'GENERIC';
        this.tokenKey = 3;
    }
}
exports.GenericEvent = GenericEvent;
class IntState {
    constructor(matchers) {
        this.matchers = matchers;
        this.tokenClass = 'INT';
        this.tokenKey = 3;
    }
}
exports.IntState = IntState;
class FloatState {
    constructor(matchers) {
        this.matchers = matchers;
        this.tokenClass = 'FLOAT';
        this.tokenKey = 0;
    }
}
exports.FloatState = FloatState;
class SymbolState {
    constructor(matchers) {
        this.matchers = matchers;
        this.tokenClass = 'SYMBOL';
        this.tokenKey = 3;
    }
}
exports.SymbolState = SymbolState;
class SemiState {
    constructor(matchers) {
        this.matchers = matchers;
        this.tokenClass = 'SEMI';
        this.tokenKey = 5;
    }
}
exports.SemiState = SemiState;
class EpsilonState {
    constructor(matchers) {
        this.matchers = matchers;
        this.tokenClass = 'EPSILON';
        this.tokenKey = 0;
    }
}
exports.EpsilonState = EpsilonState;
class ParenState {
    constructor(matchers) {
        this.matchers = matchers;
        this.tokenClass = 'PAREN';
        this.tokenKey = 0;
    }
}
exports.ParenState = ParenState;
class OperatorState {
    constructor(matchers) {
        this.matchers = matchers;
        this.tokenClass = 'OPERATOR';
        this.tokenKey = 0;
    }
}
exports.OperatorState = OperatorState;
class EqlState {
    constructor(matchers) {
        this.matchers = matchers;
        this.tokenClass = 'EQL';
        this.tokenKey = 0;
    }
}
exports.EqlState = EqlState;
//# sourceMappingURL=Lexem.js.map