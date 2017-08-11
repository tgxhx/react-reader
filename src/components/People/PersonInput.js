import React, {Component} from 'react'
import PropTypes from 'prop-types'

class PersonInput extends Component {
  constructor(props) {
    super(props)

    this.onAddPersonClick = this.onAddPersonClick.bind(this)
  }

  onAddPersonClick() {
    const first = document.getElementById('firstname')
    const last = document.getElementById('lastname')

    this.props.addPerson({
      firstname: first.value,
      lastname: last.value
    })

    first.value = ''
    last.value = ''

    first.focus()
  }

  componentDidMount() {
    document.getElementById('firstname').focus()
    console.log(this.props)
  }
  
  render() {
    return (
      <div>
        <input type="text" id="firstname" placeholder="First Name"/>
        <input type="text" id="lastname" placeholder="Last Name"/>
        <button onClick={this.onAddPersonClick}>Add Person</button>
      </div>
    )
  }
}

PersonInput.propTypes = {
  addPerson: PropTypes.func.isRequired
}

export default PersonInput