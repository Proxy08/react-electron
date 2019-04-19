
import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import routes from '../../routes/log.js'
// import { app } from "../../config/base.js";
export default class LogPage extends Component {
  // componentDidMount() {
  //   if (this.props.user) {
  //     this.props.history.push(`app/`);
  //   }
  // }
  render() {
    return (
      <div>
            <Switch>{routes.map(r => <Route key={r.path} {...r} />)}</Switch>
          </div>
    )
  }
}
