import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import './style.css';
import 'semantic-ui-css/semantic.min.css';

import App from './components/App';
import GraphiQL from './components/playground/GraphiQL';
import { ordersMachine } from './service';
import { LexerStateProvider } from '@lexer-state/machine/dist';

function Routes() {
  if (window.location.pathname === '/playground') {
    return <GraphiQL />;
  }
  return (
    <LexerStateProvider machine={ordersMachine}>
      <App />
    </LexerStateProvider>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById('app'),
);
root.render(<Routes />);
