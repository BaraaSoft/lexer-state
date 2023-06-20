"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transition = exports.isItMatch = void 0;
const isItMatch = (lexem) => {
    let lexemToState = {
        lexem,
        toStates: null,
        callback: null,
    };
    return {
        moveTo(toState) {
            lexemToState.toStates = toState;
            return this;
        },
        __lexemToState: lexemToState,
        do(cb, ...args) {
            lexemToState.callback = cb;
            return this;
        },
    };
};
exports.isItMatch = isItMatch;
class Transition {
    constructor(dataTypeName) {
        this.dataTypeName = dataTypeName;
        this.table = {};
        this.atSate = [];
    }
    add(...fromToState) {
        const orgState = this.atSate.pop();
        this.table[orgState.tokenClass] = [
            ...this.table[orgState.tokenClass],
            ...fromToState.map(({ __lexemToState }) => [
                __lexemToState.lexem.matchers,
                __lexemToState.toStates.tokenClass,
                __lexemToState.callback,
            ]),
        ];
        return this;
    }
    at(originState) {
        if (!this.table[originState.tokenClass])
            this.table[originState.tokenClass] = [];
        this.atSate.push(originState);
        return this;
    }
    getable() {
        return this.table;
    }
}
exports.Transition = Transition;
//# sourceMappingURL=index.js.map