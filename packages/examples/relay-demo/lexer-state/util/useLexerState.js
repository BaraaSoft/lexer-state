"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLexerState = void 0;
const react_1 = require("react");
const useLexerState = (machine) => {
    const [currentState, setCurrentState] = (0, react_1.useState)(machine.currentState);
    return {
        currentState,
        dispatchEvent(e) {
            setCurrentState(machine.next(e));
        },
    };
};
exports.useLexerState = useLexerState;
//# sourceMappingURL=useLexerState.js.map