import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import common from 'Css2/common'
import css from 'Css2/download'
import { POINT_CONVERSION_COMPRESSED } from 'constants';

const cards = [
  {
    logo: require('Image2/97.png'),
    name: 'test',
    version: '1.0',
    time: 'test time'
  },
  {
    logo: require('Image2/97.png'),
    name: 'test',
    version: '1.0',
    time: 'test time'
  },
]

class Download extends React.Component {
  constructor() {
    super()
    this.state = {

    }
  }

  render() {
    let { width, height } = this.props.view
    let frameStyle = { width, height }
    let isLogin = false
    if (this.props.view.user) {
      isLogin = true
    }
    return (
      <div style={frameStyle}>
        <div id={common.nav}>
          <img src={require('Image2/logo-1.png')} alt="" />
          <ul>
            <li><Link to='/'>产品介绍</Link></li>
            <li><Link to='/download'>客户端下载</Link></li>
            <li><Link to='/'>购买产品</Link></li>
            <li><Link to='/'>公司介绍</Link></li>
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

        <div className={css.top}>
          <div className={css.logoFrame}>
            <img src={require('Image2/102.png')} alt="" />
            <img className={css.midLogo} src={require('Image2/logo-3.png')} alt="" />
            <div className={css.title}>词牛客户端下载</div>
          </div>
        </div>

        <div className={css.cards}>
            {cards.map(item => (
              <div className={css.card}>
                <img src={item.logo} alt=""/>
                <div className={css.name}>{item.name}</div>
                <div className={css.version}>{item.version}</div>
                <div className={css.time}>{item.time}</div>
                <div className={css.download}>下载</div>
              </div>
            ))}
        </div>
      </div>
    )
  }

}

var mapStateToProps = state => {
  return {
    view: state.view
  }
}

export default connect(mapStateToProps)(Download)