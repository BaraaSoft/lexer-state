import { useLexerState } from '@lexer-state/machine/dist';
import * as React from 'react';
import { useState } from 'react';
import {
  Step,
  Card,
  Form,
  Container,
  Button,
} from 'semantic-ui-react';
import {
  OrderState,
  OrderEvent,
  OrderMachineType,
} from '../../service';

interface ShippingStepProps {
  state: string;
}

export const ShippingStep = ({
  state,
}: ShippingStepProps): JSX.Element => {
  return (
    <Step
      completed={state.at(3) == '1'}
      active={state.at(2) == '1'}
    >
      <Step.Content>
        <Step.Title>Shipping</Step.Title>
        <Step.Description>
          Choose your shipping options
        </Step.Description>
      </Step.Content>
    </Step>
  );
};

export const ShippingStepContent = ({
  orderMahine,
}: {
  orderMahine: OrderMachineType;
}): JSX.Element => {
  const { currentState, dispatchEvent } =
    useLexerState<typeof OrderEvent>();
  const [info, setInfo] = useState({});

  const onNext = () => {
    orderMahine.save(info);
    dispatchEvent(OrderEvent.Done);
  };
  const onPrev = () => {
    orderMahine.save(info);
    dispatchEvent(OrderEvent.Back);
  };
  if (currentState != OrderState.ShippingState) return null;
  return (
    <>
      <Card fluid>
        <Card.Content textAlign="left">
          <Card.Header>Shipping</Card.Header>
          <Card.Meta>Enter shipping details</Card.Meta>

          <Card.Description>
            <Form>
              <Form.Group widths="equal">
                <Form.Input
                  onChange={(e) =>
                    setInfo((data) => ({
                      ...data,
                      shippingAddress: e.target.value,
                    }))
                  }
                  fluid
                  label="Shipping adress"
                  placeholder="Shipping adress"
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
