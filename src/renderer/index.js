import React, { Component } from 'react';
import * as ReactDOM from 'react-dom';

import AppComponent from './app/app.component';

ReactDOM.render(
  <AppComponent />,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept();
}