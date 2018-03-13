import React from 'react';
import ReactDOM from 'react-dom';

import {routes} from 'base/routes';
import {store} from 'base/reducers';

import {Root} from 'base/routes';

ReactDOM.render((
  <Root routes={routes} store={store}/>
), document.getElementById('root'));
