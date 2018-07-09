import React from 'react'
import css from 'Css2/product'
import Nav from '../common/navigation'
import Footer from '../common/footer'

class Product extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    // console.log(this.props.view)
    // let { width, height } = this.props.view
    // let videoStyle = width/height > 1920/1080? {width: '100%'}: {height: '100%'}
    return (
      <div className={css.wrap}>
        <Nav index={1}/>
        <div className={css.content}>
          {list.map((item, index) => {
            return (
              <div key={index} className={css.part}>
                <title>{item.title}</title>
                <video src={item.url} controls/>
              </div>
            )
          })}
        </div>
        <Footer/>
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