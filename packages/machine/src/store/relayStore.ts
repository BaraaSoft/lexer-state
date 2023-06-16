import { commitLocalUpdate } from 'react-relay';
import { ILexerStore } from './index';
import type {
  IEnvironment,
  RecordProxy,
  RecordSourceProxy,
} from 'relay-runtime';

export class RelayStore implements ILexerStore {
  private tempId = 0;
  constructor(public environment: IEnvironment) {
    this.environment = environment;
    this.init();
  }
  add<T extends Record<string, any>>(
    name: string,
    data: Partial<T>,
  ): void {
    commitLocalUpdate(this.environment, (store) => {
      const machine = this.getRoot(store);
      const oldRecord =
        this.getOldRecord(store, name) || [];
      const newRecord = this.createRecord(
        store,
        name,
        data,
      );
      machine.setLinkedRecords(
        [...oldRecord, newRecord],
        name,
      );
    });
  }
  init(): ILexerStore {
    commitLocalUpdate(this.environment, (store) => {
      const root = store.getRoot();
      const machineExist = root.getLinkedRecord('machine');
      if (machineExist) return this;

      // Create a unique ID.
      const dataID = `client:state:${this.tempId++}`;

      //Create a new record.
      const newMachineRecord = store.create(
        dataID,
        'machine',
      );
      newMachineRecord.setValue(dataID, 'id');

      // Add the machine to root.
      root.setLinkedRecord(newMachineRecord, 'machine');
    });
    return this;
  }

  retrieveState(tableName: string): string {
    throw new Error('Method not implemented.');
  }

  private getRoot(store: RecordSourceProxy): RecordProxy {
    const root = store.getRoot();
    const machine = root.getLinkedRecord('machine');
    return machine;
  }

  private getOldRecord(
    store: RecordSourceProxy,
    name: string,
  ): RecordProxy[] {
    const root = store.getRoot();
    const machine = root.getLinkedRecord('machine');
    const oldRecord = machine.getLinkedRecords(name);
    return oldRecord;
  }

  private createRecord<T extends Record<string, any>>(
    store: RecordSourceProxy,
    name: string,
    data: Partial<T>,
  ): RecordProxy {
    // Create a unique ID.
    const dataID = `client:state:${this.tempId++}`;

    //Create a new note record.
    const newNoteRecord = store.create(dataID, name);
    newNoteRecord.setValue(`client:state:${dataID}`, 'id');

    for (const [key, val] of Object.entries(data)) {
      if (key == 'id')
        newNoteRecord.setValue(`client:state:${val}`, 'id');
      else {
        newNoteRecord.setValue(val, key);
      }
    }
    return newNoteRecord;
  }
}
