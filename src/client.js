import * as React from 'react';
import { hydrate, render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './components/App';

const rootElement = document.getElementById('root');

if (module.hot) {
  const renderApp = () => {
    if (rootElement === null) {
      throw new Error('Element with id #root is not found.');
    }

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
      rootElement
    );
  };

  renderApp();

  module.hot.accept('./components/App', () => {
    renderApp();
  });
} else {
  if (rootElement === null) {
    throw new Error('Element with id #root is not found.  ');
  }

    hydrate(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
      rootElement
    );
}
