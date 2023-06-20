export interface ILexerStore {
    init(): ILexerStore;
    add<T extends Record<string, any>>(name: string, data: Partial<T>): void;
    retrieveState(tableName: string): string;
}
export * from './relayStore';
