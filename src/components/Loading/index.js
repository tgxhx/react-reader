import React, {Component} from 'react'
import PropTypes from 'prop-types'

import './index.css'

class Loading extends Component {
  /*constructor(props) {
    super(props)
  }*/

  static defaultProps = {
    size: 50,
    stroke: 3.5,
    color: '#ed424b'
  }

  static propTypes = {
    size: PropTypes.number,
    stroke: PropTypes.number,
    color: PropTypes.string
  }

  loadingSize() {
    const newSize = this.props.size + 'px'
    return {
      width: newSize,
      height: newSize
    }
  }

  loadingColor() {
    return {
      stroke: this.props.color
    }
  }

  render() {
    const {size, stroke, color} = this.props
    return (
      <div className="loading-component">
        <svg className="spinner" style={{width:`${size}px`,height:`${size}px`}} viewBox="0 0 66 66"
             xmlns="http://www.w3.org/2000/svg">
          <circle className="path" style={{stroke: color}} fill="none" strokeWidth={stroke} strokeLinecap="round"
                  cx="33"
                  cy="33" r="30"></circle>
        </svg>
      </div>
    )
  }
}


export default Loading