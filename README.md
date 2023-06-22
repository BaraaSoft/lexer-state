# Lexer State

Lexer state is a lightweight easy to use state management library, that’s allow you to handle and model your state transition using a state machine. Using declarative api.

## Installation

Install lexer state with npm

```bash
  cd my-project
  npm install lexer-state
```

## Finite State Machine or Finite Automata

State machine or finite Automata has a finite set of states edges lead from one state to another, and each edge is labeled with a symbol. One state is the start state, and certain of the states are distinguished as final states.

## Real Numbers Automata

We can describe a finite state machine that accept (identify) real numbers in the following diagram. Each circle represent a state in the machine, and the arrows are showing the type of input that’ll trigger a transition to the next state.

![App Screenshot](https://private-user-images.githubusercontent.com/36194509/247856517-2620bd54-32ed-4e81-a163-3698c9909325.jpg?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiJrZXkxIiwiZXhwIjoxNjg3NDE5NDI4LCJuYmYiOjE2ODc0MTkxMjgsInBhdGgiOiIvMzYxOTQ1MDkvMjQ3ODU2NTE3LTI2MjBiZDU0LTMyZWQtNGU4MS1hMTYzLTM2OThjOTkwOTMyNS5qcGc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBSVdOSllBWDRDU1ZFSDUzQSUyRjIwMjMwNjIyJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDIzMDYyMlQwNzMyMDhaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1iYjc3NTk3ZjA1ZjlkOWQ2OGU2OGNhNTJkMjBkYTFlYzJkOTM3YzQxODM0MmQyNWNkMTQwZGM2NzliYWI2ZjJjJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZhY3Rvcl9pZD0wJmtleV9pZD0wJnJlcG9faWQ9MCJ9.NUGwOIyBQAgclbkZp1qUeBrjdqS8Cgb_fBHKGbXTcQo)

## Example

let's create a simple state machine that accept or identify (if) in a string.

```javascript
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
const receiveSpace = LexerState(myEvents).create('space_event');

// create States
const firstState = LexerState(myStates).create('firstState');
const secondState = LexerState(myStates).create('secondState');
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

console.log('current state ', machine.next('i'));
//output: current state  secondState

console.log('current state: ', machine.next('f'));
//output: current state:  if

```
