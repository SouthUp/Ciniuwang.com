import React from 'react'
import { connect } from 'react-redux'
import Nav from '../common/navigation2'
import Search from '../common/search'
import css from 'Css2/search'
import store from '../../store/store'
import action from '../../action/action'
import Footer from '../common/footer'

const qqqun = 'http://shang.qq.com/wpa/qunwpa?idkey=9f8e1d953d4803dc93855fc9138a136195549fdee5eec7cb9d179cbdba96494e'
class Home extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  componentWillUnmount() {
    store.dispatch(action.clear())
  }

  render() {
    let { width, height } = this.props.view
    let { toggle, loading, data } = this.props.search
    let footerStyle = {}
    if (!data && height > 911) footerStyle={position: 'fixed', bottom: '0px'}
    if (data) footerStyle = {display: 'none'}
    let contentStyle = { paddingTop: '100px'}
    let mainStyle = { width, height, position: 'relative'}
    if (data) Object.assign(contentStyle, {alignItems: 'flex-start', paddingTop: '53px'})
    if (data && !data.result) Object.assign(contentStyle, {marginBottom: '400px'})
    return (
      <div style={mainStyle} className={css.wrap}>
        {/* 导航栏 */}
        <Nav index={0}/>

        {/* 搜索框/加载动画/搜索结果 */}
        <div className={css.content} style={contentStyle}>
          {toggle?<Search/>:null}
          {loading?<img className={css.loading} src={require('Image3/31.gif')}/>:null}
          {this.getDom(data)}
        </div>

        {/* 微信/qq 联系方式  */}
        <div className={css.footerWrap} style={data?{display: 'none'}:{}}>
          <div className={css.footer}>
            <div className={css.qq}>
              <img src={require('Image3/18.png')} alt=""/>
              <div className={css.footerMessageWrap}>
                <span><a href={qqqun} target="_blank">加入词牛用户交流群</a></span>
                <span><a href={qqqun} target="_blank">778149574</a></span>
              </div>

              <div className={css.hiddenImg}>
                <div>
                  <img style={{width:'110px', height: '110px'}} src={require('Image3/4-2.png')} alt=""/>
                  <span>用户QQ群二维码</span>
                </div>
                <img src={require('Image3/5.png')} alt=""/>
              </div>
            </div>
            

            <div className={css.wechat}>
              <img src={require('Image3/19.png')} alt=""/>
              <img src={require('Image3/18-2.png')} alt=""/>
              <span>ciniu2018</span>
              <div className={css.hiddenImg}>
                <div>
                  <img src={require('Image3/4.png')} alt=""/>
                  <span>词牛微信二维码</span>
                </div>
                <img src={require('Image3/5.png')} alt=""/>
              </div>
            </div>
          </div>
        </div>
        <Footer style={footerStyle}/>
      </div>
    )
  }

  getDom(data) {
    if (!data) return null
    if (data && !data.state) return (
      <div className={css.resultMessage}>{data.message}</div>
    )
    let result = JSON.parse(data.result)
    return (
      <div className={css.contentResult}>
        {result.map(item => (
          <div key={item.name} className={css.wordFrame}>
            <div className={css.resultMessage}>{item.name}</div>
            {item.clauses.map(clause => (
              <div key={clause.description}>
                <pre className={css.description}>{clause.description}</pre>
                <div className={css.typeName}>{clause.typeName}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    )
  }
}



const mapStateToProps = state => {
  return {
    view: state.view,
    search: state.search
  }
}

export default connect(mapStateToProps)(Home)