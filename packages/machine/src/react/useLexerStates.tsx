import {
  useState,
  useContext,
  createContext,
  useMemo,
} from 'react';
import {
  LexerStateHookError,
  MachineNotFoundError,
} from '../errors';
import { IMachine } from '../machine';
import { ComposedProviders } from '../util';

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

const createLexerStateContext = () =>
  createContext<ILexerStateContext>([
    { currentState: null },
    () => null,
  ]);

type CreateContextFactoryType<T> = {
  create(machines: T[]): CreateContextFactoryType<T>;
  get(
    mahine: T,
  ): React.Context<ILexerStateContext<any, any>>;
  size(): number;
};

const createContextFactory = <
  T extends IMachine<any, any, any> = any,
>(): CreateContextFactoryType<T> => {
  const map = new Map();

  return {
    create(machines: T[]) {
      for (const machine of machines) {
        map.set(machine, createLexerStateContext());
      }

      return this;
    },
    get(mahine: T) {
      return map.get(mahine);
    },
    size() {
      return map.size;
    },
  };
};

const contextFactory = createContextFactory();

const SingleMahineProvider = <T extends any = any>({
  LexerStateContext,
  machine,
  children,
}: {
  LexerStateContext: React.Context<
    ILexerStateContext<any, any>
  >;
  machine: any;
  children?: React.ReactNode;
}) => {
  const { currentState, dispatchEvent } =
    useLexerStateBase<T>(machine);
  return (
    <LexerStateContext.Provider
      value={[currentState as T, dispatchEvent]}
    >
      {children}
    </LexerStateContext.Provider>
  );
};

export const LexerStateProviders = <
  Events = any,
  States = any,
  T extends IMachine<any, any, any> = any,
>({
  children,
  machines,
  machine,
}: {
  children?: React.ReactNode;
  machines?: T[];
  machine?: T;
}) => {
  if (!machine && !Array.isArray(machines))
    throw new MachineNotFoundError();
  const factory: CreateContextFactoryType<T> =
    useMemo(() => {
      return contextFactory.create(machines);
    }, [machines]);

  const providers = [...machines, machine].map(
    (machine) => {
      const machineContext = factory.get(machine);
      return (
        <SingleMahineProvider
          LexerStateContext={machineContext}
          machine={machine}
        />
      );
    },
  );

  return (
    <ComposedProviders providers={providers}>
      {children}
    </ComposedProviders>
  );
};

export const useLexerStates = <
  Events,
  States = any,
  T extends IMachine<any, any, any> = any,
>(
  machine?: T,
) => {
  const [currentState, dispatchEvent] = useContext(
    contextFactory.get(machine),
  );

  if (contextFactory.size() > 1 && !machine)
    throw new LexerStateHookError();

  return {
    currentState: currentState as States,
    dispatchEvent: dispatchEvent as (
      e: Events[keyof Events],
    ) => void,
  };
};
