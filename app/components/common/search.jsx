import React from 'react'
import { connect } from 'react-redux'
import css from 'Css2/search'
import store from '../../store/store'
import action from '../../action/action'


class Search extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    console.log()
    let { word } = this.props.search
    return (
      <div className={css.frame}>
        <img src={require('Image3/logo-3.png')} alt=""/>
        <input type="text" placeholder='支持筛查6个字以内的违禁词'
          onChange={this.input.bind(this)} value={word} onKeyPress={this.key.bind(this)}/>
        <span onClick={this.search.bind(this)}>筛查</span>
      </div>
    )
  }

  input(e) {
    store.dispatch(action.inputSearch(e.target.value))
  }

  key(e){
    if (e.nativeEvent.keyCode == 13) {
      this.search()
    }
  }
 
  search() {
    store.dispatch(action.toggeleSearch(false))
  }
}



const mapStateToProps = state => {
  return {
    search: state.search
  }
}

export default connect(mapStateToProps)(Search)