import React, {Component} from 'react'
import PropTypes from 'prop-types'
// import {hashHistory} from 'react-router'
import imgError from '../../assets/js/imgError'

class Similar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bookDetail: {}
    }
  }

  static propTypes = {
    like: PropTypes.string.isRequired,
    api: PropTypes.string.isRequired
  }

  static contextTypes = {
    router: PropTypes.object
  }

  componentDidMount() {
    this.getBookDetail(this.props.like)
  }

  getBookDetail(id) {
    fetch(`${this.props.api}/booklist?id=${id}`)
      .then(res => res.json())
      .then(res => {
        this.setState({
          bookDetail: res
        })
      })
  }

  toBookDetail(id) {
    // hashHistory.push('/bookdetail/' + id)
    this.context.router.push('/bookdetail/' + id)
  }

  render() {
    const bookDetail = this.state.bookDetail
    return (
      <div className="similar" onClick={this.toBookDetail.bind(this, bookDetail.id)}>
        <div className="similar-img">
          <img src={bookDetail.images} alt="" onError={imgError}/>
        </div>
        <p>{bookDetail.name}</p>
      </div>
    );
  }
}


export default Similar