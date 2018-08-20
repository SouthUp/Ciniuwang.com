import { combineReducers } from 'redux'
import view from './view'
import tutorial from './tutorial'
import search from './search'

const reducer = combineReducers({
  view, tutorial, search
})

export default reducer