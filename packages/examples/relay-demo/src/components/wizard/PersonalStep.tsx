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
  OrderMachineType,
  OrderState,
  OrderEvent,
} from '../../service';
import { useLexerState } from '@lexer-state/machine/dist';

interface PersonalStepProps {
  state: string;
}

export const PersonalStep = ({
  state,
}: PersonalStepProps): JSX.Element => {
  return (
    <Step
      completed={state.at(1) == '1'}
      active={state.at(0) == '1'}
    >
      <Step.Content>
        <Step.Title>Personal</Step.Title>
        <Step.Description>
          Enter your personal details
        </Step.Description>
      </Step.Content>
    </Step>
  );
};

export const PersonalStepContent = ({
  orderMahine,
}: {
  orderMahine: OrderMachineType;
}): JSX.Element => {
  const [info, setInfo] = useState({});
  const { currentState, dispatchEvent } =
    useLexerState<typeof OrderEvent>();

  const onNext = () => {
    orderMahine.save(info);
    dispatchEvent(OrderEvent.Done);
  };
  const onPrev = () => {
    orderMahine.save(info);
    dispatchEvent(OrderEvent.Back);
  };
  if (currentState != OrderState.PersonalState) return null;

  return (
    <>
      <Card fluid>
        <Card.Content textAlign="left">
          <Card.Header>Personal Info</Card.Header>
          <Card.Meta>Enter your personal details</Card.Meta>

          <Card.Description>
            <Form>
              <Form.Group widths="equal">
                <Form.Input
                  onChange={(e) =>
                    setInfo((data) => ({
                      ...data,
                      firstname: e.target.value,
                    }))
                  }
                  fluid
                  label="First name"
                  placeholder="First name"
                />
                <Form.Input
                  onChange={(e) =>
                    setInfo((data) => ({
                      ...data,
                      lastname: e.target.value,
                    }))
                  }
                  fluid
                  label="Last name"
                  placeholder="Last name"
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
