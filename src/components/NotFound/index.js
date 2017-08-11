import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as peopleAction from '../../actions/people-actions'

import './style.css'

class NotFound extends Component  {
  /*constructor(props) {
    super(props)
  }*/

  componentDidMount() {
    console.log(this.props)
  }

  componentWillUpdate(props, state) {
    console.log(props.count)
    console.log(state)
  }

  componentDidUpdate(props, state) {
    console.log(props.count)
    console.log(state)
  }

  onClickAdd() {
    this.props.actions.increment(1)
  }

  onClickDec() {
    this.props.actions.decrement(-1)
  }


  render() {
    return (
      <div className='NotFound'>
        <h1>
          {this.props.count}
          <button onClick={this.onClickAdd.bind(this)}>+</button>
          <button onClick={this.onClickDec.bind(this)}>-</button>
        </h1>
      </div>
    )
  }
}

NotFound.propTypes = {
  count: PropTypes.number.isRequired,
}

function mapStateToProps(state) {
  return {
    count: state.counter.count,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(peopleAction, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotFound)