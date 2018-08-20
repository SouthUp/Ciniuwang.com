import React from 'react'
import css from 'Css2/product'

class Product extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <div className={css.wrap}>
        <div className={css.content}>
        <title>词牛是国内领先的违禁词检查软件，致力于为广大电商从业伙伴与内容创作者们持续赋能</title>
          {list.map((item, index) => {
            return (
              <div key={index} className={css.part}>
                <title>{item.title}</title>
                <video src={item.url} autoPlay loop/>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

const list = [
  { title: '实时检索输入的违禁词', url: require('Video/1.mp4')},
  { title: '一键检查文字与图片中所包含的违禁词', url: require('Video/2.mp4')},
  { title: '批量检索', url: require('Video/3.mp4')},
  { title: '查词与查句', url: require('Video/4.mp4')},
]


export default Product