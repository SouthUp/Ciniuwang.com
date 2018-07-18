import React from 'react'
import { connect } from 'react-redux'
import Nav from '../common/navigation'
import lib from '../../lib'
import Footer from '../common/footer'
import css from 'Css2/home2'

class Home extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    let isLogin = false
    let { width, height, user } = this.props.view
    if (user) isLogin = true
    let mainStyle = { width, height }
    return (
      <div style={mainStyle}>
        <Nav index={0} isLogin={isLogin} />
        <div className={css.content}>
          <title>词牛，让违禁词无处可藏</title>
          <div className={css.contentMain}>
            <div className={css.contentLeft}>
              {/* 软件标题 */}
              <title>词牛套件 1.0.1</title>
              {/* 软件描述 */}
              <div className={css.description}>
                为文案与美工深度定制的word、excel套件与图片批量自动扫描工具。一键安装，不需要培训即可便捷使用
              </div>
              {/* 下载按钮 */}
              <div className={css.downloadWrap}>
                <a onClick={this.download.bind(this)} href='http://www.ciniuwang.com/files/词牛客户端.zip'>
                  <div className={css.download}>
                    <img src={require('Image3/98.png')} alt="" />
                    <span>免费试用</span>

                  </div>
                </a>
              </div>
              {/* 平台支持信息 */}
              <div className={css.platformList}>
                {platform.map(item => (
                  <div key={item.text} className={css.platformItem}>
                    <img src={item.icon} alt="" />
                    <span dangerouslySetInnerHTML={{ '__html': item.text }} />
                  </div>
                ))}
              </div>
            </div>
            <div className={css.contentRight}>
              <img src={require('Image3/29.png')} alt="" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  download() {
    _hmt.push(['_trackEvent', 'download', 'click', this.props.view.query])
    window.__bl && __bl.sum('download-home', 1)
  }
}

const platform = [
  { icon: require('Image3/101.png'), text: '支持 Windows 10/8/7 32 / 64-bit' },
  { icon: require('Image3/100.png'), text: '支持微软 Word 和 Excel 2010 / 2013 / 2016' },
  { icon: require('Image3/102.png'), text: '支持JPEG / PNG' },
  { icon: require('Image3/2.png'), text: '用户QQ群：738740964<br/>客服微信号：ciniu2018' }
]

var mapStateToProps = state => {
  return {
    view: state.view
  }
}

export default connect(mapStateToProps)(Home)