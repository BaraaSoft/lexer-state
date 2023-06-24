import {
  useState,
  useContext,
  createContext,
  Fragment,
} from 'react';
import { IMachine } from '../machine';

// Todo: use context
export const useLexerState = <
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
  [undefined, () => null],
);

export const LexerStateProvider = <
  ILexerStateEvents,
  ILexerStateStates = any,
  T extends IMachine<any, any, any> = any,
>({
  children,
  machine,
}: {
  children?: React.ReactNode;
  machine: T;
}) => {
  const { currentState, dispatchEvent } =
    useLexerState<ILexerStateEvents>(machine);
  return (
    <Fragment>
      <LexerStateContext.Provider
        value={[
          currentState as ILexerStateStates,
          dispatchEvent,
        ]}
      >
        {children}
      </LexerStateContext.Provider>
    </Fragment>
  );
};

/*
 <>
      <LexerStateContext.Provider
        value={[currentState, dispatchEvent]}
      >
        {children}
      </LexerStateContext.Provider>
    </>

    */
