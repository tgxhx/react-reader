import React from 'react';
import ReactDOM from 'react-dom';
import {hashHistory} from 'react-router'
// import {browserHistory} from 'react-router'
import Routes from './routes'

import {Provider} from 'react-redux'
import store from './store'

import 'reset-css';
import './index.css'

ReactDOM.render(
    <Provider store={store}>
      <Routes history={hashHistory}/>
    </Provider>,
    document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./components/App', () => {
    ReactDOM.render(
      <Provider store={store}>
        <Routes history={hashHistory}/>
      </Provider>,
      document.getElementById('root'),
    )
  })
}


