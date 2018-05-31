import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import store from '../../store/store'
import Action from '../../action/action'
import css from 'Css2/register'
import Snackbar from '../common/snackbar'
var $ = require('jquery')

class Password extends React.Component {
  constructor() {
    super()
    this.timeHandle = null
    this.state = {
      pwdVisible: false,
      username: '',
      code: '',
      password: '', 
      time: 0,
      text: ''
    }
  }

  render() {
    let { width, height } = this.props.view
    let frameStyle = { width, height, backgroundImage: `url(${require('Image2/0.png')})`}
    let iconStyle = this.state.pwdVisible? {bottom: '12px'}:{bottom: '10px'} 
    let { pwdVisible } = this.state
    let text = this.state.time == 0? '发送验证码': this.state.time + 's'
    let borderStyle = this.state.time == 0? {borderColor: '#b4deff', color: 'rgba(0,0,0,.87)'}
      : {borderColor: '#eaf6ff', color: 'rgba(0,0,0,.26)'}
    return (
      <div id={css.frame} style={frameStyle}>
        <Snackbar text={this.state.text} clearText={this.clearText.bind(this)}/>
        <Link to='/'><img className={css.logo} src={require('Image2/logo-2.png')} alt=""/></Link>
        <div className={css.content}>
          <div className={css.title}>修改密码</div>
          <div className={css.inputFrame}>
            <input type="text" placeholder='手机号' autoFocus 
              value={this.state.username} onChange={this.inputUsername.bind(this)}/>
            <div onClick={this.verCode.bind(this)} style={borderStyle} className={css.sendCodeButton}>{text}</div>
            <input type='text' placeholder='输入验证码' 
              value={this.state.code} onChange={this.inputCode.bind(this)}/>
            <input type={pwdVisible? 'text': 'password'} placeholder='新密码' 
              value={this.state.password} onChange={this.inputPassword.bind(this)}/>
            <img className={css.passwordIcon} style={iconStyle} 
              onClick={this.changePwdVisible.bind(this)}
              src={pwdVisible?require('Image2/2.png'):require('Image2/1.png')} />
          </div>
          <div className={css.submitButton} onClick={this.submit.bind(this)}>确定</div>
          <footer className={css.footer}>©  2018 - 2020 上海闻上信息科技有限公司</footer>
        </div>
      </div>
    )
  }

  inputUsername(e) {
    this.setState({ username: e.target.value })
  }

  inputCode(e) {
    this.setState({ code: e.target.value })
  }

  inputPassword(e) {
    this.setState({ password: e.target.value })
  }

  changePwdVisible(e) {
    this.setState({ pwdVisible: !this.state.pwdVisible})
  }

  verCode(e) {
    let { username, time } = this.state
    if (time !== 0) return
    if (!username) return this.setState({text: '手机号不能为空'})
    $.ajax({
      type: 'POST',
      url: 'http://ciniu.leanapp.cn/user/pwdcode',
      dataType: 'json',
      data: { username },
      success: (res) => {
        this.setState({
          text: '验证码已发送', 
          time: 60,
        }, () => {
          this.timeHandle = setInterval(() => {
            if (this.state.time > 0) {
              this.setState({time: this.state.time - 1})
            } else clearInterval(this.timeHandle)
          }, 1000)
        })
      },
      error: err => {
        console.log(err)
        this.setState({text: err.responseJSON.message.split('[')[0]})
      }
    })
  }

  submit(e) {
    let { password, code } = this.state
    $.ajax({
      type: 'POST',
      url: 'http://ciniu.leanapp.cn/user/password',
      dataType: 'json',
      data: { password, code },
      success: (res) => {
        console.log(res)
        this.setState({
          text: '修改密码成功'
        }, () => {
          setTimeout(() => {
            this.props.history.push('/login')
          },1000)
        })
        
      },
      error: err => {
        console.log(err)
        this.setState({text: err.responseJSON.message.split('[')[0]})
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

export default connect(mapStateToProps)(Password)