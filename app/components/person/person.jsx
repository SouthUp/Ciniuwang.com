import React from 'react'
import Nav from '../common/navigation2'
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

  componentWillMount() {
    if (!this.props.view.user) return this.props.history.replace('/login')
  }

  render() {
    let { width, height } = this.props.view
    let frameStyle = { width, height, backgroundImage: `url(${require('Image2/0.png')})` }
    let username = '未登录'
    let style = {cursor: 'pointer'}
    if (this.props.view.user) {
      username = this.props.view.user.username
    }
    let isLogin = false
    if (this.props.view.user) isLogin = true
    else return (<div>请登录</div>)
    let { roles, points } = this.props.view.user

    return (
      <div id={css.frame} style={frameStyle}>
        <Nav index={3}/>
        <div className={css.content}>
          <img src={require('Image2/11.png')}/>
          <div className={css.title}>个人信息</div>
          <div>
            <img src={require('Image2/4.png')}/>
            <span>{username}</span>
          </div>
          <div>
            <img src={require('Image2/5.png')}/>
            <span className={css.changePassword} style={style}><Link to='/password'>修改密码</Link></span>
          </div>
          <div>
            <img src={require('Image2/3(2).png')} />
            <span>产品：已购买</span>
          </div>
          <div className={css.points}>
            <img src={require('Image2/9.png')} style={{width:'22px', marginRight:'13px'}}/>
            <span>点数：{points}</span> 
            <img className={css.pointsQ} src={require('Image2/10.png')}/>
            <Link to='/pay'>立即充值</Link>
            <span className={css.question}>检查文字免费，检查图片每张消费8点</span>
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
    this.props.history.replace('/login')
  }

}

var mapStateToProps = state => {
  return {
    view: state.view
  }
}

export default connect(mapStateToProps)(Person)