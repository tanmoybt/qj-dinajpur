import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Restaurants from './Components/Restaurants';
import About from './Components/About/index';
import Privacy from './Components/Privacy/Privacy';
import NotFound from './Components/NotFound/index';
import Notification from './Components/Notification/notification';
import Menu from './Components/Menu/Menu';


// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Restaurants}/>
      <Route path='/menu/:restaurant_name' component={Menu}/>
      <Route path='/about' component={About}/>
      <Route path='/privacy' component={Privacy}/>
      <Route path="/not" component={Notification}/>

    </Switch>
  </main>
)

export default Main