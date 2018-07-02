import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import common from 'Css2/common'


class Support extends React.Component {
  constructor() {
    super()
    this.state = {

    }
  }

  componentWillMount() {
    // if (!this.props.view.user) this.props.history.push('/login')
  }

  render() {
    let { width, height } = this.props.view
    let frameStyle = { width, height, background: 'rgb(250, 250, 250)',
      backgroundImage: `url(${require('Image2/12.png')})`}

    let isLogin = false
    if (this.props.view.user) isLogin = true
    let linkColor = {color: 'rgba(44, 50, 65, 0.87)'}
    let linkNowColor = {color: '#2c3241'}
    let loginColor = {color: 'rgba(44, 50, 65, 0.54)'}
    return (
      <div style={frameStyle} >
        <div id={common.nav} style={{ zIndex: 900 }}>
          <img src={require('Image2/logo-2.png')} alt="" />
          <ul>
            <li style={linkColor}><Link to='/'>产品介绍</Link></li>
            <li style={linkColor}><Link to='/download'>客户端下载</Link></li>
            <li style={linkColor}><Link to='/pay'>购买产品</Link></li>
            <li style={linkNowColor} className={common.now}><Link to='/support'>技术支持</Link></li>
            {isLogin ?
              <li style={loginColor}><Link to='/person'>个人中心</Link></li> :
              <li style={loginColor}>
                <span><Link to='/login'>登录</Link></span>
                <span>|</span>
                <span><Link to='/register'>注册</Link></span>
              </li>
            }

          </ul>
        </div>
        
        <div className={common.supportContent}>
          
          <span>Q Q：738740964</span>
          <img src={require('Image2/103.png')} alt=""/>
          <span>yuanqi.wang@ciniuwang.com</span>
        </div>
      </div>
    )
  }

  download(url) {
    window.open(url, '_blank')
  }

}

var mapStateToProps = state => {
  return {
    view: state.view
  }
}

export default connect(mapStateToProps)(Support)