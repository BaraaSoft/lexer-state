import { Transition, isItMatch } from "@lexer-state/machine";

import {
  personalState,
  billingState,
  shippingState,
  confirmationState,
  doneEvent,
  backEvent,
} from "./states";

const transition = new Transition("orders");

transition
  .at(personalState) //Personal Info step
  .add(
    isItMatch(doneEvent).moveTo(billingState),
    isItMatch(backEvent).moveTo(personalState)
  )
  .at(billingState) //Billing step
  .add(
    isItMatch(doneEvent)
      .moveTo(shippingState)
      .do(async () => console.log("billingState")),
    isItMatch(backEvent).moveTo(personalState)
  )
  .at(shippingState) //Shipping step
  .add(
    isItMatch(doneEvent).moveTo(confirmationState),
    isItMatch(backEvent).moveTo(billingState)
  )
  .at(confirmationState) //confirmation step
  .add(
    isItMatch(doneEvent).moveTo(personalState),
    isItMatch(backEvent).moveTo(shippingState)
  );

export { transition };
