import { ILexem } from "@lexer-state/machine";

/* ***************** */
/* Order Form State  */
/* ***************** */

export const OrderState = {
  PersonalState: "1000",
  BillingState: "1100",
  ShippingState: "1110",
  ConfirmationState: "1111",
} as const;

class PersonalState implements ILexem {
  tokenClass = OrderState.PersonalState;
  tokenKey = 0;
  matchers? = /1000/;
}

class BillingState implements ILexem {
  tokenClass = OrderState.BillingState;
  tokenKey = 1;
  matchers? = /1100/;
}

class ShippingState implements ILexem {
  tokenClass = OrderState.ShippingState;
  tokenKey = 2;
  matchers? = /1110/;
}

class ConfirmationState implements ILexem {
  tokenClass = OrderState.ConfirmationState;
  tokenKey = 3;
  matchers? = /1111/;
}

const personalState = new PersonalState();
const billingState = new BillingState();
const shippingState = new ShippingState();
const confirmationState = new ConfirmationState();

/* ***************** */
/* Order Form events  */
/* ***************** */

export const OrderEvent = {
  Done: "Done",
  Skip: "Skip",
  Reset: "Reset",
  Back: "Back",
} as const;

export class DoneEvent implements ILexem {
  tokenClass = OrderEvent.Done;
  tokenKey: number;
  matchers? = /Done/;
}

export class SkipEvent implements ILexem {
  tokenClass = OrderEvent.Skip;
  tokenKey: number;
  matchers = /Skip/;
}
export class ResetEvent implements ILexem {
  tokenClass = OrderEvent.Reset;
  tokenKey: number;
  matchers = /Reset/;
}
export class BackEvent implements ILexem {
  tokenClass = OrderEvent.Back;
  tokenKey: number;
  matchers = /Back/;
}

const doneEvent = new DoneEvent();
const skipEvent = new SkipEvent();
const resetEvent = new ResetEvent();
const backEvent = new BackEvent();

export { doneEvent, skipEvent, resetEvent, backEvent };
export { personalState, billingState, shippingState, confirmationState };
