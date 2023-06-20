import { ILexem } from '../lexem';
import { ILexerStore } from '../store';
import { ITransition } from '../transition';
export interface IMachine<E extends Record<string, any>, S extends string, T extends ITransition<ILexem, T>> {
    from(store: ILexerStore): IMachine<E, S, T>;
    next(inputValue: S): ILexem['tokenClass'];
    transition?: T;
    currentState: ILexem['tokenClass'];
    at(start: ILexem['tokenClass']): IMachine<E, S, T>;
    save(data: E): IMachine<E, S, T>;
}
export declare class Machine<E extends Record<string, any>, S extends string, T extends ITransition<ILexem, T>> implements IMachine<E, S, T> {
    transition: T;
    private store?;
    currentState: ILexem['tokenClass'];
    constructor(transition: T);
    from(store: ILexerStore): IMachine<E, S, T>;
    at(start: ILexem['tokenClass']): this;
    next(inputValue: S): ILexem['tokenClass'];
    save(data: E): IMachine<E, S, T>;
}
