"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelayStore = void 0;
const react_relay_1 = require("react-relay");
class RelayStore {
    constructor(environment) {
        this.environment = environment;
        this.tempId = 0;
        this.environment = environment;
        this.init();
    }
    add(name, data) {
        (0, react_relay_1.commitLocalUpdate)(this.environment, (store) => {
            const machine = this.getRoot(store);
            const oldRecord = this.getOldRecord(store, name) || [];
            const newRecord = this.createRecord(store, name, data);
            machine.setLinkedRecords([...oldRecord, newRecord], name);
        });
    }
    init() {
        (0, react_relay_1.commitLocalUpdate)(this.environment, (store) => {
            const root = store.getRoot();
            const machineExist = root.getLinkedRecord('machine');
            if (machineExist)
                return this;
            // Create a unique ID.
            const dataID = `client:state:${this.tempId++}`;
            //Create a new record.
            const newMachineRecord = store.create(dataID, 'machine');
            newMachineRecord.setValue(dataID, 'id');
            // Add the machine to root.
            root.setLinkedRecord(newMachineRecord, 'machine');
        });
        return this;
    }
    retrieveState(tableName) {
        throw new Error('Method not implemented.');
    }
    getRoot(store) {
        const root = store.getRoot();
        const machine = root.getLinkedRecord('machine');
        return machine;
    }
    getOldRecord(store, name) {
        const root = store.getRoot();
        const machine = root.getLinkedRecord('machine');
        const oldRecord = machine.getLinkedRecords(name);
        return oldRecord;
    }
    createRecord(store, name, data) {
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
exports.RelayStore = RelayStore;
//# sourceMappingURL=relayStore.js.map