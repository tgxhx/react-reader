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

export const fzSizeAdd = (fz_size) => {
  return {
    type: types.FZ_SIZE_ADD,
    fz_size
  }
}

export const fzSizeSub = (fz_size) => {
  return {
    type: types.FZ_SIZE_SUB,
    fz_size
  }
}

export const fzSizeModify = (fz_size) => {
  return {
    type: types.FZ_SIZE_MODIRY,
    fz_size
  }
}

export const nextChapter = (curChapter, max) => {
  return {
    type: types.NEXT_CHAPTER,
    curChapter,
    max
  }
}

export const prevChapter = (curChapter) => {
  return {
    type: types.PREV_CHAPTER,
    curChapter
  }
}

export const curChapter = (num) => {
  return {
    type: types.CUR_CHAPTER,
    num
  }
}

export const changeBG = (num) => {
  return {
    type: types.CHANGE_BG,
    num
  }
}

export const showFontPanel = (state) => {
  return {
    type: types.SHOW_FONT_PANEL,
    state
  }
}

export const switchNight = (state) => {
  return {
    type: types.SWITCH_NIGHT,
    state
  }
}