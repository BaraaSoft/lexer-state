import { ILexem } from '../lexem';
export interface LexemToStateType<T extends ILexem> {
    lexem: T;
    toStates: T;
}
export interface IsItMatchType<T extends LexemToStateType<ILexem>> {
    moveTo(toState: ILexem): IsItMatchType<T>;
    __lexemToState: T;
}
export declare const isItMatch: <T extends ILexem>(lexem: T) => IsItMatchType<LexemToStateType<T>>;
export interface ITransition<U extends ILexem, T> {
    add(...fromState: any[]): ITransition<U, T>;
    at(state: U): ITransition<U, T>;
    table: Record<U['tokenClass'], [
        U['matchers'],
        U['tokenClass']
    ][]> | Record<string, never>;
}
export declare class Transition<U extends ILexem, T extends ReturnType<typeof isItMatch>> implements ITransition<U, T> {
    table: {};
    constructor(table?: {});
    private atSate;
    add(...fromToState: ReturnType<T['moveTo']>[]): this;
    at(originState: U): this;
    getable(): {};
}
