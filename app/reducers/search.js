const defaultState = {
  word: '',
  toggle: true,
  loading: false,
  data: null
}

const search = (state = defaultState, action) => {
  switch (action.type) {
    case 'INPUT_SEARCH':
      return Object.assign({}, state, { word: action.word })

    case 'TOGGLE_SEARCH':
      return Object.assign({}, state, { toggle: action.toggle })

    case 'LOADING':
      return Object.assign({}, state, { loading: action.loading, data: null})
    
    case 'SET_DATA':
      return Object.assign({}, state, { loading: false, data: action.data})

    case 'CLEAR':
      return defaultState

    default:
      return state
  }
}

export default search