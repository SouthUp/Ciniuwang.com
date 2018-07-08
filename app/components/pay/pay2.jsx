import React from 'react'
import { connect } from 'react-redux'
import { Link, Route } from 'react-router-dom'
import store from '../../store/store'
import Action from '../../action/action'
import css from 'Css2/pay2'
import Snackbar from '../common/snackbar'
import Nav from '../common/navigation'
import Footer from '../common/footer'
var $ = require('jquery')

class Pay extends React.Component {
  constructor() {
    super()
    this.state = {
      price: 0,
      annualCount: 0,
      pointIndex: 0,
      invoiceClassify: 'person',  //company person,
      invoiceType: 'electronic', // paper electronic
      invoiceTitle: '',
      invoiceId: '',
      address: '',
      email: '',
      name: '',
      photo: '',
      code: '',
      pay: 'ali',
      step: 1
    }
  }

  componentDidMount() {
    this.setState({price:this.countPrice()})
  }

  render() {
    let { price, annualCount, pointIndex, invoiceClassify, invoiceType, invoiceTitle, invoiceId, address, email, name, photo, code, pay } = this.state
    let discountStyle={ backgroundImage: `url(${require('Image3/60.png')})` }
    let hidden = { display: 'none'}
    let type = this.getType()
    if (this.state.step == 2) return (
      <div>
        <Nav bgColor='#fafbfd' index={2} border={{borderBottom:'1px solid rgba(100,107,118,.12)'}}/>
        <div className={css.orderWrap}>
          <div className={css.orderContent}>
            <title>确认订单</title>
            {/* 用户信息 */}
            <div className={css.orderUser}>
              <div>
                <span>用户名:</span>
                <span>test</span>
              </div>
            </div>
            {/* 购买信息 */}
            <div className={css.orderPurchase}>
            {annualCount > 0? 
              <div className={css.orderPoint}>
              <span>套件年费: </span>
              <span>{annualCount}</span>
              <span>{annualCount * 999}元</span>
            </div>:null}
            {pointIndex !== -1?
              <div className={css.orderPoint}>
                <span>充值点数: </span>
                <span>{pointList[pointIndex].count}点</span>
                <span>{pointList[pointIndex].price}元</span>
              </div>:null}
            </div>
            {/* 地址信息 */}
            <div className={css.orderInformation}>
              <div style={invoiceClassify=='company'?{}:hidden}>发票抬头：{invoiceTitle}</div>
              <div style={invoiceClassify=='company'?{}:hidden}>识别号：{invoiceId}</div>
              <div>邮寄地址：{this.getAddress()}</div>
              <div>支付方式：支付宝</div>
            </div>
            {/* 支付按钮 */}
            <div className={css.orderButton}>
              <div onClick={this.pay.bind(this)}>立即支付</div>
              <div onClick={this.next.bind(this,1)}>上一步</div>
            </div>
          </div>  
        </div>
        <Footer/>
      </div>  
    )
    return (
      <div>
        {/* 导航 */}
        <Nav bgColor='#fafbfd' index={2} border={{borderBottom:'1px solid rgba(100,107,118,.12)'}}/>
        {/* 内容 */}
        <div className={css.content}>
          <title>订单详情</title>
          {/* 类型显示 */}
          <div className={css.type}>
            <div className={css.currentType} style={type=='company'?{}:hidden}>企业版</div>
            <div className={css.currentType} style={type=='person'?{}:hidden}>个人版</div>
          </div>
          {/* 订单信息 */}
          <div className={css.orderDescribe} style={hidden}>
            订单号：CN2018070501      订单生成时间 ：2018-07-05
          </div>
          {/* 年费部分 */}
          <section className={css.annual} style={{display:'none'}}>
            <span className={css.tag}>套件年费</span>
            <div>
              <span>999/年</span>
              <div className={css.numberSelect}>
                <input type="text"/>
              </div>
            </div>
          </section>
          {/* 点数部分 */}
          <section className={css.point}>
            {/* 点数选择 */}
            <div>
              <span className={css.tag}>充值点数</span>
              <div className={css.pointDetail}>
                <div className={css.pointList}>
                  {pointList.map((item, index) => (
                    <div className={css.pointItem} onClick={this.selectPoint.bind(this, index)}
                      id={index==pointIndex?css.select:''} key={index}>
                      <div>{item.price} 元</div>
                      <div>{item.count} 点</div>
                      <div style={discountStyle} 
                        className={item.discount?css.discount:css.hidden + ' ' + css.discount}>
                        <div>{item.discount}</div>
                      </div>
                      
                    </div>
                  ))}
                </div>
                <span className={css.pointPriceCount}>{pointIndex==-1?0:pointList[pointIndex].price} 元</span>
              </div>
            </div>
            {/* 计费描述 */}
            <div className={css.pointDescribe}>
              <ul>
                <li>
                  <span>计费：每500字文字检索</span>
                  <span>扣点  3</span>
                </li>
                <li>
                  <span>&emsp;&emsp;&emsp;每一张图片检索（含word/excel中的图片）</span>
                  <span>扣点  8</span>
                </li>
              </ul>
            </div>
          </section>
          {/* 发票部分 */}
          <section className={css.invoice}>
              <span className={css.tag}>发票信息</span>
              <div className={css.invoiceDetail}>
                  {/* 发票类型 */}
                  <div>
                    <TypeSelect name='公司' select={this.selectClassify.bind(this, 'company')} isSelect={invoiceClassify=='company'}/>
                    <TypeSelect name='个人' select={this.selectClassify.bind(this, 'person')} isSelect={invoiceClassify=='person'}/>
                  </div>
                  <div>
                    <TypeSelect name='普通发票' select={this.selectType.bind(this, 'paper')} isSelect={invoiceType=='paper'}/>
                    <TypeSelect name='电子发票' select={this.selectType.bind(this, 'electronic')} isSelect={invoiceType=='electronic'}/>
                  </div>
                  <input type="text" value={invoiceTitle} placeholder='发票抬头' 
                    style={invoiceClassify=='company'?{}:hidden} onChange={this.input.bind(this, 'invoiceTitle')}/>
                  <div style={invoiceClassify=='company'?{}:hidden}>
                    <input type="text" value={invoiceId} placeholder='纳税人识别号' onChange={this.input.bind(this, 'invoiceId')}/>
                    <span>开企业抬头发票须填写纳税人识别号，以免影响报销</span>
                  </div>
                  {/* 邮寄地址 */}
                  <div style={invoiceType=='paper'?{}:hidden}>邮寄地址</div>
                  <input type="text" value={address} placeholder='地址' 
                    style={invoiceType=='paper'?{}:hidden} onChange={this.input.bind(this, 'address')}/>
                  <div style={invoiceType=='paper'?{}:hidden}>
                    <input type="text" value={name} placeholder='收件人' onChange={this.input.bind(this, 'name')}/>
                    <input type="text" value={photo} placeholder='手机号' onChange={this.input.bind(this, 'photo')}/>
                  </div>
                  <input type="text" value={code} placeholder='邮编（选填）' 
                    style={invoiceType=='paper'?{}:hidden} onChange={this.input.bind(this, 'code')}/>
                   {/* 邮箱地址 */}
                   <div style={invoiceType=='electronic'?{}:hidden}>邮箱地址</div>
                    <input type="text" value={email} placeholder='邮箱地址' 
                    style={invoiceType=='electronic'?{}:hidden} onChange={this.input.bind(this, 'email')}/>
                  <div></div>
              </div>
            
            
            
          </section>
          {/* 支付方式 */}
          <section className={css.pay}>
            <span className={css.tag}>支付方式</span>
            <div className={css.payDetail}>
              <TypeSelect name='支付宝' select={this.selectPay.bind(this, 'ali')} isSelect={pay=='ali'}/>
            </div>
          </section>
          {/* 提交信息 */}
          <section className={css.total}>
            <div>合计：<span>{price}元</span></div>
            <div>点击确认，即表示您确认已同意我们的使用条款，隐私政策和许可协议。</div>
            <div onClick={this.next.bind(this, 2)}>确认订单</div>
          </section>
        </div>
        {/* 页脚 */}
        <Footer/>
      </div>
    )
  }

