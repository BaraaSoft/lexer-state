import { StateError } from '../errors';
import { ILexem } from '../lexem';
import { ILexerStore } from '../store';
import { ITransition } from '../transition';

export interface IMachine<
  E extends Record<string, any>,
  S extends string,
  T extends ITransition<ILexem, T>,
> {
  from(store: ILexerStore): IMachine<E, S, T>;
  next(inputValue: S): ILexem['tokenClass'];
  transition?: T;
  currentState: ILexem['tokenClass'];
  at(start: ILexem['tokenClass']): IMachine<E, S, T>;
  save(data: E): IMachine<E, S, T>;
  nextIfDefine(inputValue: S): ILexem['tokenClass'];
}

export class Machine<
  E extends Record<string, any>,
  S extends string,
  T extends ITransition<ILexem, T>,
> implements IMachine<E, S, T>
{
  private store?: ILexerStore;
  public currentState: ILexem['tokenClass'];
  constructor(public transition: T) {}
  from(store: ILexerStore): IMachine<E, S, T> {
    this.store = store;
    this.store?.init();
    return this;
  }
  at(start: ILexem['tokenClass']) {
    this.currentState = start;
    return this;
  }
  next(inputValue: S): ILexem['tokenClass'] {
    const [, nextState, callback] = this.transition.table[
      this.currentState
    ].find(([regex]) => regex.test(inputValue)) || [];
    if (!nextState) return this.currentState;
    this.currentState = nextState;
    if (callback) {
      callback?.call(null, nextState);
    }

    return nextState;
  }

  nextIfDefine(inputValue: S): ILexem['tokenClass'] {
    const [, nextState, callback] = this.transition.table[
      this.currentState
    ].find(([regex]) => regex.test(inputValue)) || [];
    if (!nextState) throw new StateError();
    this.currentState = nextState;
    if (callback) {
      callback?.call(null, nextState);
    }

    return nextState;
  }
  save(data: E): IMachine<E, S, T> {
    const name = this.transition.dataTypeName;
    this.store?.add(name, data);
    return this;
  }
}
