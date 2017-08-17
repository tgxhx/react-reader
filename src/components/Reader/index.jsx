import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from '../../actions/actions'
import localEvent from '../../assets/js/local'

import Content from './Content'
import Loading from '../Loading'
import TopNav from './TopNav'
import BottomNav from './BottomNav'
import FontNav from './FontNav'
import ListPanel from './ListPanel'
import Cover from './Cover'

import './index.css'

class Reader extends Component {
  constructor() {
    super()

    this.state = {
      loading: false,
      title: '',
      content: [],
      bar: false,
      booksReadInfo: {},  //所有书籍的阅读信息和阅读进度
      firstUpdate: false,  //初次加载的判断状态
      shelfList: [], //书架信息
      isSave: false, //是否需要保存进度,刚进入不保存，点击更换章节后再根据这个值保存
      isInShelf: false //当前书籍是否在书架中
    }
  }

  componentWillMount() {
    //初次加载时防止willupdate多次请求，由于componentWillUpdate监听的章节数字，初次加载会触发两次，因此加上判断状态
    const setFirstUpdate = (id, chapter) => {
      this.getData(id, chapter)
      this.props.actions.curChapter(chapter)
      this.setState({
        firstUpdate: true
      })
    }

    const id = this.props.params.id

    //判断当前书籍是否在书架中，是则将localStorage的数据存入shelfList中，并将isInshelf状态设为true
    const bs = localEvent.StorageGetter('bookShelf')
    if (bs && bs.some(el => el.id === +id)) {
      this.setState({
        shelfList: bs,
        isInShelf: true
      })
    }

    //判断本地是否存储了阅读器文字大小
    const fz = localEvent.StorageGetter('fz_size')
    if (fz) {
      this.props.actions.fzSizeModify(fz)
    }
    //判断本地是否存储了阅读器主题色
    const bg = localEvent.StorageGetter('bg_color')
    if (bg) {
      this.props.actions.changeBG(bg)
    }

    //加载时从localStorage中加载所有书籍阅读进度
    const localBookReaderInfo = localEvent.StorageGetter('bookreaderinfo')

    //当前书籍以前读过并有阅读进度
    if (localBookReaderInfo && localBookReaderInfo[id]) {
      this.setState({
        booksReadInfo: localBookReaderInfo
      }, () => {
        const chapter = this.state.booksReadInfo[id].chapter
        setFirstUpdate(id, chapter)
      })
    } else {
      //当前书籍没有读过但是localStorage保存了其他书籍进度
      if (localBookReaderInfo) {
        this.setState({
          booksReadInfo: localBookReaderInfo
        })
        setFirstUpdate(id, 1)
      } else {  //第一次进入阅读
        let booksReadInfo = this.state.booksReadInfo
        booksReadInfo[id] = {
          book: id,
          chapter: 1
        }
        this.setState({booksReadInfo})
        setFirstUpdate(id, 1)
      }
    }
  }

  componentDidMount() {
  }

  componentWillUpdate(nextProps, nextState) {
    //监听字体大小的变化，并存入localStorage中
    if (nextProps.fz_size !== this.props.fz_size) {
      localEvent.StorageSetter('fz_size', nextProps.fz_size)
    }
    //监听章节的变化
    if (nextProps.curChapter !== this.props.curChapter && this.state.firstUpdate) {
      this.getData(this.props.params.id, nextProps.curChapter)
      //进入阅读后，不会立即更新书架中进度信息，先判断当前书籍是否在书架中，然后当切换章节时候再通过isSave的状态告诉getData获取数据后更新书架的阅读进度
      if (nextState.isInShelf) {
        this.setState({
          isSave: true
        })
      }
    }
  }

  //获取数据
  getData(id, chapter = 1) {
    this.setState({
      loading: true
    })
    fetch(`${this.props.api}/book?book=${id}&id=${chapter}`)
      .then(res => res.json())
      .then(res => {
        this.setState({
          loading: false,
          title: res.title,
          content: res.content.split('-')
        }, () => {
          //当前书籍在书架中，且切换章节后isSave状态为true时，更新书架信息
          if (this.state.isInShelf && this.state.isSave) {
            const state = this.state
            const index = state.shelfList.findIndex(el => el.id === +this.props.params.id)
            state.shelfList[index].recent = state.title
            this.setState({
              shelfList: state.shelfList
            }, () => {
              localEvent.StorageSetter('bookShelf', this.state.shelfList)
            })
          }
        })
      })
  }

