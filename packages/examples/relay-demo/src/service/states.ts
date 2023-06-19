import { LexerState } from "@lexer-state/machine";

/* ***************** */
/* OrderForm State  */
/* ***************** */

export const OrderState = {
  PersonalState: "1000",
  BillingState: "1100",
  ShippingState: "1110",
  ConfirmationState: "1111",
} as const;

const personalState = LexerState(OrderState).create("PersonalState");
const billingState = LexerState(OrderState).create("BillingState");
const shippingState = LexerState(OrderState).create("ShippingState");
const confirmationState = LexerState(OrderState).create("ConfirmationState");

/* ***************** */
/* OrderForm events  */
/* ***************** */

export const OrderEvent = {
  Done: "Done",
  Skip: "Skip",
  Reset: "Reset",
  Back: "Back",
} as const;

const doneEvent = LexerState(OrderEvent).create("Done");
const backEvent = LexerState(OrderEvent).create("Back");
const skipEvent = LexerState(OrderEvent).create("Skip");
const resetEvent = LexerState(OrderEvent).create("Reset");

export { doneEvent, skipEvent, resetEvent, backEvent };
export { personalState, billingState, shippingState, confirmationState };
