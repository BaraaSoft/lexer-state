import { ILexem } from '../lexem';
import { ITransition } from '../transition';
export interface IMachine<S extends string, T extends ITransition<ILexem, T>> {
    from(transition: T): IMachine<S, T>;
    next(inputValue: S): ILexem['tokenClass'];
    transition?: T;
    currentState: ILexem['tokenClass'];
    at(start: ILexem['tokenClass']): IMachine<S, T>;
}
export declare class Machine<S extends string, T extends ITransition<ILexem, T>> implements IMachine<S, T> {
    transition: T;
    currentState: ILexem['tokenClass'];
    constructor(transition: T);
    from(transition: T): IMachine<S, T>;
    at(start: ILexem['tokenClass']): this;
    next(inputValue: S): ILexem['tokenClass'];
}
