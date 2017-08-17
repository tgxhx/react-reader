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
      editing: false, //编辑状态
      shelfList: [], //保存书架中书籍列表
      delNum: 0 //删除按钮上的删除数字
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

  //切换编辑状态
  toggleEdit = () => {
    this.setState(prevState => ({
      editing: !prevState.editing
    }))
  }

  //编辑状态下，选择时触发，给点击的元素的checked属性设为true，并获取被选中的数量
  toggleCheck = (idx, state) => {
    const shelfList = this.state.shelfList
    shelfList[idx].checked = state
    this.setState({shelfList}, () => {
      this.setState({
        delNum: this.state.shelfList.filter(item => item.checked).length
      })
    })
  }

  //全选，给shelfList的所有元素的checked设为true，再获取数组的长度
  checkAll = () => {
    let shelfList = this.state.shelfList
    shelfList = shelfList.map(item => ({...item,checked:true}))
    this.setState({shelfList}, () => {
      this.setState({
        delNum: this.state.shelfList.length
      })
    })
  }

  //通过filter，过滤掉checked属性为true的元素，达到删除的效果，并保存到localStorage中
  deleteBook = () => {
    let shelfList = this.state.shelfList
    shelfList = shelfList.filter(item => !item.checked)
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
