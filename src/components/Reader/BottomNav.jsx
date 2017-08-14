import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from '../../actions/people-actions'

class BottomNav extends Component {

  //切换字体面板
  showFontPanel() {
    this.props.actions.showFontPanel(!this.props.font_panel)
  }

  //切换夜间模式
  switchNight() {
    this.props.actions.switchNight(!this.props.bg_night)
  }

  //打开目录列表
  showListPanel() {
    this.props.actions.showListPanel(true)
    //同时隐藏字体面板
    this.props.actions.showFontPanel(false)
  }

  render() {
    return (
      <div className="bottom-nav">
        <div className="item menu-button" onClick={this.showListPanel.bind(this)}>
          <span className="icon-text">
            <i className="iconfont icon-menu"></i>
            目录
          </span>
        </div>
        <div className="item" id="font-button" onClick={this.showFontPanel.bind(this)}>
          <span className={`icon-text ${this.props.font_panel ? 'active': ''}`}>
            <i className="iconfont icon-font"></i>
            字体
          </span>
        </div>
        <div className="item" id="night-button" onClick={this.switchNight.bind(this)}>
          {this.props.bg_night ?
            <span className="icon-text">
            <i className="iconfont icon-menu"></i>
              白天
            </span>
            :
            <span className="icon-text">
            <i className="iconfont icon-night"></i>
            夜间
            </span>
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  font_panel: state.font_panel,
  bg_night: state.bg_night
})

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BottomNav)
