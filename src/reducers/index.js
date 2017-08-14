import {combineReducers} from 'redux'
import people from './people-reducer'
import counter from './counter'

import * as types from '../actions/action-types'

import initState from './state'

//请求地址
const api = (state = initState.api) => {
  return state
}

//字体修改
const fz_size = (state = initState.fz_size, action) => {
  switch (action.type) {
    case types.FZ_SIZE_ADD:
      return state >= 24 ? 24 : state + 1
    case types.FZ_SIZE_SUB:
      return state <= 14 ? 14 : state - 1
    case types.FZ_SIZE_MODIRY:
      return action.fz_size
    default:
      return state
  }
}

//章节修改
const curChapter = (state = initState.curChapter, action) => {
  switch (action.type) {
    case types.NEXT_CHAPTER:
      return state >= action.max ? action.max : state + 1
    case types.PREV_CHAPTER:
      return state <= 0 ? 0 : state - 1
    case types.CUR_CHAPTER:
      return action.num
    default:
      return state
  }
}

//更换背景
const bg_color = (state = initState.bg_color, action) => {
  switch (action.type) {
    case types.CHANGE_BG:
      return action.num
    default:
      return state
  }
}

//切换字体面板
const font_panel = (state = initState.font_panel, action) => {
  switch (action.type) {
    case types.SHOW_FONT_PANEL:
      return action.state
    default:
      return state
  }
}

const bg_night = (state = initState.bg_night, action) => {
  switch (action.type) {
    case types.SWITCH_NIGHT:
      return action.state
    default:
      return state
  }
}

//目录
const list_panel = (state = initState.list_panel, action) => {
  switch (action.type) {
    case types.SHOW_LIST_PANEL:
      return action.state
    default:
      return state
  }
}

const rootReducer = combineReducers({
  people,
  counter,
  api,
  fz_size,
  curChapter,
  bg_color,
  font_panel,
  bg_night,
  list_panel
})

export default rootReducer