import React, {Component} from 'react'
import PropTypes from 'prop-types'

class BottomNav extends Component {

  static propTypes = {
    font_panel: PropTypes.bool.isRequired,
    bg_night: PropTypes.bool.isRequired,
    showFontPanel: PropTypes.func.isRequired,
    switchNight: PropTypes.func.isRequired,
    showListPanel: PropTypes.func.isRequired
  }

  //切换字体面板
  showFontPanel() {
    this.props.showFontPanel(!this.props.font_panel)
  }

  //切换夜间模式
  switchNight() {
    this.props.switchNight(!this.props.bg_night)
  }

  //打开目录列表
  showListPanel() {
    this.props.showListPanel(true)
    //同时隐藏字体面板
    this.props.showFontPanel(false)
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
            <i className="iconfont icon-day"></i>
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

export default BottomNav