  //向上翻页
  pageUp = () => {
    let target = document.body.scrollTop - window.screen.height - 80
    this.startScroll(target, -20)
  }

  //向下翻页
  pageDown = () => {
    let target = document.body.scrollTop + window.screen.height - 80
    this.startScroll(target, 20)
  }

  //滚动
  startScroll(target, speed) {
    let times = null
    times = setInterval(function () {
      if (speed > 0) {
        if (document.body.scrollTop <= target) {
          document.body.scrollTop += speed
        }
        if (document.body.scrollTop > target || document.body.scrollTop + window.screen.height >= document.body.scrollHeight) {
          clearInterval(times)
        }
      } else {
        if (document.body.scrollTop >= target) {
          document.body.scrollTop += speed
        }
        if (document.body.scrollTop < target || document.body.scrollTop <= 0) {
          clearInterval(times)
        }
      }
    }, 1)
  }

  //修改章节
  nextChapter = () => {
    this.props.actions.nextChapter('', 50)
    setTimeout(() => {
      document.body.scrollTop = 0
      //设置redux的state不会立即生效，暂时加延迟实现
      this.saveBooksInfo()
    }, 300)
  }

  //上一章
  prevChapter = () => {
    this.props.actions.prevChapter()
    setTimeout(() => {
      document.body.scrollTop = 0
      this.saveBooksInfo()
    }, 300)
  }

  saveBooksInfo = () => {
    //可用localStorage保存每本小说阅读进度
    let id = this.props.params.id
    //不可直接修改state，所有保存一个state.booksReadInfo的副本，修改副本完毕后再设置state
    let booksReadInfo = this.state.booksReadInfo
    booksReadInfo[id] = {
      book: id,
      chapter: this.props.curChapter
    }
    this.setState({booksReadInfo}, () => {
      localEvent.StorageSetter('bookreaderinfo', this.state.booksReadInfo)
    })
  }

  //显示隐藏面板
  toggleBar = (bool) => {
    this.setState({
      bar: bool
    })
    this.props.actions.showFontPanel(false)
  }

  render() {
    const {loading, title, bar, content} = this.state
    const {api,fz_size, bg_color, font_panel, list_panel, bg_night,curChapter, params, actions} = this.props
    return (
      <div id="reader">
        {loading && <Loading className="loading"/>}
        {bar && <TopNav/>}
        <div
          className="read-container"
          data-bg={bg_color}
          data-night={bg_night}
          ref="fz_size"
          style={{fontSize: `${fz_size}px`}}>
          <h4>{title}</h4>
          {!loading && <Content content={content}/>}
          {!loading &&
          <div className="btn-bar">
            <ul className="btn-tab">
              <li className="prev-btn" onClick={this.prevChapter}>上一章</li>
              <li className="next-btn" onClick={this.nextChapter}>下一章</li>
            </ul>
          </div>}
        </div>
        <div className="page-up" onClick={this.pageUp}></div>
        <div className="click-mask" onClick={this.toggleBar.bind(this, !this.state.bar)}></div>
        <div className="page-down" onClick={this.pageDown}></div>
        {bar && <BottomNav
          font_panel={font_panel}
          bg_night={bg_night}
          showFontPanel={actions.showFontPanel}
          switchNight={actions.switchNight}
          showListPanel={actions.showListPanel}/>}
        {font_panel && <div className="top-nav-pannel-bk font-container"></div>}
        {font_panel && <FontNav/>}
        <Cover
          showListPanel={actions.showListPanel}
          list_panel={list_panel}/>
        <ListPanel
          bookId={params.id}
          hideBar={this.toggleBar}
          saveBooksInfo={this.saveBooksInfo}
          api={api}
          list_panel={list_panel}
          curChapter={curChapter}
          curChapterAction={actions.curChapter}
          showListPanel={actions.showListPanel}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  api: state.api,
  fz_size: state.fz_size,
  curChapter: state.curChapter,
  bg_color: state.bg_color,
  font_panel: state.font_panel,
  bg_night: state.bg_night,
  list_panel: state.list_panel
})

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Reader)
