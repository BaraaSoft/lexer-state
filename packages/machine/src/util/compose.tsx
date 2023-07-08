import React from 'react';

interface Props {
  providers: Array<React.JSX.Element>;
  children: React.ReactNode;
}

export function ComposedProviders(
  props: Props,
): JSX.Element {
  const { providers = [], children } = props;

  return (
    <>
      {providers.reduceRight((acc, Comp) => {
        return React.createElement(
          Comp.type,
          Comp.props,
          acc,
        );
      }, children)}
    </>
  );
}
