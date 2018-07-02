import React from 'react'
import { connect } from 'react-redux'
import { Link, Route } from 'react-router-dom'
import store from '../../store/store'
import Action from '../../action/action'
import css from 'Css2/pay'
import common from 'Css2/common'
import Snackbar from '../common/snackbar'
import { create } from 'domain';
var $ = require('jquery')

class Pay extends React.Component {
  constructor() {
    super()
    this.state = {
      pointIndex : -1,
      types: [],
      price: 0,
      pointPrice: 0,
      servePrice: 0,
      text: '',
      step: 0,
      trade: null,
      id: '',
      complete: false
    }
  }

  componentWillMount() {
    if (!this.props.view.user) this.props.history.push('/login?from=pay')
  }

  componentWillUnmount() {
    clearInterval(this.pulling)
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextprops) {
    // console.log(nextprops)
  }

  render() {
    let { width, height } = this.props.view
    let frameStyle = { width, height}
    let user, isLogin = false
    
    if (this.props.view.user) isLogin = true
    else return (null)
    
    user = this.props.view.user
    if (!user.point) user.point = 0
    let vip = user.roles.find(item => item.roleName == 'Vip')
    let typeObjs = []
    this.state.types.forEach(item => {
      let result = typeList.find(item2 => item2.roleName == item)
      if (result) typeObjs.push(result)
    })

    let payButtonMessage = '立即支付'
    if (this.state.id) {
      payButtonMessage = '等待支付...'
    }

    if (this.state.complete) {
      payButtonMessage = '充值成功...'
    }
    return (
      <div id={css.frame} style={frameStyle}>
        <Snackbar text={this.state.text} clearText={this.clearText.bind(this)}/>
        <div id={common.nav} style={{backgroundImage: 'linear-gradient(30deg, #3f4cfd, #2196f3)'}}>
          <img src={require('Image2/logo-1.png')} alt="" />
          <ul>
            <li><Link to='/'>产品介绍</Link></li>
            <li><Link to='/download'>客户端下载</Link></li>
            <li className={common.now}><Link to='/pay'>购买产品</Link></li>
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
        {this.state.step == 0? (
          <div className={css.content}>
          <div >
            <div className={css.type}>账户</div>
            <div className={css.username}>{user.username}</div>
          </div>
          <div >
            <div className={css.type}>软件产品</div>
            <div className={css.list}>
              {typeList.map((item, index) => {
                  let isCurrentVip = user.roles.find(role => role.roleName == item.roleName)?true:false
                  let name = item.roleName
                  let isChecked = this.state.types.find(checked => item.roleName == checked)?true:false
                  return (
                    <div className={css['list-row']} key={item.roleName}>
                      <input type="radio" name={name} value={name} 
                        checked={isCurrentVip || isChecked?true:null}
                        onClick={this.selectVip.bind(this, item.roleName)}/>
                      <span>{item.name}</span>
                      <span>{isCurrentVip?'已购买':item.price + '/年'}</span>
                  </div>
                  )
              })}
              <div className={css.line}></div>
              <div className={css['remain-point']}>
                剩余点数：{user.point} 
                <span style={{color: 'rgba(44, 50, 65, 0.54)',fontSize:'14px'}}> 检查文字免费，检查图片每张消费4点</span>
              </div>
            </div>
          </div>
          <div >
            <div className={css.type + ' ' + css['height-type']}>充值点数</div>
            <div className={css['point-select-frame']}>
              {pointList.map((item, index) => {
                return (
                  <div onClick={this.select.bind(this, index)} className={css['select-colume']}
                    id={this.state.pointIndex == index?css.selected:''} key={index}>
                    <img style={this.state.index == index?{}:{display:'none'}} src={require('Image2/105.png')} />
                    <span>{item.price} 元</span>
                    <span>{item.count} 点</span>
                  </div>
                )
              })}
            </div>
          </div>
          <div >
            <div className={css.type}>支付方式</div>
            <div className={css['pay-list']}>
              {payWayList.map((item, index) => {
                return (
                  <div className={css['pay-colume']} key={index}>
                    <img src={item.url} alt=""/>
                    <span>{item.name}</span>
                  </div>
                )
              })}
            </div>
          </div>
          <div >
            <div className={css.type}>结算总价</div>
            <div className={css.price}>{this.state.price} 元</div>
          </div>
          <div style={{marginTop: '25px'}}>
            <div className={css.type}></div>
            <div className={css.next} onClick={this.next.bind(this)}>下一步</div>
          </div>
        </div>
        ): (
          <div className={css.tradeContent}>
            <div className={css.payLine}></div>
            <div className={css.tradeTitle}>确认订单</div>
            <div className={css.tradeUsername}>{user.username}</div>
            <div className={css.productName}>词牛违禁词检索软件</div>

            <div className={css.productList}>
              <div className={css.productRow}>
                <span>年服务费</span>
                <span>{this.state.servePrice} 元</span>
              </div>
              <div className={css.productRow}>
                <span>充值点数</span>
                <span>{this.state.pointPrice} 元</span>
              </div>
            </div>

            <div className={css.allPrice}>
              <span>总价：</span>
              <span>{this.state.price} 元</span>
            </div>
            
            <div className={css.payButton} onClick={this.pay.bind(this)}>{payButtonMessage}</div>

          </div>
        )}
        
      </div>
    )
  }

