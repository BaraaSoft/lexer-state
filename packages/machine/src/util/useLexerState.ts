import { useState } from 'react';
import { IMachine } from '../machine';

export const useLexerState = <
  Events,
  T extends IMachine<any, any, any> = any,
>(
  machine: T,
) => {
  const [currentState, setCurrentState] = useState(
    machine.currentState,
  );
  return {
    currentState,
    dispatchEvent(e: Events[keyof Events]) {
      setCurrentState(machine.next(e));
    },
  };
};
