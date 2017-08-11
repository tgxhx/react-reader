import React from 'react'
import PropTypes from 'prop-types'
import Person from './Person'

const PeopleList = ({people}) => {
  return (
    <div>
      {people.map((person, idx) =>
        <Person key={idx} person={person}/>
      )}
    </div>
  )
}

PeopleList.propTypes = {
  people: PropTypes.array.isRequired
}

export default PeopleList