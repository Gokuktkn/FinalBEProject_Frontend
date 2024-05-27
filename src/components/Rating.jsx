import React from 'react'
import '../css/Rating.scss'

const Rating = () => {
  return (
    <div className='rating'>
      <img src="/qua/bo.png" alt="" />
      <div className="text">
        <div className="rating-text"></div>
        <div className="ok">
          <q>Chúng tôi rất hài lòng về chất lượng sản phẩm của shop cũng như về chất lượng dịch vụ. Chúc shop làm ăn phát đạt và có nhiều dịch vụ tốt hơn nữa.</q>
        </div>
        <br />
        <span><i>Khách hàng:&nbsp;&nbsp;</i></span><span style={{color: "#1dc483"}}>Name</span>
      </div>
    </div>
  )
}

export default Rating