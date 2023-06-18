import { useState } from 'react';
import { IMachine } from '../machine';

export const useLexerState = <Events>(machine: any) => {
  const [currentState, setCurrentState] = useState<string>(
    machine.currentState,
  );
  return {
    currentState,
    dispatchEvent(e: Events[keyof Events]) {
      setCurrentState(machine.next(e));
    },
  };
};
