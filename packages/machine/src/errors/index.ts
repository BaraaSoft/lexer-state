const ErrorMessages = {
  StateError: 'undefined state transition',
  HookMachineError:
    'machine is undefined, must initialize useLexerState(machine:?) with a machine',
  MachineNotFoundError: 'machine is undefined',
} as const;

export class StateError extends Error {
  constructor(message = ErrorMessages.StateError) {
    super(message);
    this.name = 'StateError';
  }
}

export class LexerStateHookError extends Error {
  constructor(message = ErrorMessages.HookMachineError) {
    super(message);
    this.name = 'HookMachineError';
  }
}

export class MachineNotFoundError extends Error {
  constructor(
    message = ErrorMessages.MachineNotFoundError,
  ) {
    super(message);
    this.name = 'MachineNotFoundError';
  }
}
