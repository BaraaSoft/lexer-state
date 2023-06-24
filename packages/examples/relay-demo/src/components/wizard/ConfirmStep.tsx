import * as React from 'react';
import { useState } from 'react';
import {
  Step,
  Card,
  Item,
  Container,
  Button,
} from 'semantic-ui-react';
import { graphql } from 'relay-runtime';
import { useLazyLoadQuery } from 'react-relay';
import * as _ from 'lodash';
import {
  ConfirmStepQuery as ConfirmStepQueryType,
  ConfirmStepQuery$data as ConfirmStepDataType,
} from './__generated__/ConfirmStepQuery.graphql';
import {
  OrderState,
  OrderEvent,
  OrderMachineType,
} from '../../service/index';
import { useLexerState } from '@lexer-state/machine/dist';
const ConfirmStepQuery = graphql`
  query ConfirmStepQuery {
    machine {
      id
      orders {
        firstname
        lastname
        billingAddress
        paymentMethod
        shippingAddress
      }
    }
  }
`;

type OrderType =
  ConfirmStepDataType['machine']['orders'][number];

interface ConfirmStepProps {
  state: string;
}
export const ConfirmStep = ({
  state,
}: ConfirmStepProps): JSX.Element => {
  return (
    <Step
      completed={state.at(3) == '1'}
      active={state.at(3) == '1'}
    >
      <Step.Content>
        <Step.Title>Confirm Order</Step.Title>
        <Step.Content>Thanks for your order</Step.Content>
      </Step.Content>
    </Step>
  );
};

export const ConfirmStepContent = ({
  orderMahine,
}: {
  orderMahine: OrderMachineType;
}): JSX.Element => {
  const emptyOrder = {
    id: '',
    firstname: '',
    lastname: '',
    paymentMethod: '',
    shippingAddress: '',
    billingAddress: '',
  };

  const { currentState, dispatchEvent } =
    useLexerState<typeof OrderEvent>();
  const data = useLazyLoadQuery<ConfirmStepQueryType>(
    ConfirmStepQuery,
    {},
  );
  const orders = data.machine.orders
    ? data.machine.orders
    : [emptyOrder];

  const order = orders.reduce((prev, curr) => {
    return {
      ...prev,
      ..._.omitBy(curr, _.isUndefined),
    };
  }, {}) as OrderType;

  const onNext = () => {
    dispatchEvent(OrderEvent.Done);
  };
  const onPrev = () => {
    dispatchEvent(OrderEvent.Back);
  };

  if (currentState != OrderState.ConfirmationState)
    return null;

  return (
    <>
      <Card fluid>
        <Card.Content textAlign="left">
          <Card.Header>Confirm</Card.Header>
          <Card.Meta>Confirm your order details</Card.Meta>

          <div className="left-row">
            <div className="row">
              <div>
                <Item>
                  <Item.Content>
                    <Item.Header as={'h4'}>
                      First name
                    </Item.Header>
                    <Item.Description
                      content={order?.firstname}
                    />
                  </Item.Content>
                  <Item.Content>
                    <div>
                      <Item.Header as={'h4'}>
                        Last name
                      </Item.Header>
                      <Item.Description
                        content={order?.lastname}
                      />
                    </div>
                  </Item.Content>
                </Item>
              </div>
              <div>
                <Item>
                  <Item.Content>
                    <Item.Header as={'h4'}>
                      Payment method
                    </Item.Header>
                    <Item.Description
                      content={order?.paymentMethod}
                    />
                  </Item.Content>
                  <Item.Content>
                    <Item.Header as={'h4'}>
                      Shipping address
                    </Item.Header>
                    <Item.Description
                      content={order?.shippingAddress}
                    />
                  </Item.Content>
                  <Item.Content>
                    <Item.Header as={'h4'}>
                      Billing address
                    </Item.Header>
                    <Item.Description
                      content={order?.billingAddress}
                    />
                  </Item.Content>
                </Item>
              </div>
            </div>
          </div>
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

export const GroupContainer = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return <Step.Group ordered>{children}</Step.Group>;
};
