import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router'

import Swiper from './Swiper'
import './index.css'
import Recommend from './Recommend'
import BookList from './BookList'
import Loading from '../Loading'

class Home extends Component {
  constructor() {
    super()
    this.state = {
      type: ['玄幻', '修真', '都市', '历史', '游戏'],
      booklist: [],
      loading: false
    }
  }

  static contextTypes = {
    router: PropTypes.object
  }

  componentDidMount() {
    this.getData()
  }

  getData() {
    this.setState({
      loading: true
    })
    fetch(`${this.props.api}/booklist`)
      .then(res => res.json())
      .then(res => {
        this.setState({
          booklist: res,
          loading: false
        })
      })
  }

  filters(list, type) {
    if (!list) return ''
    switch (type) {
      case 'hot':
        return list.filter((item, index) => index < 20 && index % 2 === 1)
      case 'top':
        return list.filter((item, index) => index < 20 && index % 2 === 0)
      case 'free':
        return list.filter((item, index) => index < 20 && index % 3 === 2)
      case 'new':
        return list.filter((item, index) => index % 3 === 1).splice(0, 3)
      case 'end':
        return list.filter((item, index) => item.serialize === '完本')
      case 'like':
        return list.filter((item, index) => index % 4 === 2).splice(0, 3)
      default:
        list.splice(0, 3)
    }
  }

  render() {
    const {booklist, loading} = this.state
    return (
      <div className="home">
        {loading && <Loading/>}
        {!loading &&
        <div>
          <div className="home-header">
            <img src="http://qidian.gtimg.com/qdm/img/logo-qdm.0.50.svg" alt=""/>
            <i className="iconfont icon-bookshelf" onClick={() => this.context.router.push(`/bookshelf`)}></i>
          </div>
          <Swiper/>
          <nav className="home-nav">
            {this.state.type.map((item, idx) =>
              <Link to={`/category/?type=${idx + 1}`}
                    className="guide-nav-div"
                    key={idx}>
                <i className="icon icon-sort"></i>
                <h4 className="guide-nav-h">{item}</h4>
              </Link>
            )}
          </nav>
          <Recommend booklist={this.filters(booklist, 'hot')} title="热门小说"/>
          <Recommend booklist={this.filters(booklist, 'top')} title="排行榜"/>
          <Recommend booklist={this.filters(booklist, 'free')} title="限时免费"/>
          <BookList booklist={this.filters(booklist, 'new')} title="新书抢鲜"/>
          <BookList booklist={this.filters(booklist, 'end')} title="畅销完本"/>
          <BookList booklist={this.filters(booklist, 'like')} title="猜你喜欢"/>
        </div>}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  api: state.api
})

export default connect(mapStateToProps)(Home)