import React, {Component} from 'react'
import GoogleOauth from '../googleOauth'
import config from '../../config/index'
import http from '../../helper/http'
import './style.css'

class Login extends Component {
  constructor (props) {
    super(props)
    this.handleLoginSuccess = this.handleLoginSuccess.bind(this)
  }

  handleLoginSuccess (profile) {
    const data = {
      emailid: profile.getEmail()
    }
    http.post(`${config.url}api/admin/login`, data)
      .then((response) => {
        if (response.status === 200) {
          this.props.history.push('/create')
        }
      })
  }
  render () {
    return (
      <div>
        <GoogleOauth onLoginSuccess={this.handleLoginSuccess} />
      </div>
    )
  }
}

export default Login
