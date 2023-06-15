const ErrorMessages = {
  StateError: 'undefined state transition',
} as const;

export class StateError extends Error {
  constructor(message = ErrorMessages.StateError) {
    super(message);
    this.name = 'StateError';
  }
}
