import React, {Component} from 'react'
import PropTypes from 'prop-types'

class ShelfItem extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    editing: PropTypes.bool.isRequired,
    item: PropTypes.object.isRequired,
    idx: PropTypes.number.isRequired,
    toggleCheck: PropTypes.func.isRequired
  }

  //点击右侧时，判断时候在编辑状态，不是则跳转到书籍详情，是则选中元素进行删除
  redirect = (idx, state) => {
    if (this.props.editing) {
      this.props.toggleCheck(idx, state)
    } else {
      this.context.router.push(`/bookdetail/${this.props.item.id}`)
    }
  }

  //点击按钮切换选中状态
  toggleCheck = (idx, state) => {
    this.props.toggleCheck(idx, state)
  }

  render() {
    const {item} = this.props
    return (
      <div className={`shelf-item ${item.checked && 'hover'}`}>
        {this.props.editing &&
        <div className="edit">
          <label className="label-checkbox">
            {/*通过item.checked的状态判断是否添加checked class，控制选中的样式*/}
            <input type="checkbox" className={`edit-btn ${item.checked && 'checked'}`}/>
            <span className="checkbox-wrap" onClick={this.toggleCheck.bind(this, this.props.idx, !item.checked)}>
              <span className="checkbox"></span>
            </span>
          </label>
        </div>}
        <img src={item.images} alt=""/>
        <div className="shelf-detail" onClick={this.redirect.bind(this,this.props.idx, !item.checked)}>
          <p className="title"><span>{item.name}</span><span>立即阅读<i className="iconfont icon-fanhui"></i></span></p>
          <p><i className="iconfont icon-yonghu"></i>{item.author}</p>
          <p>{item.recent ? `阅读至 ${item.recent}` : '未阅读'}</p>
        </div>
      </div>
    )
  }
}

export default ShelfItem