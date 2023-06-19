/**
 * @generated SignedSource<<ef95a4feb310d9414be65598c038b829>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ClientRequest, ClientQuery } from 'relay-runtime';
export type ConfirmStepQuery$variables = {};
export type ConfirmStepQuery$data = {
  readonly machine: {
    readonly id: string | null;
    readonly orders: ReadonlyArray<{
      readonly billingAddress: string | null;
      readonly firstname: string | null;
      readonly lastname: string | null;
      readonly paymentMethod: string | null;
      readonly shippingAddress: string | null;
    } | null> | null;
  } | null;
};
export type ConfirmStepQuery = {
  response: ConfirmStepQuery$data;
  variables: ConfirmStepQuery$variables;
};

const node: ClientRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "firstname",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lastname",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "billingAddress",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "paymentMethod",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "shippingAddress",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ConfirmStepQuery",
    "selections": [
      {
        "kind": "ClientExtension",
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Machine",
            "kind": "LinkedField",
            "name": "machine",
            "plural": false,
            "selections": [
              (v0/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Order",
                "kind": "LinkedField",
                "name": "orders",
                "plural": true,
                "selections": [
                  (v1/*: any*/),
                  (v2/*: any*/),
                  (v3/*: any*/),
                  (v4/*: any*/),
                  (v5/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ]
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ConfirmStepQuery",
    "selections": [
      {
        "kind": "ClientExtension",
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Machine",
            "kind": "LinkedField",
            "name": "machine",
            "plural": false,
            "selections": [
              (v0/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Order",
                "kind": "LinkedField",
                "name": "orders",
                "plural": true,
                "selections": [
                  (v1/*: any*/),
                  (v2/*: any*/),
                  (v3/*: any*/),
                  (v4/*: any*/),
                  (v5/*: any*/),
                  (v0/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ]
      }
    ]
  },
  "params": {
    "cacheID": "4bd7e1c51e9a68e8e5c0bcde23c60a7d",
    "id": null,
    "metadata": {},
    "name": "ConfirmStepQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "9bc55216aa60c315629cb3396e1b2d45";

export default node;