  getType() {
    let type = 'person'
    if (window.location.search.indexOf('company') !== -1) return 'company'
    else return 'person'
  }

  selectPoint(pointIndex) {
    if (pointIndex == this.state.pointIndex) {
      this.setState({pointIndex: -1}, () => {
        this.setState({price: this.countPrice()})
      })
    }
    else this.setState({pointIndex}, () => {
      this.setState({price: this.countPrice()})
    })
  }

  countPrice() {
    let { annualCount, pointIndex } = this.state
    let annualPrice = 0, pointPrice = 0
    if (annualCount > 0 )annualPrice = annualCount * 999
    if (pointIndex !== -1) pointPrice = pointList[pointIndex].price
    return annualPrice + pointPrice
  }

  selectClassify(invoiceClassify) {
    this.setState({ invoiceClassify })
  }

  selectType(invoiceType) {
    this.setState({ invoiceType })
  }

  input(type, event) {
    this.setState({[type]: event.target.value})
  }

  selectPay() {

  }

  next(step) {
    console.log(this.state.price)
    if (this.state.price == 0) return
    this.setState({ step })
  }

  getAddress() {
    let { address, name, photo} = this.state
    if (this.state.invoiceType == 'electronic') return '电子发票'
    else return `${address} ${name} ${photo}`
  }

  pay() {
    
  }
}

class TypeSelect extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    let { isSelect, name, select } = this.props
    let hidden = { display: 'none'}
    return (
      <div className={css.selectItem}>
        <img style={isSelect?hidden:{}} src={require('Image3/99.png')} onClick={this.select.bind(this)}/>
        <img style={isSelect?{}:hidden} src={require('Image3/99-2.png')} onClick={this.select.bind(this)}/>
        <span>{name}</span>
      </div>
    )
  }
  
  select() {
    this.props.select()
  }
}

const pointList = [
  {price: 50, count: '5,000'},
  {price: 98, count: '10,000', discount: '9.8折'},
  {price: 180, count: '20,000', discount: '9折'},
  {price: 350, count: '40,000', discount: '8.8折'},
  {price: 999, count: '120,000', discount: '8.3折'},
]

const mapStateToProps = state => {
  return {
    view: state.view
  }
}

module.exports = connect(mapStateToProps)(Pay)