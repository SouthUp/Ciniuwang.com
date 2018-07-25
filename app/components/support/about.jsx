import React from 'react'
import { connect } from 'react-redux'
import Nav from '../common/navigation'
import Footer from '../common/footer'

const contentStyle = {
  maxWidth: '900px',
  padding: '0 10px',
  margin: '39px auto 0',
  minHeight: '500px',
  userSelect: 'text'
}

const titleStyle = {
  textAlign: 'center',
  fontSize: '24px',
  color: '#3d464a', 
  marginBottom: '39px'
}

const articleStyle = {
  fontSize: '14px',
  color: '#646b76', 
  marginBottom: '39px'
}

const rowStyle = {
  marginBottom: '39px',
  lineHeight: '28px'
}
class About extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    let { width, height } = this.props.view
    let isLogin = false
    if (this.props.view.user) isLogin = true
    let frameStyle = { width, height }

    return (
      <div style={frameStyle} >
        <Nav isLogin={isLogin} />
        <div style={contentStyle}>
          <title style={titleStyle}>关于我们</title>
          <div style={articleStyle}>
            <div style={rowStyle}>上海冲南智能科技有限公司（“冲南智能”），是一家深耕于智能选词领域的科技企业。</div>
            <div style={rowStyle}>冲南智能致力于为广大电商从业伙伴和内容创作者持续赋能，提供了国内领先的违禁词检查软件——词牛。词牛软件针对市场上违禁词，敏感词等需求，提供了桌面客户端，Word插件等形式，改变了原有违禁词查询模式，实现了即时创作，即时查询违禁词，即时修改。</div>
            <div style={rowStyle}>冲南智能的团队拥有多年的软件产品，研发和软件企业管理经验，专注智能选词领域，让用户享受高效率的创作生产力工具是冲南智能的不懈追求！</div>


          </div>
        </div>
        <Footer/>
      </div>
    )
  }
}

var mapStateToProps = state => {
  return {
    view: state.view
  }
}

export default connect(mapStateToProps)(About)