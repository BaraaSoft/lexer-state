import { ILexerStore } from './index';
import type { IEnvironment } from 'relay-runtime';
export declare class RelayStore implements ILexerStore {
    environment: IEnvironment;
    private tempId;
    constructor(environment: IEnvironment);
    add<T extends Record<string, any>>(name: string, data: Partial<T>): void;
    init(): ILexerStore;
    retrieveState(tableName: string): string;
    private getRoot;
    private getOldRecord;
    private createRecord;
}
