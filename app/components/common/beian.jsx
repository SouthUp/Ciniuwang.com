import React from 'react'
import { connect } from 'react-redux'
import common from 'Css2/common'

class ICP extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <a className={common.beian}>
        沪ICP备18021028号-1
      </a>
    )
  }

}

var mapStateToProps = state => {
  return {
    view: state.view
  }
}

export default connect(mapStateToProps)(ICP)