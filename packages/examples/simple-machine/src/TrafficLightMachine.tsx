import {
  LexerState,
  Transition,
  isItMatch,
  Machine,
} from 'lexer-state/packages/machine';

const TrafficLightStates = {
  redState: 'redState',
  yellowState: 'yellowState',
  greenState: 'greenState',
} as const;

const TrafficLightEvent = {
  next_event: 'next_event',
} as const;

// Instantiate State
const redState = LexerState(TrafficLightStates).create(
  'redState',
);
const yellowState = LexerState(TrafficLightStates).create(
  'yellowState',
);
const greenState = LexerState(TrafficLightStates).create(
  'greenState',
);

// Instantiate transition events
const nextEvent = LexerState(TrafficLightEvent).create(
  'next_event',
);

// define transition table
const transition = new Transition('trafficLights');
transition
  // defining red state
  .at(redState)
  // add red transition conditions
  .add(isItMatch(nextEvent).moveTo(yellowState))
  // defining yellow state
  .at(yellowState)
  .add(
    isItMatch(nextEvent)
      .moveTo(greenState)
      .do(async (arg) =>
        console.log(
          'traffic light switching to grean go now!',
        ),
      ),
  )
  // defining green state
  .at(greenState)
  .add(isItMatch(nextEvent).moveTo(redState));

const trafficMachine = new Machine(transition).at(
  // set the starting state of the machine
  TrafficLightStates.redState,
);
