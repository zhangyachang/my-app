import React, { Component } from 'react';
import {HashRouter as Router} from 'react-router-dom'; //Switch, Route,

import routes from './router/router'
import FrontendAuth from './components/FrontendAuth/index'

class App extends Component {
  render() {
    return (
      <Router>
        {/*加入路由导航守卫*/}
        <FrontendAuth config={routes} />
      </Router>
    );
  }
}
export default App;

/*
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
 */

