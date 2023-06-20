"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateError = void 0;
const ErrorMessages = {
    StateError: 'undefined state transition',
};
class StateError extends Error {
    constructor(message = ErrorMessages.StateError) {
        super(message);
        this.name = 'StateError';
    }
}
exports.StateError = StateError;
//# sourceMappingURL=index.js.map