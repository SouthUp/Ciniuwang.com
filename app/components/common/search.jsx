import React from 'react'
import { connect } from 'react-redux'
import css from 'Css2/nav'
import { Link } from 'react-router-dom'


class Search extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    if (this.props.view.user) isLogin = true
    return (
      <div  style={wrapStyle}>
      
      </div>
    )
  }
}



const mapStateToProps = state => {
  return {
    view: state.view
  }
}

export default connect(mapStateToProps)(Search)