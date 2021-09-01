import React from 'react'
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import Order from './views/orders'
export default function App() {
  return (
    <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Order}></Route>
        </Switch>
    </BrowserRouter>
  )
}
