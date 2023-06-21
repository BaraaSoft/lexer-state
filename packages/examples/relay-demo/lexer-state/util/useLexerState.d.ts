import { IMachine } from '../machine';
export declare const useLexerState: <Events, T extends IMachine<any, any, any> = any>(machine: T) => {
    currentState: string;
    dispatchEvent(e: Events[keyof Events]): void;
};
