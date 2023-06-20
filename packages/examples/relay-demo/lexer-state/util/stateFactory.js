"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LexerState = void 0;
const LexerState = function (stateObject) {
    // Todo: generate tokenKey from uuid
    let tokenKeyId = 0;
    return {
        create(state) {
            return {
                tokenClass: stateObject[state],
                tokenKey: tokenKeyId,
                matchers: new RegExp(stateObject[state]),
            };
        },
    };
};
exports.LexerState = LexerState;
//# sourceMappingURL=stateFactory.js.map