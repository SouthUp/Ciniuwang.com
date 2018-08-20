const defaultState = {
  word: '',
  toggle: true
}

const search = (state = defaultState, action) => {
  switch (action.type) {
    case 'INPUT_SEARCH':
      return Object.assign({}, state, { word: action.word })

    case 'TOGGLE_SEARCH':
      return Object.assign({}, state, { toggle: action.toggle })

    default:
      return state
  }
}

export default search