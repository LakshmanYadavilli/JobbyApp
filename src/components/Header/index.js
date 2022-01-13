import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const logOut = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <div className="header">
      <img
        src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        alt="website logo"
      />
      <div className="btn">
        <button type="button">Home</button>
        <button type="button">Jobs</button>
      </div>
      <button type="button" onClick={logOut}>
        Log Out
      </button>
    </div>
  )
}

export default withRouter(Header)
