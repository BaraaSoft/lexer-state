import { ILexem } from '../lexem';
export interface ITransition<T> {
    add(...fromState: any[]): ITransition<T>;
    at(state: any): ITransition<T>;
}
export declare class Transition<U extends ILexem, T extends ReturnType<typeof isItMatch>> implements ITransition<T> {
    private table;
    constructor(table?: {});
    private atSate;
    add(...fromToState: ReturnType<T['moveTo']>[]): this;
    at(originState: U): this;
}
export interface LexemToStateType<T extends ILexem> {
    lexem: T;
    toStates: T;
}
export interface IsItMatchType<T extends LexemToStateType<ILexem>> {
    moveTo(toState: ILexem): IsItMatchType<T>;
    __lexemToState: T;
}
export declare const isItMatch: <T extends ILexem>(lexem: T) => IsItMatchType<LexemToStateType<T>>;
