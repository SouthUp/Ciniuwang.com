import React from 'react'
import { connect } from 'react-redux'
import { Link, Route } from 'react-router-dom'
import store from '../../store/store'
import Action from '../../action/action'
import css from 'Css2/login'
import Snackbar from '../common/snackbar'
import action from '../../action/action';
var $ = require('jquery')

class Login extends React.Component {
  constructor() {
    super()
    this.state = {
      pwdVisible: false,
      username: '',
      password: '',
      text: ''
    }
  }

  componentWillReceiveProps(nextprops) {
    // console.log(nextprops)
  }

  render() {
    let { width, height } = this.props.view
    let frameStyle = { width, height, backgroundImage: `url(${require('Image2/0.png')})` }
    let iconStyle = this.state.pwdVisible? {bottom: '12px'}:{bottom: '10px'} 
    let { pwdVisible } = this.state
    return (
      <div id={css.frame} style={frameStyle}>
        <Snackbar text={this.state.text} clearText={this.clearText.bind(this)}/>
        <Link to='/'><img className={css.logo} src={require('Image3/logo-2.png')} alt=""/></Link>
        <div className={css.content}>
          <div className={css.title}>登录</div>
          <div className={css.inputFrame}>
            <input type="text" placeholder='手机' autoFocus 
              value={this.state.username} onChange={this.inputUsername.bind(this)}/>
            <input type={pwdVisible? 'text': 'password'} placeholder='密码' 
              value={this.state.password} onChange={this.inputPassword.bind(this)}/>
            <img className={css.passwordIcon} style={iconStyle} 
              onClick={this.changePwdVisible.bind(this)}
              src={pwdVisible?require('Image2/2.png'):require('Image2/1.png')} />
          </div>
          <div className={css.toolBar}>
            <span><Link to='/password'>找回密码</Link></span>
            <span><Link to='/register'>用户注册</Link></span>
          </div>
          <div className={css.submitButton} onClick={this.submit.bind(this)}>确定</div>
          <footer className={css.footer}>©  2018 - 2020 上海冲南智能科技有限公司</footer>
        </div>
      </div>
    )
  }

  inputUsername(e) {
    this.setState({ username: e.target.value })
  }

  inputPassword(e) {
    this.setState({ password: e.target.value })
  }

  changePwdVisible(e) {
    this.setState({ pwdVisible: !this.state.pwdVisible})
  }

  submit(e) {
    let { username, password } = this.state
    if (!username) return this.setState({ text: '用户名不能为空'})
    if (!password) return this.setState({ text: '密码不能为空'})
    
    $.ajax({
      type: 'POST',
      url: 'http://ciniu.leanapp.cn/token',
      dataType: 'json',
      data: { username, password },
      success: (res) => {
        store.dispatch(action.setUser(res))
        console.log(res)
        if (window.location.search.indexOf('pay') !== -1) {
          this.props.history.push('/pay')
        } else {
          this.props.history.push('/person')
        }

      },
      error: err => {
        console.log(err)
        this.setState({
          text: err.responseJSON.message?
            err.responseJSON.message.split('[')[0]:
            err.responseJSON.rawMessage.split('[')[0]
        })
      }
    })
      
  }

  clearText() {
    this.setState({text: ''})
  }
}

var mapStateToProps = state => {
  return {
    view: state.view
  }
}

export default connect(mapStateToProps)(Login)