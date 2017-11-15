import React, { Component } from 'react'
import { connect } from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
import {
  BrowserRouter as Router,
  withRouter,
  Redirect,
  Route,
  Link,
  Switch
} from 'react-router-dom'
import { AppDrawer, Toolbar , Dashboard, SimpleTable, GridListWidget, Login, Home, Status, Charts, Analytics, Settings} from './components/index'
import { setUser } from './actions/userAction'
import { updateLog } from './actions/logAction'
import { web3 } from './uport.js'

injectTapEventPlugin();

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {}
    this.state.web3 = web3
  }

  componentDidMount() {
    this.props.dispatch(updateLog(JSON.parse(localStorage.getItem('ipfsLog'))))
  }

  render() {
      return (
        <div>
          <Route exact path='/' component={Home} />
          <Route exact path='/Login' component={Login} />
          <Route exact path='/Dashboard' component={Home} />
          <Route exact path='/Status' component={Status} />
          <Route exact path='/Charts' component={Charts} />
          <Route exact path='/Analytics' component={Analytics} />
          <Route exact path='/Settings' component={Settings} />
        </div>
      )
  }
}

const mapStoreToProps = (store) => {
  return {
    main: store.main,
    ipfs: store.ipfs
  }
}

export default withRouter(connect(mapStoreToProps)(App));
