import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import TransactionReducer from "./reducers/Transaction";
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import VisibleTransaction from "./components/Transaction";
import VisibleLogin from "./components/Login";
import './App.css';

const createStorage = compose(
    applyMiddleware(thunkMiddleware)
)(createStore);

class App extends React.Component {
  componentWillMount() {
      this.store = createStorage(TransactionReducer, {});
      
  }
  render() {
    return (
      <Provider store={this.store}>
        <BrowserRouter>
          <div>
            <Switch>
              <Route path="/login" component={VisibleLogin} />
              <Route path="/" component={VisibleTransaction} />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;