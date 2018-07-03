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

  componentDidMount() {
    setTimeout(() => {
      console.log('will close')
      self.close()
    }, 3000)
  }

  render() {
    let { width, height } = this.props.view
    let frameStyle = {
      width, height, background: 'rgb(250, 250, 250)',
      backgroundImage: `url(${require('Image2/12.png')})`
    }

    let isLogin = false
    if (this.props.view.user) isLogin = true
    let linkColor = { color: 'rgba(44, 50, 65, 0.87)' }
    let linkNowColor = { color: '#2c3241' }
    let loginColor = { color: 'rgba(44, 50, 65, 0.54)' }
    return (
      <div style={frameStyle} >
        <div id={common.nav} style={{background:'linear-gradient(30deg, #3f4cfd, #2196f3)'}}>
          <img src={require('Image2/logo-1.png')} alt="" />
          <ul>
            <li className={common.now}><Link to='/'>产品介绍</Link></li>
            <li><Link to='/download'>客户端下载</Link></li>
            <li><Link to='/pay'>购买产品</Link></li>
            <li><Link to='/support'>技术支持</Link></li>
            {isLogin ?
              <li><Link to='/person'>个人中心</Link></li> :
              <li>
                <span><Link to='/login'>登录</Link></span>
                <span>|</span>
                <span><Link to='/register'>注册</Link></span>
              </li>
            }
          </ul>
        </div>

        <div className={common.paidContent}>
          <img src={require('Image2/100.png')} alt="" />
          <span onClick={this.close.bind(this)}>支付完成</span>
        </div>
      </div>
    )
  }

  close() {
    window.close()
  }

}

var mapStateToProps = state => {
  return {
    view: state.view
  }
}

export default connect(mapStateToProps)(Support)