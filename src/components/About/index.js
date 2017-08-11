import React, {Component} from 'react'

import './style.css'

export default class About extends Component {
  constructor() {
    super()

    this.state = {
      page: 1,
      aaa: 'aaa',
      input: ''
    }
  }

  addPage() {
    this.setState({
      page: this.state.page + 1
    })
  }

  componentWillUpdate(props, state) {
    if (this.state.aaa === state.aaa) {
        console.log(true)
    }
  }

  onChangeHandler(test, e) {
    this.setState({
      input:e.target.value
    })
    console.log(e)
    console.log(test)
  }
  
  render() {
    return (
      <div className='About'>
        <h1>
          <input type="text" value={this.state.input} onChange={this.onChangeHandler.bind(this, 'test')}/>
          {this.state.input}
          <button onClick={this.addPage.bind(this)}>click</button>
        </h1>
      </div>
    )
  }
}