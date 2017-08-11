import * as types from '../actions/action-types'

const initialState = {
  count: 0,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.INCREMENT:
      return {
        ...state,
        count: state.count < 10 ? state.count + 1 : 10,
      }
    case types.DECRMENT:
      return {
        ...state,
        count: state.count > 0 ? state.count - 1 : 0
      }
    default:
      return state
  }
}
