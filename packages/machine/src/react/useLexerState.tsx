import { useState, useContext, createContext } from 'react';
import { IMachine } from '../machine';

export const useLexerStateBase = <
  Events,
  T extends IMachine<any, any, any> = any,
>(
  machine: T,
) => {
  const [currentState, setCurrentState] = useState<string>(
    machine.currentState as string,
  );
  return {
    currentState,
    dispatchEvent(e: Events[keyof Events]) {
      setCurrentState(machine.next(e) as string);
    },
  };
};

export interface ILexerMachineState<IState, IEvent> {
  currentState?: IState;
  dispatchEvent?: (e: IEvent[keyof IEvent]) => void;
}

export type ILexerStateContext<
  IState = any,
  IEvent = any,
> = [
  ILexerMachineState<IState, IEvent> | undefined,
  React.Dispatch<
    React.SetStateAction<
      ILexerMachineState<IState, IEvent> | undefined
    >
  >,
];

const LexerStateContext = createContext<ILexerStateContext>(
  [{ currentState: null }, () => null],
);

export const LexerStateProvider = <
  Events = any,
  States = any,
  T extends IMachine<any, any, any> = any,
>({
  children,
  machine,
}: {
  children?: React.ReactNode;
  machine: T;
}) => {
  const { currentState, dispatchEvent } =
    useLexerStateBase<Events>(machine);
  return (
    <LexerStateContext.Provider
      value={[currentState as States, dispatchEvent]}
    >
      {children}
    </LexerStateContext.Provider>
  );
};

export const useLexerState = <Events, States = any>() => {
  const [currentState, dispatchEvent] = useContext(
    LexerStateContext,
  );

  return {
    currentState: currentState as States,
    dispatchEvent: dispatchEvent as (
      e: Events[keyof Events],
    ) => void,
  };
};
