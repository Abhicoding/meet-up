import React, {Component} from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Content from '../content'
import Header from '../header'
import CreateEvent from '../createEvent'
import EventDetails from '../eventDetails'
import config from '../../config/index'
import http from '../../helper/http'
import Login from '../admin'

class Main extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoggedin: false,
      profile: null
    }
    this.handleLoginSuccess = this.handleLoginSuccess.bind(this)
    this.handleLogoutSuccess = this.handleLogoutSuccess.bind(this)
  }

  handleLoginSuccess (profile) {
    this.setState({isLoggedin: true, profile})

    const data = {
      email: profile.getEmail(),
      name: profile.getName(),
      id: profile.getId(),
      image: profile.getImageUrl()
    }

    http.post(`${config.url}api/user/login`, data)
      .then((response) => {
        if (response.status === 200) {
          console.log('success', response)
        }
      })
  }

  handleLogoutSuccess () {
    this.setState({isLoggedin: false, profile: null})
  }

  render () {
    const {isLoggedin, profile} = this.state
    return (
      <BrowserRouter>
        <div>
          <Header isLoggedin={isLoggedin} onLoginSuccess={this.handleLoginSuccess} onLogoutSuccess={this.handleLogoutSuccess} profile={profile} />
          <Switch>
            <Route exact path='/' component={Content} />
            <Route exact path='/admin' component={Login} />
            <Route exact path='/create' component={CreateEvent} />
            <Route exact path='/:id' render={(props) => <EventDetails {...props} onLoginSuccess={this.handleLoginSuccess} isLoggedin={isLoggedin} profile={profile} />} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default Main
