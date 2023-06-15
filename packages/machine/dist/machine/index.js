"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Machine = void 0;
const errors_1 = require("../errors");
class Machine {
    constructor(transition) {
        this.transition = transition;
    }
    from(transition) {
        this.transition = transition;
        return this;
    }
    at(start) {
        this.currentState = start;
        return this;
    }
    next(inputValue) {
        const [, nextState] = this.transition.table[this.currentState].find(([regex]) => regex.test(inputValue));
        if (!nextState)
            throw new errors_1.StateError();
        this.currentState = nextState;
        return nextState;
    }
}
exports.Machine = Machine;
//# sourceMappingURL=index.js.map