import React, {Component} from 'react'
import PropTypes from 'prop-types'

class TopNav extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  goBack = () => {
    this.context.router.goBack()
  }

  render() {
    return (
      <div className="top-nav">
        <i className="iconfont icon-back" onClick={this.goBack}></i>
        <div className="nav-title">返回</div>
      </div>
    )
  }
}

export default TopNav