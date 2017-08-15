import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from '../../actions/actions'

import localEvent from '../../assets/js/local'

class FontNav extends Component {
  constructor() {
    super()
    this.state = {
      now_color: 0
    }
  }

  //改变字体
  addFz = () => {
    this.props.actions.fzSizeAdd()
  }

  subFz = () => {
    this.props.actions.fzSizeSub()
  }

  //更换背景
  changeColor = (index) => {
    this.setState({
      now_color: index
    })
    // this.$store.state.bg_color = index + 1
    this.props.actions.changeBG(index + 1)
    localEvent.StorageSetter('bg_color', index + 1)
  }

  render() {
    const items = []
    for (var i = 0; i < 6; i++) {
      items.push(<div
        className={`bk-container ${i === this.state.now_color ? 'bk-container-current' : ''}`}
        key={i}>
        <div className="color_btn" onClick={this.changeColor.bind(this, i)}></div>
      </div>)
    }
    return (
      <div className="top-nav-pannel font-container" id="font-container">
        <div className="child-mod">
          <span>字号</span>
          <button id="large-font" className="spe-button" onClick={this.addFz}>
            大
          </button>
          <button id="small-font" className="spe-button" onClick={this.subFz}>
            小
          </button>
        </div>
        <div className="child-mod" id="bk-container">
          <span>背景</span>
          {items}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  font_panel: state.font_panel
})

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FontNav)