import { ILexem } from '../lexem';
import {
  TokenClassType,
  TokenKey,
  TokenType,
} from '../lexem/token';

type AsyncFunction<E> = (...args: any[]) => Promise<void>;
export interface LexemToStateType<T extends ILexem> {
  lexem: T;
  toStates: T;
}
export interface IsItMatchType<
  T extends LexemToStateType<ILexem>,
> {
  moveTo(toState: ILexem): IsItMatchType<T>;
  __lexemToState: T;
  do: (callback: AsyncFunction<any>) => IsItMatchType<T>;
}

export const isItMatch = <E, T extends ILexem>(
  lexem: T,
): IsItMatchType<LexemToStateType<T>> => {
  let lexemToState: LexemToStateType<T> = {
    lexem,
    toStates: null,
  };
  return {
    moveTo(toState: T) {
      lexemToState.toStates = toState;
      return this;
    },
    __lexemToState: lexemToState,
    do(callback: AsyncFunction<E>) {
      return this;
    },
  };
};
export interface ITransition<U extends ILexem, T> {
  add(...fromState: any[]): ITransition<U, T>;
  at(state: U): ITransition<U, T>;
  table:
    | Record<
        U['tokenClass'],
        [
          U['matchers'],
          U['tokenClass'],
          ReturnType<typeof isItMatch>['do'],
        ][]
      >
    | Record<string, never>;
  dataTypeName: string;
}

export class Transition<
  U extends ILexem,
  T extends ReturnType<typeof isItMatch>,
> implements ITransition<U, T>
{
  table: ITransition<U, T>['table'] = {};
  constructor(public readonly dataTypeName: string) {}
  private atSate: U[] = [];

  public add(...fromToState: ReturnType<T['moveTo']>[]) {
    const orgState = this.atSate.pop();
    this.table[orgState.tokenClass] = [
      ...this.table[orgState.tokenClass],
      ...fromToState.map(
        ({ __lexemToState, do: callback }) => [
          __lexemToState.lexem.matchers,
          __lexemToState.toStates.tokenClass,
          callback,
        ],
      ),
    ];

    return this;
  }
  public at(originState: U) {
    if (!this.table[originState.tokenClass])
      this.table[originState.tokenClass] = [];
    this.atSate.push(originState);
    return this;
  }

  public getable() {
    return this.table;
  }
}
