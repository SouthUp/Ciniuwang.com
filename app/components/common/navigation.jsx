import React from 'react'
import css from 'Css2/nav'
import { Link } from 'react-router-dom'

class Navigation extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    let incomingIndex = this.props.index
    let isLogin = this.props.isLogin
    let currentStyle = {color: '#000'}
    return (
      <nav className={css.container}>
        <Link to='/' className={css.logo}><img src={require('Image3/logo-2.png')} alt="" /></Link>
        <ul className={css.list}>
          {list.map((item, index) => (
            <li key={item.name} style={index==incomingIndex?currentStyle:{}}>
              <Link to='/'>{item.name}</Link>
            </li>
          ))}
        </ul>

        
          {!isLogin?(
            <ul className={css.userInfo}>
              <li><Link to='/login'>登录</Link></li>
              <li>|</li>
              <li><Link to='/register'>注册</Link></li>
            </ul>
          ):(
            <ul className={css.userInfo}>
              <li><Link to='/person'>个人中心</Link></li>
            </ul>
          )}
      </nav>
    )
  }
}

const list = [
  { name: '首页', url: '/' },
  { name: '产品介绍', url: '/home' },
  { name: '试用与购买', url: '/pay' }
]

export default Navigation