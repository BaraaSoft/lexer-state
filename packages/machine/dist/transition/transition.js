"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isItMatch = exports.Transition = void 0;
class Transition {
    constructor(table = {}) {
        this.table = table;
        this.atSate = [];
    }
    add(...fromToState) {
        const orgState = this.atSate.pop();
        this.table[orgState.tokenClass] = [
            ...this.table[orgState.tokenClass],
            ...fromToState.map(({ __lexemToState }) => [
                __lexemToState.lexem.matchers,
                __lexemToState.toStates.tokenClass,
            ]),
        ];
        console.log(this.table);
        return this;
    }
    at(originState) {
        if (!this.table[originState.tokenClass])
            this.table[originState.tokenClass] = [];
        this.atSate.push(originState);
        return this;
    }
}
exports.Transition = Transition;
const isItMatch = (lexem) => {
    let lexemToState = {
        lexem,
        toStates: null,
    };
    return {
        moveTo(toState) {
            lexemToState.toStates = toState;
            return this;
        },
        __lexemToState: lexemToState,
    };
};
exports.isItMatch = isItMatch;
//# sourceMappingURL=transition.js.map