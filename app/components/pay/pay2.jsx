import React from 'react'
import { connect } from 'react-redux'
import { Link, Route } from 'react-router-dom'
import store from '../../store/store'
import Action from '../../action/action'
import css from 'Css2/pay2'
import common from 'Css2/common'
import Snackbar from '../common/snackbar'
import Nav from '../common/navigation'
import Footer from '../common/footer'
var $ = require('jquery')

class Pay extends React.Component {
  constructor() {
    super()
    this.state = {
      annualCount: 1,
      pointIndex: 0,
    }
  }

  render() {
    let { annualCount, pointIndex } = this.state
    let discountStyle={ backgroundImage: `url(${require('Image3/60.png')})` }
    return (
      <div>
        {/* 导航 */}
        <Nav bgColor='#fafbfd'/>
        {/* 内容 */}
        <div className={css.content}>
          <title>订单详情</title>
          {/* 类型显示 */}
          <div className={css.type}>
            <div className={css.currentType}>企业版</div>
          </div>
          {/* 订单信息 */}
          <div className={css.orderDescribe}>
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
                    <div className={css.pointItem} onClick={this.select.bind(this, index)}
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
                  <span></span>
                </li>
              </ul>
            </div>
          </section>
          {/* 发票部分 */}
          {/* 支付方式 */}
          {/* 提交信息 */}
        </div>
        {/* 页脚 */}
        <Footer/>
      </div>
    )
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

  countPrice() {

  }
}

const pointList = [
  {price: 50, count: '5,000'},
  {price: 98, count: '10,000', discount: '9.8折'},
  {price: 180, count: '20,000', discount: '9折'},
  {price: 350, count: '40,000', discount: '8.8折'},
  {price: 999, count: '120,000', discount: '8.3折'},
]

module.exports = Pay