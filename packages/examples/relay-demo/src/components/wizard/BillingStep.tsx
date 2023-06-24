import * as React from 'react';
import { useState } from 'react';
import {
  Step,
  Card,
  Form,
  Container,
  Button,
} from 'semantic-ui-react';
import { graphql } from 'relay-runtime';
import { useLazyLoadQuery } from 'react-relay';
import {
  OrderEvent,
  ordersMachine,
  OrderState,
  OrderMachineType,
} from '../../service/index';
import { useLexerState } from '@lexer-state/machine/dist';

interface BillingStepProps {
  state: string;
}
export const BillingStep = ({
  state,
}: BillingStepProps): JSX.Element => {
  return (
    <Step
      completed={state.at(2) == '1'}
      active={state.at(1) == '1'}
    >
      <Step.Content>
        <Step.Title>Billing</Step.Title>
        <Step.Description>
          Enter billing information
        </Step.Description>
      </Step.Content>
    </Step>
  );
};

export const BillingStepContent = ({
  orderMahine,
}: {
  orderMahine: OrderMachineType;
}): JSX.Element => {
  const [info, setInfo] = useState({});
  const { currentState, dispatchEvent } =
    useLexerState<typeof OrderEvent>();
  if (currentState != OrderState.BillingState) return null;
  const onNext = () => {
    ordersMachine.save(info);
    dispatchEvent(OrderEvent.Done);
  };
  const onPrev = () => {
    ordersMachine.save(info);
    dispatchEvent(OrderEvent.Back);
  };

  return (
    <>
      <Card fluid>
        <Card.Content textAlign="left">
          <Card.Header>Billing information</Card.Header>
          <Card.Meta>Enter billing information</Card.Meta>

          <Card.Description>
            <Form>
              <Form.Group widths="equal">
                <Form.Input
                  onChange={(e) =>
                    setInfo((data) => ({
                      ...data,
                      billingAddress: e.target.value,
                    }))
                  }
                  fluid
                  label="Billing Address"
                  placeholder="Billing Address"
                />
                <Form.Dropdown
                  onChange={(e, { value }) =>
                    setInfo((data) => ({
                      ...data,
                      paymentMethod: value,
                    }))
                  }
                  label="Payment method"
                  placeholder="Select payment method"
                  fluid
                  selection
                  options={[
                    {
                      key: 'Credit Card',
                      text: 'Credit Card',
                      value: 'Credit Card',
                    },
                    {
                      key: 'Bank Transfer',
                      text: 'Bank Transfer',
                      value: 'Bank Transfer',
                    },
                  ]}
                />
              </Form.Group>
            </Form>
          </Card.Description>
        </Card.Content>
      </Card>
      <Container textAlign="right">
        <Button type="submit" onClick={onPrev}>
          Prev
        </Button>
        <Button type="submit" color="blue" onClick={onNext}>
          Next
        </Button>
      </Container>
    </>
  );
};
