import React, {Component} from 'react'
import PropTypes from 'prop-types'

class Cover extends Component {
  static propTypes = {
    showListPanel: PropTypes.func.isRequired,
    list_panel: PropTypes.bool.isRequired
  }

  hideListPanel = () => {
    this.props.showListPanel(false)
  }

  render() {
    const cover = {
        position: 'fixed',
        top: '0',
        left: '0',
        bottom: '0',
        right: '0',
        opacity: '1',
        zIndex: '10',
        backgroundColor: 'rgba(0,0,0,.5)',
        transition: 'all .5s'
      },
      hide = {
        position: 'static',
        opacity: '0'
      }
    return (
      <div
        style={this.props.list_panel ? cover :Object.assign(cover, hide)}
        onClick={this.hideListPanel}></div>
    )
  }
}

export default Cover
