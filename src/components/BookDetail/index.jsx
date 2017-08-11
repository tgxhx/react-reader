import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import Similar from './Similar'
import imgError from '../../assets/js/imgError'

import './index.css'

import Loading from '../Loading'

class BookDetail extends Component {
  constructor() {
    super()

    this.state = {
      loading: false,
      content: null,
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
        /*this.loading = false  //获取数据完成后隐藏loading
        this.showmore = false  //获取数据让介绍最多显示5行
        this.bookDetail = res.data
        this.likes = res.data.like.split('-')*/
        this.setState({
          loading: false,
          bookDetail: res,
          likes: res.like.split('-')
        })
      })
  }

  goBack() {
    this.context.router.goBack()
  }

  toggleMore() {
    this.setState({
      showmore: !this.state.showmore
    })
  }

  render() {
    const {bookDetail, showmore} = this.state
    const style5 = {'WebkitBoxOrient': 'vertical'}
    return (
      <div className="book-detail">
        {this.state.loading ? <Loading className="loading"/> : null}
        {!this.state.loading ?
          <div className="detail-content">
            <div className="detail-linear">
              <header className="detail-top">
                <a onClick={this.goBack.bind(this)}>
                  <h2 className="detail-title"><i className="iconfont icon-fanhui"></i>{bookDetail.name}</h2>
                </a>
                <Link to="/" className="home-btn"><i className="iconfont icon-zhuye"></i></Link>
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
                    <Link to={`/reader/${this.props.params.id}`}>开始阅读</Link>
                  </button>
                </div>
                <div>
                  <button>
                    <Link>开始阅读</Link>
                  </button>
                </div>
              </div>
            </div>
            <div>
              <div className="detail-intro">
                <p
                  className={!showmore ? 'show5' : ''}
                  style={style5}
                onClick={this.toggleMore.bind(this)}>{bookDetail.intro}</p>
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
                  {this.state.likes.map((item, idx) =>
                    <li key={idx}>
                      <Similar like={item}/>
                    </li>
                  )}
                  {/*<li v-for="(item,index) in likes">
                  <similar :like="item"></similar>
              </li>*/}
                </ul>
              </div>
            </div>
          </div> : null}
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  api: state.api
})

export default connect(mapStateToProps)(BookDetail)