  clearText() {
    this.setState({text: ''})
  }

  select(pointIndex) {
    if (pointIndex == this.state.pointIndex) {
      this.setState({pointIndex: -1}, () => {
        this.countPrice()  
      })
    }
    else this.setState({pointIndex}, () => {
      this.countPrice()
    })
  }

  selectVip(type) {
    let isCurrentVip = this.props.view.user.roles.find(role => role.roleName == type)
    if (isCurrentVip) return
    let { types } = this.state
    let exist = types.findIndex(item => item == type)
    if (exist == -1) {
      this.setState({types: [...types, type]}, () => {
        this.countPrice()
      })
    }
    else {
      types.splice(exist,1)
      this.setState({types}, () => {
        this.countPrice()
      })
    }
  }

  countPrice() {
    let { pointIndex, types } = this.state
    let pointPrice = 0
    let servePrice = 0

    //点数费用
    if (pointIndex !== -1) pointPrice += pointList[pointIndex].price

    types.forEach(type => {
      let isCurrentVip = this.props.view.user.roles.find(role => role.roleName == type)
      let row = typeList.find(item => item.roleName == type)
      if (!isCurrentVip && row) {
        servePrice += row.price
      }
    })
    
    this.setState({price: pointPrice + servePrice, pointPrice, servePrice})
  }

  next() {
    console.log(this.state)
    if (this.state.price == 0) return
    this.setState({step: 1})
  }

  pay() {
    
    let { username, roles, sessionToken } = this.props.view.user
    let { pointIndex, types } = this.state
    
    if (!username) return this.setState({text: '请登录'})
    if (roles.length == 0 && types.length == 0) return this.setState({text: '请选择软件产品'})
    
    let send_data = { types, pointIndex }
    $.ajax({
      type: 'POST',
      url: 'http://ciniu.leanapp.cn/pay',
      headers: {'X-LC-Session': sessionToken},
      dataType: 'json',
      data: send_data,
      success: (res) => {
        window.open(res.url, '_blank')
        this.setState({'id': res.result.objectId}, () => {
          this.createPulling()
        })
      },
      error: err => {
        console.log(err)
        this.setState({
          text: err.message
        })
      }
    })
  }

  createPulling() {
    let { sessionToken } = this.props.view.user
    let { id } = this.state
    if (!id) return clearInterval(this.pulling)
    this.pulling = setInterval(() => {
      $.ajax({
        type: 'get',
        url: 'http://ciniu.leanapp.cn/pay/trade?id=' + id,
        headers: {'X-LC-Session': sessionToken},
        success: res => {
          let obj = { trade: res}
          // console.log(res)
          if (res.code == '10000' ) {
            if (res.trade_status == 'TRADE_SUCCESS') {
              console.log('支付成功')
              Object.assign(obj, {complete: true})
              clearInterval(this.pulling)
              this.linkToPersonPage()
            }
            
          } else {
            console.log('支付不成功')
          }
          this.setState(obj)
          
        }
      })
    }, 2000)
  }

  linkToPersonPage() {
    let { sessionToken } = this.props.view.user
    $.ajax({
      type: 'get',
      url: 'http://ciniu.leanapp.cn/user',
      headers: {'X-LC-Session': sessionToken},
      success: res => {
        store.dispatch(Action.updateUser(res))
        setTimeout(() => {
          this.props.history.push('/person')
        }, 4000)
      }
    })
    
  }
}

const pointList = [
  {price: 50, count: '5,000'},
  {price: 98, count: '10,000'},
  {price: 180, count: '20,000'},
  {price: 350, count: '40,000'},
  {price: 1000, count: '120,000'},
]

const payWayList = [
  {url: require('Image2/101.png'), name: '支付宝'}
]

const typeList = [
  { name: '词牛违禁词软件', roleName: 'Vip', price: 1000}
]

var mapStateToProps = state => {
  return {
    view: state.view
  }
}

export default connect(mapStateToProps)(Pay)