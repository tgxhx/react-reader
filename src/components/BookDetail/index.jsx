import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router'

import Similar from './Similar'
import imgError from '../../assets/js/imgError'
import Loading from '../Loading'

import './index.css'


class BookDetail extends Component {
  constructor() {
    super()

    this.state = {
      loading: false,
      bookDetail: {},
      likes: [],  //相似推荐
      showmore: false //简介显示更多
    }
  }

  static contextTypes = {
    router: PropTypes.object
  }

  componentDidMount() {
    this.getBookDetail(this.props.params.id)
  }

  componentWillUpdate(nextProps) {
    if (nextProps.params.id !== this.props.params.id) {
      this.getBookDetail(nextProps.params.id)
    }
  }

  getBookDetail(bookId) {
    this.setState({
      loading: true
    })
    fetch(`${this.props.api}/booklist?id=${bookId}`)
      .then(res => res.json())
      .then((res) => {
        this.setState({
          loading: false,
          bookDetail: res,
          likes: res.like.split('-')
        })
      })
  }

  goBack = () => {
    this.context.router.goBack()
  }

  goHome = () => {
    this.context.router.push('/')
  }

  toggleMore = () => {
    this.setState({
      showmore: !this.state.showmore
    })
  }

  render() {
    const {bookDetail, showmore, loading, likes} = this.state
    const id = this.props.params.id
    const style5 = {'WebkitBoxOrient': 'vertical'}
    return (
      <div className="book-detail">
        {loading && <Loading className="loading"/>}
        {!loading &&
        <div className="detail-content">
          <div className="detail-linear">
            <header className="detail-top">
              <a onClick={this.goBack}>
                <h2 className="detail-title"><i className="iconfont icon-fanhui"></i>{bookDetail.name}</h2>
              </a>
              <a onClick={this.goHome} className="home-btn"><i className="iconfont icon-zhuye"></i></a>
            </header>
            <div className="detail-con">
              <div className="detail-img">
                <img src={bookDetail.images} alt="" onError={imgError}/>
              </div>
              <div className="detail-main">
                <h3 className="name">{bookDetail.name}</h3>
                <p className="author">作者：{bookDetail.author}</p>
                <p className="type">分类：{bookDetail.type}</p>
                <p className="word-count">{bookDetail.wordcount}万字</p>
                {/*<rate :score="bookDetail.ratings"></rate>*/}
              </div>
            </div>
            <div className="read-btn">
              <div>
                <button>
                  <Link to={`/reader/${id}`}>开始阅读</Link>
                </button>
              </div>
              <div>
                <button>
                  <Link to={`/reader/${id}`}>开始阅读</Link>
                </button>
              </div>
            </div>
          </div>
          <div>
            <div className="detail-intro">
              <p
                className={!showmore ? 'show5' : ''}
                style={style5}
                onClick={this.toggleMore}>{bookDetail.intro}</p>
            </div>
            <div className="detail-tag">
              <h3 className="tag">类别标签 </h3>
              <ul className="tag-btn clearfix">
                <li>
                  {bookDetail.type}
                </li>
                <li>
                  东方玄幻
                </li>
              </ul>
            </div>
            <div className="detail-like">
              <h3 className="like-title">喜欢本书的人也喜欢</h3>
              <ul className="like-list">
                {likes.map((item, idx) =>
                  <li key={idx}>
                    <Similar like={item} api={this.props.api}/>
                  </li>
                )}
                {/*<li v-for="(item,index) in likes">
                  <similar :like="item"></similar>
              </li>*/}
              </ul>
            </div>
          </div>
        </div>}
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  api: state.api
})

export default connect(mapStateToProps)(BookDetail)
