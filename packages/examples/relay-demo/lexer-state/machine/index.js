"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Machine = void 0;
const errors_1 = require("../errors");
class Machine {
    constructor(transition) {
        this.transition = transition;
    }
    from(store) {
        var _a;
        this.store = store;
        (_a = this.store) === null || _a === void 0 ? void 0 : _a.init();
        return this;
    }
    at(start) {
        this.currentState = start;
        return this;
    }
    next(inputValue) {
        const [, nextState, callback] = this.transition.table[this.currentState].find(([regex]) => regex.test(inputValue));
        if (!nextState)
            throw new errors_1.StateError();
        this.currentState = nextState;
        if (callback) {
            callback === null || callback === void 0 ? void 0 : callback.call(null, nextState);
        }
        return nextState;
    }
    save(data) {
        var _a;
        const name = this.transition.dataTypeName;
        (_a = this.store) === null || _a === void 0 ? void 0 : _a.add(name, data);
        return this;
    }
}
exports.Machine = Machine;
//# sourceMappingURL=index.js.map