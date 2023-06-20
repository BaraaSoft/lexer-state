import { ILexem } from '../lexem';
type AsyncFunction<E> = (...args: any[]) => Promise<void>;
export interface LexemToStateType<T extends ILexem> {
    lexem: T;
    toStates: T;
    callback?: AsyncFunction<any>;
}
export interface IsItMatchType<T extends LexemToStateType<ILexem>> {
    moveTo(toState: ILexem): IsItMatchType<T>;
    __lexemToState: T;
    do: (callback: AsyncFunction<any>) => IsItMatchType<T>;
}
export declare const isItMatch: <E, T extends ILexem>(lexem: T) => IsItMatchType<LexemToStateType<T>>;
export interface ITransition<U extends ILexem, T> {
    add(...fromState: any[]): ITransition<U, T>;
    at(state: U): ITransition<U, T>;
    table: Record<U['tokenClass'], [
        U['matchers'],
        U['tokenClass'],
        ReturnType<typeof isItMatch>['do']
    ][]> | Record<string, never>;
    dataTypeName: string;
}
export declare class Transition<U extends ILexem, T extends ReturnType<typeof isItMatch>> implements ITransition<U, T> {
    readonly dataTypeName: string;
    table: ITransition<U, T>['table'];
    constructor(dataTypeName: string);
    private atSate;
    add(...fromToState: ReturnType<T['moveTo']>[]): this;
    at(originState: U): this;
    getable(): Record<string, never> | Record<U["tokenClass"], [U["matchers"], U["tokenClass"], (callback: AsyncFunction<any>) => IsItMatchType<LexemToStateType<ILexem>>][]>;
}
export {};
