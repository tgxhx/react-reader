import React from 'react'
import PropTypes from 'prop-types'
import Title from './Title'
import {Link} from 'react-router'

const Recommend = (props) =>
  <div className="recommend">
    <Title title={props.title}/>
    <div className="list">
      <ul className="list-ul">
        {props.booklist.map((item, idx) =>
          <li key={idx} className="list-li">
            <Link to={`/bookdetail/${item.id}`}>
              <img src={item.images} alt=""/>
              <p className="book-name">{item.name}</p>
              <p className="book-author">{item.author}</p>
            </Link>
          </li>
        )}
      </ul>
    </div>
  </div>

Title.propTypes = {
  booklist: PropTypes.array, //加上isRequired会报错
  title: PropTypes.string.isRequired
}

export default Recommend