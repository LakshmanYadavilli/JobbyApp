import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    isFailure: false,
    msg: '',
  }

  username = event => {
    this.setState({username: event.target.value})
  }

  password = event => {
    this.setState({password: event.target.values})
  }

  submit = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const url = 'https://apis.ccbp.in/login'
    const details = {
      username,
      password,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(details),
    }
    const response = await fetch(url, options)

    const data = await response.json()
    if (response.ok) {
      const token = data.jwt_token
      Cookies.set('twt_token', token, {expires: 1})
      const {history} = this.props
      history.replace('/')
    } else {
      const msg = data.error_msg
      this.setState({isFailure: true, msg})
      console.log(data, 'hii')
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    const {isFailure, msg} = this.state

    return (
      <div className="login">
        <form onSubmit={this.submit}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          <br />
          <label htmlFor="username">USER NAME</label>
          <br />
          <input
            id="username"
            type="text"
            placeholder="User Name"
            onChange={this.username}
          />
          <br />
          <label htmlFor="password">PASSWORD</label>
          <br />
          <input
            id="password"
            type="password"
            placeholder="Password"
            onChange={this.password}
          />
          <br />
          {isFailure && <p>{msg}</p>}
          <button type="submit">Login</button>
        </form>
      </div>
    )
  }
}

export default LoginForm
