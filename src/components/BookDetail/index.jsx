import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import localEvent from '../../assets/js/local'

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
      showmore: false, //简介显示更多,
      hasRead: false,  //是否有阅读进度
      shelf: [], //书架列表
      addShelf: false //是否在书架中
    }
  }

  static contextTypes = {
    router: PropTypes.object
  }

  componentDidMount() {
    const id = this.props.params.id
    this.getBookDetail(id)
    this.setHasRead(id)
    //从localStorage获取书架信息保存至shelf，然后判断当前书籍是否在书架中，是则设置addShelf为true
    if (localEvent.StorageGetter('bookShelf')) {
      this.setState({
        shelf: localEvent.StorageGetter('bookShelf')
      }, () => {
        if (this.state.shelf.find(el => el.id == id)) {
          this.setState({addShelf: true})
        }
      })
    }
  }

  componentWillUpdate(nextProps) {
    //点击底部相似书籍，监听书籍的id变化并获取内容
    const pid = nextProps.params.id
    if (pid !== this.props.params.id) {
      this.getBookDetail(pid)
      this.setHasRead(pid)
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

  //判断是否有阅读进度
  setHasRead(id) {
    this.setState({
      hasRead: false
    }, () => {
      const info = localEvent.StorageGetter('bookreaderinfo')
      if (info[id]) {
        this.setState({
          hasRead: true
        })
      }
    })
  }

  goBack = () => {
    this.context.router.goBack()
  }

  goHome = () => {
    this.context.router.push('/')
  }

  //书籍简介切换显示5行
  toggleMore = () => {
    this.setState(prevState => ({
      showmore: !prevState.showmore
    }))
  }

  //加入书架
  addToShelf = () => {
    const detail = this.state.bookDetail
    if (this.state.shelf.find(el => el.id === detail.id)) {
      return
    }
    const bookInfo = {
      id: detail.id,
      name: detail.name,
      author: detail.author,
      images: detail.images,
      recent: '', //阅读进度
      checked: false  //判断删除时是否选中
    }
    this.state.shelf.push(bookInfo)
    localEvent.StorageSetter('bookShelf', this.state.shelf)
    this.setState({addShelf: true})
  }


  render() {
    const {bookDetail, showmore, loading, likes, hasRead, addShelf} = this.state
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
                  <Link to={`/reader/${id}`}>{hasRead ? '继续阅读' : '开始阅读'}</Link>
                </button>
              </div>
              <div>
                <button className={addShelf ? 'added': ''}>
                  <a onClick={this.addToShelf}>{addShelf ? '已在书架': '加入书架'}</a>
                </button>
              </div>
            </div>
          </div>
          <div>
            <div className="detail-intro">
              <p
                className={!showmore ? 'show5' : ''}
                style={style5} //create-react-app会将-webkit-box-orient删除，所以添加到style中
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
