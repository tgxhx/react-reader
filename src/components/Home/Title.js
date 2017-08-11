import React from 'react'
import PropTypes from 'prop-types'

const Title = (props) =>
  <div className="title">
    <h3>{props.title}</h3>
  </div>

Title.propTypes = {
  title: PropTypes.string.isRequired
}

export default Title