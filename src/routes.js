import React from 'react';
import {Router, Route, IndexRoute} from 'react-router';

import App from './components/App'
import Home from './components/Home'
import BookDetail from './components/BookDetail'
import Category from './components/Category'
import Reader from './components/Reader'
import BookShelf from './components/BookShelf'

import People from './components/People/PeopleContainer'
import About from './components/About'
import NotFound from './components/NotFound'

const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="bookdetail/:id" component={BookDetail}/>
      <Route path="bookshelf" component={BookShelf}/>
      <Route path="category" component={Category}/>
      <Route path="reader/:id" component={Reader}/>
      <Route path="people" component={People}/>
      <Route path="about" component={About}/>
      <Route path="*" component={NotFound}/>
    </Route>
  </Router>
)

export default Routes