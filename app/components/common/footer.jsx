import React from 'react'
import css from 'Css2/footer'
import { connect } from 'react-redux'
import { Link, Route } from 'react-router-dom'

class Footer extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    document.documentElement.scrollTop = 0
  }

  render() {
    let disableStyle = {cursor: 'not-allowed', opacity:'.5'}
    console.log(this.props)
    return (
      <div className={css.container}>
        <div className={css.content}>
          <ul className={css.list}>
            {list.map(item => (
              <li onClick={this.click.bind(this, item)} key={item.name}>
                {item.href?
                  <a href={item.href}>{item.name}</a>
                : null}
                {item.link?
                  <Link to={item.link}>{item.name}</Link>:
                  null}
                {item.disable?
                  <a style={disableStyle} href={item.href}>{item.name}</a>:
                  null}
              </li>
            ))}
          </ul>
          <div className={css.line}/>
          <div className={css.bottom}>
            <div className={css.leftContent}>
              <img src={require('Image3/logo-22.png')} alt=""/>
              <div>
                <span>用户QQ群：738740964</span>
                <span>邮箱：support@ciniuwang.com</span>
                <span>联系电话：+8621-60782337</span>
              </div>
            </div>
            <div className={css.rightContent}>
              <div>
                <span>沪ICP备18021028号-1</span>
                <span>© 2018-2020上海冲南智能科技有限公司及其许可人。版权所有</span>
              </div>
              <span>使用条款  |  隐私政策</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  click(item) {
    if (item.href && !item.link) {
      window.__bl && __bl.sum('download-footer', 1)
      _hmt.push(['_trackEvent', 'download', 'click', this.props.view.query])
    }
  }
}

const list = [
  { name: 'FAQ', disable: true,},
  { name: '下载', disable: false, href: 'http://www.ciniuwang.com/files/词牛客户端.zip'},
  { name: '联系销售', disable: true},
  { name: '联系我们', disable: true},
  { name: '关于我们', disable: false, link: 'about'}
]

var mapStateToProps = state => {
  return {
    view: state.view
  }
}

export default connect(mapStateToProps)(Footer)