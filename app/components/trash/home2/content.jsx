import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import store from '../../store/store'
import Action from '../../action/action'
import css from 'Css2/home'

class Content extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    let infor = this.props.infor
    let { title, subTitle, img, backgroundColor, mainColor, subColor, marginLeft } = infor
    let { width, height } = this.props.view
    return (
      <div className={css.contentFrame} style={{backgroundColor}}>
        <div className={css.contentTitle}>
          <div dangerouslySetInnerHTML={{__html: title}} style={{color: mainColor}}/>
          <div dangerouslySetInnerHTML={{__html: subTitle}} style={{color: subColor}}/>
        </div>
        <img src={img} alt="" style={{marginLeft}}/>
      </div>
    )
  }

}

var mapStateToProps = state => {
  return {
    view: state.view
  }
}

export default connect(mapStateToProps)(Content)