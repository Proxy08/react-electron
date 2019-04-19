/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable quotes */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react'
import {
  BrowserRouter, Switch, Route, Redirect,
} from 'react-router-dom'
import logo from './assets/img/logo.svg'
import Login from './pages/login/login.js'
import Streamer from './pages/streamer/streamer.js'
import './App.css'

const storage = window.localStorage
// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  // eslint-disable-next-line react/no-unused-state
  state = { user: null, loading: true };

  componentDidMount() {
    // eslint-disable-next-line no-console
    console.log(storage.getItem('user'))
    if (storage.getItem('user')) {
      // eslint-disable-next-line react/no-unused-state
      this.setState({ loading: false, user: storage.getItem('user') })
    } else {
      this.setState({ loading: false })
    }
  }

  render() {
    const { loading, user } = this.state
    return (
      <BrowserRouter>
        {loading ? (
          <div className="vh-100 vw-100 flex center middle">
            <img src={logo} className="App-logo" alt="logo" />
            {/* <Icon type="loading" style={{ fontSize: 64, color: '#797df8' }} /> */}
          </div>
        ) : (
          <Switch>
            <Route path="/streamer" render={props => <Streamer {...props} />} />
            <Route path="/" render={props => (!user ? <Login user={user} {...props} /> : <Redirect to="/streamer" />)} />
          </Switch>
        )}
      </BrowserRouter>
    )
  }
}

export default App
