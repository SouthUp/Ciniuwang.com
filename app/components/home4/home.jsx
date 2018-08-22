import React from 'react'
import { connect } from 'react-redux'
import Nav from '../common/navigation2'
import Search from '../common/search'
import css from 'Css2/search'
import store from '../../store/store'
import action from '../../action/action'


class Home extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  componentWillUnmount() {
    store.dispatch(action.clear())
  }

  render() {
    let { width, height, user } = this.props.view
    let { word, toggle, loading, data } = this.props.search
    let isLogin = false
    let contentStyle = { paddingTop: '100px'}
    let mainStyle = { width, height, position: 'relative'}
    if (data) Object.assign(contentStyle, {alignItems: 'flex-start', paddingTop: '53px'})
    if (user) isLogin = true
    return (
      <div style={mainStyle} className={css.wrap}>
        <Nav index={0}/>
        <div className={css.content} style={contentStyle}>
          {toggle?<Search/>:null}
          {loading?<img className={css.loading} src={require('Image3/31.gif')}/>:null}
          {this.getDom(data)}
        </div>
        <div className={css.footerWrap} style={data?{display: 'none'}:{}}>
          <div className={css.footer}>
            <div className={css.qq}>
              <img src={require('Image3/18.png')} alt=""/>
              <span>738740964</span>
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
      <div>
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