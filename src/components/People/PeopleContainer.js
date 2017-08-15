import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as peopleActions from '../../actions/actions'

import PersonInput from './PersonInput'
import PersonList from './PersonList'

class PeopleContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      people: []
    }
  }
  
  componentDidMount() {
    console.log(this.props)
  }

  render() {
    const {people} = this.props
    return (
      <div>
        <PersonInput addPerson={this.props.actions.addPerson}/>
        <PersonList people={people}/>
      </div>
    )
  }
}

PeopleContainer.propTypes = {
  people:PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state, props) {
  return {
    people: state.people
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(peopleActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PeopleContainer)