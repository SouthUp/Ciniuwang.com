import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import css from 'Css2/home'
import common from 'Css2/common'
import contents from './contents.js'
import Content from './content.jsx'

class Home extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  componentWillMount() {
    document.body.style = ''
  }

  componentDidMount() {

  }

  render() {
    let { width, height } = this.props.view
    let contentStyle = { width, height, backgroundImage: `url(${require('Image2/hero.png')})` }
    let isLogin = false
    if (this.props.view.user) isLogin = true
    return (
      <div>
        <div id={common.nav}>
          <img src={require('Image2/logo-1.png')} alt="" />
          <ul>
            <li className={common.now}><Link to='/'>产品介绍</Link></li>
            <li><Link to='/download'>客户端下载</Link></li>
            <li><Link to='/pay'>购买产品</Link></li>
            <li><Link to='/support'>公司介绍</Link></li>
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
        <div id={css.hero} style={contentStyle}>
          <div className={css.heroTitle}>
            <div>词牛，让天下没有难改的文案</div>
            <div>词牛是一款电商违禁词检测工具，能够迅速帮助您检索文案中出现的违禁词，提高文案创作效率。</div>
          </div>
        </div>
        {contents.map((item, index) => <Content key={index} infor={item} />)}
      </div>
    )
  }

}

var mapStateToProps = state => {
  return {
    view: state.view
  }
}

export default connect(mapStateToProps)(Home)