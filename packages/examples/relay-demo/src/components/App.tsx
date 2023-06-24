import * as React from 'react';
import RelayEnvironment from '../relay/RelayEnvironment';
import LoadingSpinner from './LoadingSpinner';
import { Container, Header } from 'semantic-ui-react';
import {
  BillingStep,
  ShippingStep,
  ConfirmStep,
  PersonalStep,
  GroupContainer,
  PersonalStepContent,
  BillingStepContent,
  ShippingStepContent,
  ConfirmStepContent,
} from './wizard';

import { ordersMachine, OrderEvent } from '../service';

import { useLexerState } from '@lexer-state/machine/dist';
export default function App(): React.ReactElement {
  const { currentState, dispatchEvent } =
    useLexerState<typeof OrderEvent>();

  return (
    <RelayEnvironment>
      <React.Suspense fallback={<LoadingSpinner />}>
        <Container className="app" textAlign="center">
          <Header as="h1">
            Rethinking UI State Machine
          </Header>
          <GroupContainer>
            <PersonalStep state={currentState} />
            <BillingStep state={currentState} />
            <ShippingStep state={currentState} />
            <ConfirmStep state={currentState} />
          </GroupContainer>
        </Container>
        <Container
          className="app margin-xl"
          textAlign="center"
        >
          <PersonalStepContent
            orderMahine={ordersMachine}
          />
          <BillingStepContent orderMahine={ordersMachine} />
          <ShippingStepContent
            orderMahine={ordersMachine}
          />
          <ConfirmStepContent orderMahine={ordersMachine} />
        </Container>
      </React.Suspense>
    </RelayEnvironment>
  );
}
