import React from 'react'
import { connect } from 'react-redux'
import Nav from '../common/navigation2'
import Search from '../common/search'
import css from 'Css2/search'
import store from '../../store/store'
import action from '../../action/action'


class Home extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  componentWillUnmount() {
    store.dispatch(action.toggeleSearch(true))
  }

  render() {
    let { width, height, user } = this.props.view
    let isLogin = false
    if (user) isLogin = true
    return (
      <div>
        <Nav index={0}/>
        <div className={css.content}>
          {this.props.search.toggle?<Search/>:null}
        </div>
        
      </div>
    )
  }
  
}



const mapStateToProps = state => {
  return {
    view: state.view,
    search: state.search
  }
}

export default connect(mapStateToProps)(Home)