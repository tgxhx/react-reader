import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class Rating extends Component {
  static propTypes = {
    score: PropTypes.number
  }

  itemClasses() {
    let result = []
    let score = Math.floor(this.props.score * 2) / 2
    let hasDecimal = score % 1 !== 0
    let integer = Math.floor(score)
    for (var i = 0; i < integer; i++) {
      result.push('on')
    }
    if (hasDecimal) {
      result.push('half')
    }
    while (result.length < 5) {
      result.push('off')
    }
    return result
  }

  render() {
    return (
      <div className="rate-score">
        {this.itemClasses().map((item, idx) =>
          <span key={idx} className={`star-item ${item}`}></span>
        )}
        {this.props.score}
    </div>
    )
  }
}
