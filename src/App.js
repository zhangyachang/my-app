import React, { Component } from 'react';
import {Switch, Route, HashRouter as Router} from 'react-router-dom';

import routes from './router/router'


class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          {
            routes.map((item, index) => {
              if(item.exact){
                return (
                  <Route
                    exact
                    key={index}
                    path={item.path}
                    component={item.component}
                  />
                )
              }
              return (
                <Route
                  key={index}
                  path={item.path}
                  component={item.component}
                  // render={(props) => {
                  //   return (
                  //     <item.component
                  //       {...props}
                  //       {...item}
                  //     />
                  //   )
                  // }}
                  //
                />
              )
            })
          }
        </Switch>
      </Router>
    );
  }
}

export default App;
