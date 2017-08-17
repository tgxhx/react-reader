import React from 'react'

const Content = (props) =>
  <div className="chapterContent">
    {props.content.map((item, idx) =>
      <p key={idx}>{item}</p>
    )}
  </div>

export default Content