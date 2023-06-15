import { StateError } from '../errors';
import {
  TokenType,
  TokenClassType,
  ILexem,
  EpsilonState,
  IntState,
  FloatState,
  SemiState,
  SymbolState,
  OperatorState,
  ParenState,
  GenericEvent,
  EqlState,
} from '../lexem';
import {
  Transition,
  isItMatch,
  ITransition,
} from '../transition';

export interface IMachine<
  S extends string,
  T extends ITransition<ILexem, T>,
> {
  from(transition: T): IMachine<S, T>;
  next(inputValue: S): ILexem['tokenClass'];
  transition?: T;
  currentState: ILexem['tokenClass'];
  at(start: ILexem['tokenClass']): IMachine<S, T>;
}

export class Machine<
  S extends string,
  T extends ITransition<ILexem, T>,
> implements IMachine<S, T>
{
  public currentState: ILexem['tokenClass'];
  constructor(public transition: T) {}
  from(transition: T): IMachine<S, T> {
    this.transition = transition;
    return this;
  }
  at(start: ILexem['tokenClass']) {
    this.currentState = start;
    return this;
  }
  next(inputValue: S): ILexem['tokenClass'] {
    const [, nextState] = this.transition.table[
      this.currentState
    ].find(([regex]) => regex.test(inputValue));
    if (!nextState) throw new StateError();
    this.currentState = nextState;
    return nextState;
  }
}
