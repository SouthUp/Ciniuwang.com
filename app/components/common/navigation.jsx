import React from 'react'
import { connect } from 'react-redux'
import css from 'Css2/nav'
import { Link } from 'react-router-dom'


class Navigation extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    let incomingIndex = this.props.index
    let isLogin = false
    let currentStyle = { color: '#000' }
    let wrapStyle = this.props.bgColor? {backgroundColor: this.props.bgColor}: {}
    if (this.props.border) Object.assign(wrapStyle, this.props.border)
    if (this.props.view.user) isLogin = true
    return (
      <div  style={wrapStyle}>
      <div className={css.frame}>
        <nav className={css.container}>
          <Link to='/' className={css.logo}><img src={require('Image3/logo-2.png')} alt="" /></Link>
          <ul className={css.list}>
            {list.map((item, index) => (
              <li key={item.name} style={index == incomingIndex ? currentStyle : {}}>
                <Link to={item.url}>{item.name}</Link>
              </li>
            ))}
          </ul>


          {!isLogin ? (
            <ul className={css.userInfo}>
              <li><Link to='/login'>登录</Link></li>
              <li>|</li>
              <li><Link to='/register'>注册</Link></li>
            </ul>
          ) : (
              <ul className={css.userInfo}>
                <li><Link to='/person'>个人中心</Link></li>
              </ul>
            )}
        </nav>
      </div>
      </div>
    )
  }
}

const list = [
  { name: '首页', url: '/' },
  { name: '产品介绍', url: '/product' },
  { name: '试用与购买', url: '/payhome' }
]

const mapStateToProps = state => {
  return {
    view: state.view
  }
}

export default connect(mapStateToProps)(Navigation)