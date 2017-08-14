import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from '../../actions/people-actions'

class ListPanel extends Component {
  constructor(props) {
    super(props)

    this.state = {
      chapterList:[]
    }
  }

  static propTypes = {
    bookId: PropTypes.string.isRequired,
    hideBar: PropTypes.func.isRequired,
    saveBooksInfo: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.getList(this.props.bookId)
  }

  getList() {
    fetch(`${this.props.api}/titles?id=${this.props.bookId}`)
      .then(res => res.json())
      .then(res => {
        this.setState({
          chapterList: res.titles.split('-')
        })
    })
  }

  preventDefault(e) {
    // e.stopPropagation()
  }

  hideListPanel = () => {
    this.props.actions.showListPanel(false)
  }

  //跳转到指定章节
  redirectTo (index) {
    index = Math.min(index, 50)
    this.props.actions.curChapter(index)
    this.hideListPanel()
    this.props.hideBar(false)  //点击隐藏上下面板，调用父元素的方法
    setTimeout(() => {
      document.body.scrollTop = 0
      this.props.saveBooksInfo()  //点击保存阅读进度，调用父元素的方法
    }, 300)
  }

  render() {
    return (
      <div className={`list-panel${this.props.list_panel ? ' show': ''}`} onClick={this.preventDefault.bind(this)}>
        <div className="list">
          <div className="list-nav">
            <i className="iconfont icon-fanhui" onClick={this.hideListPanel}></i>
            <h3>目录</h3>
          </div>
          <div className="list-content">
            <ul>
              {this.state.chapterList.map((item, idx) =>
                <li key={idx} onClick={this.redirectTo.bind(this, idx + 1)} style={this.props.curChapter === idx + 1 ? {color: '#ed424b'}: {}}>· {idx+1}. {item}</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  api: state.api,
  list_panel: state.list_panel,
  curChapter: state.curChapter
})

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPanel)