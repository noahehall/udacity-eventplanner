import { browserHistory, Router } from 'react-router';
import { render } from 'react-dom';
import React from 'react';
import routes from './routes';

render(
  <Router children={routes} history={browserHistory} />,
  document.getElementById('root')
);
