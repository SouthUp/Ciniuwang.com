import React from 'react'
import css from 'Css2/snackbar'

class SnackBar extends React.Component {
  constructor() {
    super()
    this.state = {
      toggle: false,
      time: null
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.text) {
      clearTimeout(this.time)
      this.setState({
        text: nextProps.text,
        toggle: true
      }, () => {
        this.time = setTimeout(() => {
          this.props.clearText()
        },3000)
      })
    } else {
      this.setState({toggle: false, text: nextProps.text})
    }
  }

  render() {
    let style = this.state.toggle? {transform: 'translate(0px, 0px)'}: {transform: 'translate(0px, 90px)'}
    return (
      <div className={css.snackbarFrame} style={style}>
        {this.props.text}
      </div>
    )
  }
}

export default SnackBar 