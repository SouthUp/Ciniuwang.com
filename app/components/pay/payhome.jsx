import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import css from 'Css2/payhome'
import Nav from '../common/navigation2'
import Footer from '../common/footer'

class payHome extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    let discountStyle={ backgroundImage: `url(${require('Image3/60.png')})` }
    return (
      <div>
        <Nav index={2} />
        <div className={css.wrap}>
          <div className={css.connect}>
            <button>联系销售人员</button>
          </div>
          <div className={css.line} />
          <div className={css.content}>
            <title>一个价格合理的生产力工具，为您带来不可思议的价值</title>
            {/* 标题 */}
            <div className={css.subtitle}>
              <span>充值及收费标准</span>
              <span>(新用户注册即送200点)</span>
            </div>
            {/* 列表 */}
            <div className={css.pointList}>
              {pointList.map((item, index) => (
                <div className={css.pointItem} key={index}>
                  <div>{item.price} 元</div>
                  <div>{item.count} 点</div>
                  <div style={discountStyle}
                    className={item.discount ? css.discount : css.hidden + ' ' + css.discount}>
                    <div>{item.discount}</div>
                  </div>

                </div>
              ))}
            </div>
            {/* 计费描述 */}
            <div className={css.describe}>注:当前为推广活动期间，文字检索不收费，图片检索每一张消耗8点</div>
            {/* 分类 */}
            <div className={css.type}>
              
              {/* 个人版 */}
              <div className={css.person}>
                <title>
                  个人版
                </title>
                {/* 价格 */}
                <div className={css.price}>
                  客户端免费
                </div>
                {/* 试用 */}
                <div className={css.use}>
                  <a onClick={this.download.bind(this)} href={this.getUrl()}>立即免费试用</a>
                </div>
                 {/* 功能列表 */}
                 <ul className={css.list}>
                  {personList.map((item, index) => {
                    return (
                      <li key={index}>{item}</li>
                    )
                  })}
                </ul>
                {/* 购买按钮 */}
                <div className={css.buy}>
                  <Link to='/pay?type=person'><span>立即充值</span></Link>
                </div>
              </div>

              {/* 企业版 */}
              <div className={css.company}>
                <title>企业版</title>
                {/* 价格 */}
                <div className={css.price}>
                  999元/年
                  <span className={css.special}>(限免)</span>
                </div>
                {/* 试用 */}
                <div className={css.use + ' ' + css.disable}>
                  <a>免费试用</a>
                </div>
                {/* 功能列表 */}
                <ul className={css.list}>
                  {companyList.map((item, index) => {
                    return (
                      <li key={index}>{item}</li>
                    )
                  })}
                </ul>
                {/* 购买按钮 */}
                <div className={css.buy + ' ' + css.disable}>
                  <span>立即购买</span>
                </div>
              </div>
              
            </div>
          </div>

        </div>
        <Footer />
      </div>
    )
  }

  download() {
    window.__bl && __bl.sum('download-pay', 1)
    _hmt.push(['_trackEvent', 'download', 'click', this.props.view.query])
  }

  getUrl() {
    let query = this.props.view.query
    let url = 'http://www.ciniuwang.com/files'
    let sale = ''
    if (query) {
      let vars = query.split('&')
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=")
        if (pair[0] == 'id') sale = pair[1]
      }
    }

    if (sale && ['cnsa1', 'cnsa2', 'cnsa3'].includes(sale) ) url += `/${sale}`

    url += '/词牛客户端.zip'

    return url
  }
}

const pointList = [
  { price: 50, count: '5,000' },
  { price: 98, count: '10,000', discount: '9.8折' },
  { price: 180, count: '20,000', discount: '9折' },
  { price: 350, count: '40,000', discount: '8.8折' },
  { price: 999, count: '120,000', discount: '8.3折' },
]

const companyList = [
  'word违禁词插件 - 实时检索文字和图片中的违禁词',
  'excel违禁插件 - 实时检索文字和图片中的违禁词',
  '违禁词字典 - 违禁词随手查',
  '违禁词批量检查工具 - 批量检索word、excel、jpg图片、png图片中的违禁词',
  '企业组织结构设立',
  '自建企业自己的违禁词词库',
  '词牛词库（大数据AI支持）',
  '企业汇总报表'
]

const personList = [
  'word违禁词插件 - 实时检索文字和图片中的违禁词',
  'excel违禁插件 - 实时检索文字和图片中的违禁词',
  '违禁词字典 - 违禁词随手查',
  '违禁词批量检查工具 - 批量检索word、excel、jpg图片、png图片中的违禁词'
]

var mapStateToProps = state => {
  return {
    view: state.view
  }
}

export default connect(mapStateToProps)(payHome)
