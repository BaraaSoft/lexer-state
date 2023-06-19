import * as React from "react";

import { RelayEnvironmentProvider } from "react-relay";
import { createEnvironment } from "./environment";

export const relayAppEnvironment = createEnvironment();

export default function RelayEnvironment({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <RelayEnvironmentProvider environment={relayAppEnvironment}>
      {children}
    </RelayEnvironmentProvider>
  );
}
