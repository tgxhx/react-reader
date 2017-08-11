import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'

import Swiper from './Swiper'
import './index.css'
import Recommend from './Recommend'
import BookList from './BookList'

class Home extends Component {
  constructor() {
    super()

    this.state = {
      type: ['玄幻', '修真', '都市', '历史', '游戏'],
      booklist: []
    }
  }

  componentWillMount() {
  }

  componentDidMount() {
    fetch(`${this.props.api}/booklist`)
      .then(res => res.json())
      .then(res => {
        this.setState({
          booklist: res
        }, () => {
          console.log()
        })
      })
  }

  filterHot(value) {
    if (!value) return ''
    let arr = []
    value.forEach((item, index) => {
      //简单更改下首页加载数据太多,可自行修改
      if (index < 20) {
        if (index % 2 === 1) {
          arr.push(item)
        }
      }
    })
    return arr
  }

  filterTop(value) {
    if (!value) return ''
    var arr = []
    value.forEach((item, index) => {
      //简单更改下首页加载数据太多,可自行修改
      if (index < 20) {
        if (index % 2 === 0) {
          arr.push(item)
        }
      }
    })
    return arr
  }

  filterFree(value) {
    if (!value) return ''
    var arr = []
    value.forEach((item, index) => {
      //简单更改下首页加载数据太多,可自行修改
      if (index < 20) {
        if (index % 3 === 2) {
          arr.push(item)
        }
      }
    })
    return arr
  }

  filterNewbook(value) {
    if (!value) return ''
    var arr = []
    value.forEach((item, index) => {
      if (index % 3 === 1) {
        arr.push(item)
      }
    })
    return arr.splice(0, 3)
  }

  filterEndbook(value) {
    if (!value) return ''
    var arr = []
    value.forEach((item, index) => {
      if (item.serialize === '完本') {
        arr.push(item)
      }
    })
    return arr
  }

  filterLike(value) {
    if (!value) return ''
    var arr = []
    value.forEach((item, index) => {
      if (index % 4 === 2) {
        arr.push(item)
      }
    })
    return arr.splice(0, 3)
  }


  render() {
    const booklist = this.state.booklist
    return (
      <div className="home">
        <div className="home-header">
          <a href="/"><img src="http://qidian.gtimg.com/qdm/img/logo-qdm.0.50.svg" alt=""/></a>
          <i className="iconfont icon-yonghu"></i>
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
        <Recommend booklist={this.filterHot(booklist)} title="热门小说"/>
        <Recommend booklist={this.filterTop(booklist)} title="排行榜"/>
        <Recommend booklist={this.filterFree(booklist)} title="限时免费"/>
        <BookList booklist={this.filterNewbook(booklist)} title="新书抢鲜"/>
        <BookList booklist={this.filterEndbook(booklist)} title="畅销完本"/>
        <BookList booklist={this.filterLike(booklist)} title="猜你喜欢"/>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  api: state.api
})

export default connect(mapStateToProps)(Home)