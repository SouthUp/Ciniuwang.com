import React from 'react'
import { render }  from 'react-dom'
import { BrowserRouter, HashRouter, Route, Link, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'

// import Home from './components/home2/home'
// import Download from './components/download/download'
// import Pay from './components/pay/pay'
// import Support from './components/support/support'
import NoMatch from './components/nomatch/noMatch'
import Login from './components/login/login'
import Register from './components/register/register'
import Person from './components/person/person'
import Password from './components/password/password'
import Home3 from './components/home3/home'
import Product from './components/product/product'
import Payhome from './components/pay/payhome'
import Pay2 from './components/pay/pay2'
import Paid from './components/paid/paid'

import css from 'Css/index.css'
import 'Font/font.css'
import store from './store/store'
import Action from './action/action'

class App extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {
    store.dispatch(Action.setSize(document.body.offsetWidth, document.body.offsetHeight))
    window.onresize = function() {
      store.dispatch(Action.setSize(document.body.offsetWidth, document.body.offsetHeight))
    }
  }

  render() {
    return (
      <div className='index-wrap' style={{position: 'relative'}}>
        <Switch>
          <Route exact path='/' component={Home3}/>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/register' component={Register}/>
          <Route exact path='/password' component={Password}/>
          <Route exact path='/person' component={Person}/>
          <Route exact path='/home' component={Home3}/>
          <Route exact path='/product' component={Product}/>
          <Route exact path='/payhome' component={Payhome}/>
          <Route exact path='/pay' component={Pay2}/>
          <Route exact path='/paid' component={Paid}/>
          {/* <Route exact path='/download' component={Download}/> */}
          {/* <Route exact path='/pay' component={Pay}/> */}
          {/* <Route exact path='/support' component={Support}/> */}
          <Route component={NoMatch}/>
        </Switch>
      </div>
    )
  }
}

render((
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
), document.getElementById('root'))

if (module.hot) {
  module.hot.accept()
}