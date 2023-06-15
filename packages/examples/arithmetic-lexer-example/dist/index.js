"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const machine_1 = require("@lexer-state/machine");
const transition = new machine_1.Transition({});
// State Events. Will correspond to an actual state in the machine (State + Event)
const epsilonState = new machine_1.EpsilonState();
const intState = new machine_1.IntState(/0-9/);
const floatState = new machine_1.FloatState();
const semiState = new machine_1.SemiState(/;/);
const symbolState = new machine_1.SymbolState(/a-z/);
const operatorState = new machine_1.OperatorState(/[+|-|\*|\/]/);
const parenState = new machine_1.ParenState(/[\)|\()]/);
const eqlState = new machine_1.EqlState(/[=]/);
// Generic Events. These have no associated state in the machine (Event only)
const alphanumericEvent = new machine_1.GenericEvent(/[a-z0-9]/);
const dotEvent = new machine_1.GenericEvent(/[.]/);
const charEvent = new machine_1.GenericEvent(/[\s*]/);
transition
    .at(epsilonState)
    .add((0, machine_1.isItMatch)(alphanumericEvent).moveTo(symbolState))
    .at(symbolState)
    .add((0, machine_1.isItMatch)(alphanumericEvent).moveTo(symbolState), (0, machine_1.isItMatch)(eqlState).moveTo(eqlState), (0, machine_1.isItMatch)(parenState).moveTo(parenState), (0, machine_1.isItMatch)(charEvent).moveTo(symbolState), (0, machine_1.isItMatch)(operatorState).moveTo(operatorState));
// machine.next(input())
const stateMachine = new machine_1.Machine(transition).at('EPSILON');
console.log(stateMachine.next('10'));
console.log(stateMachine.next('='));
