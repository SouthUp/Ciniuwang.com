import React from 'react'
import { connect } from 'react-redux'
import Snackbar from '../common/snackbar'
import css from 'Css2/search'
import store from '../../store/store'
import action from '../../action/action'
var $ = require('jquery')

class Search extends React.Component {
  constructor() {
    super()
    this.state = {
      text: ''
    }
  }

  render() {
    let { word, data } = this.props.search
    let { style } = this.props
    return (
      <div className={data?css.withData:null}>
        <div className={css.frame}>
          <img onClick={this.clear.bind(this)} style={style || {}} src={require('Image3/logo-3.png')} alt="" />
          <input type="text" placeholder='支持筛查6个字以内的违禁词'
            onChange={this.input.bind(this)} value={word} onKeyPress={this.key.bind(this)} />
          <span onClick={this.search.bind(this)}>筛查</span>

        </div>
        <Snackbar text={this.state.text} clearText={this.clearText.bind(this)} />
      </div>
    )
  }

  input(e) {
    store.dispatch(action.inputSearch(e.target.value))
  }

  key(e) {
    if (e.nativeEvent.keyCode == 13) {
      this.search()
    }
  }

  search() {
    let { word, loading } = this.props.search
    if (word.length > 6) return this.setState({ text: '在线查词只支持六字以内' })
    if (word.length == 0) return store.dispatch(action.clear())

    if (loading) return
    store.dispatch(action.toggeleSearch(false))
    store.dispatch(action.loading(true))
    $.ajax({
      type: 'POST',
      url: 'https://ciniu.leanapp.cn/v1.0/words/freeQuery',
      dataType: 'json',
      data: { word: this.props.search.word },
      success: (res) => {
        store.dispatch(action.setData(res))
      },
      error: err => {
        console.log(err)
        store.dispatch(action.loading(false))
        this.setState({ text: err.message })

      }
    })
  }

  clearText() {
    this.setState({ text: '' })
  }

  clear() {
    store.dispatch(action.clear())
  }
}



const mapStateToProps = state => {
  return {
    search: state.search
  }
}

export default connect(mapStateToProps)(Search)