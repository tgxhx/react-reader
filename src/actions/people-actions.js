import * as types from './action-types'

export const addPerson = (person) => {
  return {
    type: types.ADD_PERSON,
    person
  }
}

export const increment = (counter) => {
  return {
    type: types.INCREMENT,
    counter
  }
}

export const decrement = (counter) => {
  return {
    type: types.DECRMENT,
    counter
  }
}

export const fzSizeAdd = fz_size => ({type: types.FZ_SIZE_ADD, fz_size})

export const fzSizeSub = fz_size => ({type: types.FZ_SIZE_SUB, fz_size})

export const fzSizeModify = fz_size => ({type: types.FZ_SIZE_MODIRY, fz_size})

export const nextChapter = (curChapter, max) => ({type: types.NEXT_CHAPTER, curChapter, max})

export const prevChapter = curChapter => ({type: types.PREV_CHAPTER, curChapter})

export const curChapter = num => ({type: types.CUR_CHAPTER, num})

export const changeBG = num => ({type: types.CHANGE_BG, num})

export const showFontPanel = state => ({type: types.SHOW_FONT_PANEL, state})

export const switchNight = state => ({type: types.SWITCH_NIGHT, state})

export const showListPanel = state => ({type: types.SHOW_LIST_PANEL, state})