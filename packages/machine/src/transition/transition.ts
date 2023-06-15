import { ILexem } from '../lexem';
import {
  TokenClassType,
  TokenKey,
  TokenType,
} from '../lexem/token';

export interface ITransition<T> {
  add(...fromState: any[]): ITransition<T>;
  at(state: any): ITransition<T>;
}

export class Transition<
  U extends ILexem,
  T extends ReturnType<typeof isItMatch>,
> implements ITransition<T>
{
  constructor(private table = {}) {}
  private atSate: U[] = [];

  public add(...fromToState: ReturnType<T['moveTo']>[]) {
    const orgState = this.atSate.pop();
    this.table[orgState.tokenClass] = [
      ...this.table[orgState.tokenClass],
      ...fromToState.map(({ __lexemToState }) => [
        __lexemToState.lexem.matchers,
        __lexemToState.toStates.tokenClass,
      ]),
    ];

    console.log(this.table);
    return this;
  }
  public at(originState: U) {
    if (!this.table[originState.tokenClass])
      this.table[originState.tokenClass] = [];
    this.atSate.push(originState);
    return this;
  }
}

export interface LexemToStateType<T extends ILexem> {
  lexem: T;
  toStates: T;
}
export interface IsItMatchType<
  T extends LexemToStateType<ILexem>,
> {
  moveTo(toState: ILexem): IsItMatchType<T>;
  __lexemToState: T;
}

export const isItMatch = <T extends ILexem>(
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
  };
};
