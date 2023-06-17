import {
  Machine,
  EpsilonState,
  IntState,
  FloatState,
  SemiState,
  SymbolState,
  OperatorState,
  ParenState,
  GenericEvent,
  EqlState,
  Transition,
  isItMatch,
} from '@lexer-state/machine';

const transition = new Transition('arithmetic');
// State Events. Will correspond to an actual state in the machine (State + Event)
const epsilonState = new EpsilonState();
const intState = new IntState(/0-9/);
const floatState = new FloatState();
const semiState = new SemiState(/;/);
const symbolState = new SymbolState(/a-z/);
const operatorState = new OperatorState(/[+|-|\*|\/]/);
const parenState = new ParenState(/[\)|\()]/);
const eqlState = new EqlState(/[=]/);
// Generic Events. These have no associated state in the machine (Event only)
const alphanumericEvent = new GenericEvent(/[a-z0-9]/);
const dotEvent = new GenericEvent(/[.]/);
const charEvent = new GenericEvent(/[\s*]/);
transition
  .at(epsilonState)
  .add(isItMatch(alphanumericEvent).moveTo(symbolState))
  .at(symbolState)
  .add(
    isItMatch(alphanumericEvent).moveTo(symbolState),
    isItMatch(eqlState)
      .moveTo(eqlState)
      .do(async (arg) => console.log('>> eqlState', arg)),
    isItMatch(parenState).moveTo(parenState),
    isItMatch(charEvent).moveTo(symbolState),
    isItMatch(operatorState).moveTo(operatorState),
  );
// machine.next(input())
const stateMachine = new Machine(transition).at('EPSILON');
console.log(stateMachine.next('10'));
console.log(stateMachine.next('='));
