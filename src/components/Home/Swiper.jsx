import React, {Component} from 'react'
import Swiper from 'react-slick'

import img1 from './images/1.jpg'
import img2 from './images/2.jpg'
import img3 from './images/3.jpg'
import img4 from './images/4.jpg'
import img5 from './images/5.jpg'

export default class Swipe extends Component {
  render() {
    const params = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000
    }
    return (
      <Swiper {...params}>
        <div><img src={img1} alt=""/></div>
        <div><img src={img2} alt=""/></div>
        <div><img src={img3} alt=""/></div>
        <div><img src={img4} alt=""/></div>
        <div><img src={img5} alt=""/></div>
      </Swiper>
    )
  }
}
