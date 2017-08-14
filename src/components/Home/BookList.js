import React from 'react'
import PropTypes from 'prop-types'
import Title from './Title'
import {Link} from 'react-router'

const Recommend = (props) =>
  <div className="book-list">
    <Title title={props.title}/>
    <ul>
      {props.booklist.map((item, idx) =>
        <li key={idx}>
          <Link to={`/bookdetail/${item.id}`}>
            <div className="book-image">
              <img src={item.images} alt=""/>
            </div>
            <div className="book-detail">
              <h3>{item.name}</h3>
              <p>{item.intro}</p>
              <div className="author">
                <i className="iconfont icon-yonghu"> </i>
                <span>{item.author}</span>
              </div>
              <div className="category-r">
                <span>{item.type}</span>
                <span>{item.serialize}</span>
                <span>{item.wordcount}万字</span>
              </div>
            </div>
          </Link>
        </li>
      )}
    </ul>
  </div>

Title.propTypes = {
  booklist: PropTypes.array, //加上isRequired会报错
  title: PropTypes.string.isRequired
}

export default Recommend