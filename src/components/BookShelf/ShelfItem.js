import React, {Component} from 'react'
import PropTypes from 'prop-types'

class ShelfItem extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    editing: PropTypes.bool.isRequired
  }

  selectItem = () => {
    console.log('select')
  }

  redirect = () => {
    if (this.props.editing) {
        this.selectItem()
    } else {
      console.log('redirect')
    }
  }

  render() {
    return (
      <div className="shelf-item">
        {this.props.editing &&
        <div className="edit">
          <label className="label-checkbox">
            <input type="checkbox" className="edit-btn"/>
            <span className="checkbox"></span>
          </label>
        </div>}
        <img src="http://qidian.qpic.cn/qdbimg/349573/1002959239/150" alt=""/>
        <div className="shelf-detail" onClick={this.redirect}>
          <p className="title"><span>超级怪兽工厂</span><span>立即阅读<i className="iconfont icon-fanhui"></i></span></p>
          <p><i className="iconfont icon-yonghu"></i>匣中藏剑</p>
          <p>阅读至 七百八十六章</p>
        </div>
      </div>
    )
  }
}

export default ShelfItem