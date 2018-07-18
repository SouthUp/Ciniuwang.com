const defaultState = {
  width : document.body.clientWidth - 18,
  height : document.body.clientHeight > 500? document.body.clientHeight: 500,
  scrollTop: 0,
  user: null,
  query: ''
}

const viewState = (state = defaultState, action) => {
  switch(action.type) {
    case 'SET_SIZE':
      let minHeight = action.height > 500?action.height:500
      return Object.assign({}, state, {
        width: action.width,
        height: minHeight
      })
    case 'SET_SCROLL':
      return Object.assign({}, state, {
        scrollTop: action.scrollTop
      })
    case 'SET_USER':
      return Object.assign({}, state, {
        user: action.user
      })
    
    case 'UPDATE_USER':
      let newUser = Object.assign({}, state.user, action.user)
      return Object.assign({}, state, {
        user: newUser
      })
    case 'LOGIN_OUT':
      return Object.assign({}, state, {
        user: null
      })

    case 'SET_QUERY':
      return Object.assign({}, state, {
        query: action.query
      })
    default:
      return state
  }
}

export default viewState