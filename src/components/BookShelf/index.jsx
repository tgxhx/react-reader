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
      editing: false,
      shelfList: [],
      delNum: 0
    }
  }

  static contextTypes = {
    router: PropTypes.object
  }

  componentWillMount() {
    if (localEvent.StorageGetter('bookShelf')) {
      this.setState({
        shelfList: localEvent.StorageGetter('bookShelf')
      })
    }
  }

  toggleEdit = () => {
    this.setState(prevState => ({
      editing: !prevState.editing
    }))
  }

  toggleCheck = (idx, state) => {
    const shelfList = this.state.shelfList
    shelfList[idx].checked = state
    this.setState({shelfList}, () => {
      this.setState({
        delNum: this.state.shelfList.filter(item => item.checked).length
      })
      console.log(this.state.shelfList.filter(item => item.checked).length)
    })
  }

  //全选
  checkAll = () => {
    let shelfList = this.state.shelfList
    shelfList = shelfList.map(item => ({...item,checked:true}))
    this.setState({shelfList}, () => {
      this.setState({
        delNum: this.state.shelfList.filter(item => item.checked).length
      })
    })
  }

  deleteBook = () => {
    let shelfList = this.state.shelfList
    shelfList = shelfList.filter(item => !item.checked)
    console.log(shelfList)
    this.setState({shelfList, delNum: 0}, () => {
      localEvent.StorageSetter('bookShelf', this.state.shelfList)
    })
  }

  render() {
    const {editing,delNum} = this.state
    return (
      <div className="shelf">
        <header>
          {editing ? <span className="checkAll" onClick={this.checkAll}>全选</span> :
            <i className="iconfont icon-fanhui" onClick={() => this.context.router.goBack()}></i>}
          <span onClick={this.toggleEdit}>{editing ? '取消' : '编辑'}</span>
        </header>
        <div className="shelf-content">
          {this.state.shelfList.map((item, idx) =>
            <ShelfItem editing={editing} key={idx} item={item} idx={idx} toggleCheck={this.toggleCheck}/>
          )}
        </div>
        {editing && <footer>
          <div className="delete" onClick={this.deleteBook}><i className="iconfont icon-shanchu"></i>删除{delNum ? `(${delNum})`: ''}</div>
        </footer>}
      </div>
    )
  }
}
