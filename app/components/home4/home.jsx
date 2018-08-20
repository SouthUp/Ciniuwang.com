import React from 'react'
import { connect } from 'react-redux'
import css from 'Css2/search'


class Home extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    let { width, height, user } = this.props.view
    let isLogin = false
    if (user) isLogin = true
    return (
      <div>
      
      </div>
    )
  }
}



const mapStateToProps = state => {
  return {
    view: state.view
  }
}

export default connect(mapStateToProps)(Home)