import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import localEvent from '../../assets/js/local'

import ShelfItem from './ShelfItem'

import './index.css'

export default class BookShelf extends Component {
  constructor() {
    super()
    this.state = {
      editing: false
    }
  }

  toggleEdit = () => {
    this.setState(prevState => ({
      editing: !prevState.editing
    }))
  }

  render() {
    const {editing} = this.state
    return (
      <div className="shelf">
        <header>
          {editing ? <span>全选</span> :<i className="iconfont icon-fanhui"></i>}
          <span onClick={this.toggleEdit}>{editing ? '取消': '编辑'}</span>
        </header>
        <div className="shelf-content">
          <ShelfItem editing={editing}/>
          <ShelfItem editing={editing}/>
          <ShelfItem editing={editing}/>
          <ShelfItem editing={editing}/>
        </div>
        {editing && <footer><div className="delete"><i className="iconfont icon-shanchu"></i>删除(1)</div></footer>}
      </div>
    )
  }
}
