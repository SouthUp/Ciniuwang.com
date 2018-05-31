import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import store from '../../store/store'
import Action from '../../action/action'
import css from 'Css2/person'
var $ = require('jquery')

class Person extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    if (!this.props.view.user) return this.props.history.push('/login')
  }

  render() {
    let { width, height } = this.props.view
    let frameStyle = { width, height }
    let username = '未登录'
    let style = {cursor: 'pointer'}
    if (this.props.view.user) {
      username = this.props.view.user.username
    }
    return (
      <div id={css.frame} style={frameStyle}>
        <Link to='/'><img className={css.logo} src={require('Image2/logo-2.png')} alt=""/></Link>
        <div className={css.content}>
          <img src={require('Image2/11.png')}/>
          <div className={css.title}>个人信息</div>
          <div>
            <img src={require('Image2/4.png')}/>
            <span>{username}</span>
          </div>
          <div>
            <img src={require('Image2/5.png')}/>
            <span className={css.changePassword} style={style}>修改密码</span>
          </div>
          <div>
            <img src={require('Image2/3.png')} alt=""/>
            <span>已购买</span>
          </div>
          <div>
            <img src={require('Image2/6.png')} alt=""/>
            <span className={css.loginOut} style={style} onClick={this.loginOut.bind(this)}>注销</span>
          </div>
        </div>
      </div>
    )
  }

  loginOut() {
    store.dispatch(Action.loginOut())
    this.props.history.push('/login')
  }

}

var mapStateToProps = state => {
  return {
    view: state.view
  }
}

export default connect(mapStateToProps)(Person)