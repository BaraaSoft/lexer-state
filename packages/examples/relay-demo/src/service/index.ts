import { relayAppEnvironment } from "../relay/RelayEnvironment";
import { Machine, RelayStore } from "@lexer-state/machine";
import { transition } from "./transitions";
import { OrderEvent, OrderState } from "./states";

const relayStore = new RelayStore(relayAppEnvironment);

const ordersMachine = new Machine(transition)
  .from(relayStore)
  .at(OrderState.PersonalState);

type OrderMachineType = typeof ordersMachine;

export { ordersMachine, OrderEvent, OrderState, OrderMachineType };
