import {
  LexerState,
  Transition,
  isItMatch,
  Machine,
} from 'lexer-state/packages/machine';

const myStates = {
  firstState: 'firstState',
  secondState: 'secondState',
  ifState: 'if',
} as const;

const myEvents = {
  i_event: 'i',
  f_event: 'f',
  space_event: ' ',
} as const;

// create transition events
const receiveI = LexerState(myEvents).create('i_event');
const receiveF = LexerState(myEvents).create('f_event');
const receiveSpace =
  LexerState(myEvents).create('space_event');

// create State
const firstState =
  LexerState(myStates).create('firstState');
const secondState =
  LexerState(myStates).create('secondState');
const ifState = LexerState(myStates).create('ifState');

// define transition table
const transition = new Transition('simple');
transition
  .at(firstState)
  .add(
    isItMatch(receiveI).moveTo(secondState),
    isItMatch(receiveSpace).moveTo(firstState),
  )
  .at(secondState)
  .add(
    isItMatch(receiveF).moveTo(ifState),
    isItMatch(receiveSpace).moveTo(firstState),
  )
  .at(ifState)
  .add(isItMatch(receiveSpace).moveTo(firstState));

const machine = new Machine(transition).at(
  // set the starting state of the machine
  myStates.firstState,
);

console.log('current state: ', machine.next('i'));
// current state:  secondState

console.log('current state: ', machine.next('f'));
//current state:  if
