import React from 'react'
import '../css/Recommend.scss'

const RecommendItem = () => {
  return (
    <div className='recommend-item'>
        <img src="/qua/bo.png" alt="" />
        <div className="description">
            <p>Bơ bở bờ bơ</p>
            <h4><i>Giá:</i> 696.969</h4>
            <div className="discount">
                <del><i>Giá: 1.000.000</i></del>
            </div>
        </div>
    </div>
  )
}

export default RecommendItem