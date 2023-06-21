import { ILexem } from '../lexem';
export declare const LexerState: <T>(stateObject: T) => {
    create(state: keyof T): ILexem;
};
