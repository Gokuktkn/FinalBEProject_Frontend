import React, { useRef } from 'react'
import '../css/Home.scss'
import BodyTop from '../components/BodyTop'
// import Swiper core and required modules
import { Autoplay } from 'swiper/modules';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Link } from 'react-router-dom';
import { HiChevronDoubleLeft } from "react-icons/hi2";
import { HiChevronDoubleRight } from "react-icons/hi2";
import { FaCartPlus, FaGift, FaLongArrowAltLeft, FaLongArrowAltRight, FaPhoneSquareAlt, FaTruck } from 'react-icons/fa';
import ItemTop from '../components/ItemTop';
import ItemMiddle from '../components/ItemMiddle';
import { FaBasketShopping } from 'react-icons/fa6';
import ItemBottom from '../components/ItemBottom';
import Rating from '../components/Rating';

const Home = () => {
  const swiperRef1 = useRef(null)
  const swiperRef2 = useRef(null)
  const swiperRef3 = useRef(null)
  const swiperRef4 = useRef(null)


  // danh gia khach hang
  // let newRating = []
  // if (rating.length % 2 === 0) {
  //   for (let i = 0; i < rating.length; i += 2) {
  //     console.log("hello")
  //     newRating.push([rating[i], rating[i + 1]])
  //   }
  // } else {
  //   for (let i = 1; i < rating.length; i += 2) {
  //     newRating.push([rating[i], rating[i + 1]])
  //   }
  //   newRating.push([rating[0]])
  // }

  return (
    <div className="body">
      <div className="body-top">
        <div className="container">
          <div className="body-top-left">
            <BodyTop></BodyTop>
          </div>
          <div className="body-top-right">
            <h2 className='body-top-right-header'>SẢN PHẨM BÁN CHẠY</h2>
            <p className="body-top-right-text">
              Chúng tôi hài lòng khi mang đến cho Quý khách hàng những sản phẩm chất lượng với mức giá ưu đãi nhất thị trường.
            </p>
            <div className="body-top-slider">
              <div>
                <Swiper
                  // install Swiper modules
                  loop={true}
                  autoplay={{ delay: 4000, disableOnInteraction: false, }}
                  modules={[Autoplay]}
                  spaceBetween={30}
                  slidesPerView={2}
                  scrollbar={{ draggable: true }}
                  onSwiper={(swiper) => { swiperRef1.current = swiper; }}
                >
                  <SwiperSlide>
                    <ItemTop />
                  </SwiperSlide>
                  <SwiperSlide>
                    <ItemTop />
                  </SwiperSlide>
                  <SwiperSlide>
                    <ItemTop />
                  </SwiperSlide>
                </Swiper>


                <div className="btn-controls">
                  <button className="btn-prev" onClick={() => swiperRef1.current && swiperRef1.current.slidePrev()}><HiChevronDoubleLeft /></button>
                  <button className="btn-next" onClick={() => swiperRef1.current && swiperRef1.current.slideNext()}><HiChevronDoubleRight /> </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      <div className="body-middle">
        <div className="container">
          <div className="body-middle-top">
            <div className="body-middle-top-left">
              <div className="body-middle-top-left-top">
                <div className="body-middle-top-left-top-left">
                  <div className="body-middle-top-left-top-icon"><FaPhoneSquareAlt /></div>
                  <div className="body-middle-top-left-top-left-text">
                    <div className="body-middle-top-left-top-text-alert">Đặt hàng nhanh</div>
                    <div className="body-middle-top-left-top-text-content">0123456789</div>
                  </div>
                </div>
                <div className="body-middle-top-left-top-middle">
                  <div className="body-middle-top-left-top-middle-text">
                    <div className="body-middle-top-left-top-text-alert">Bạn chọn 1 trong 2 cách để bạn mua hàng</div>
                    <div className="body-middle-top-left-top-text-content row-1"><FaLongArrowAltLeft /> <p>Hoặc</p> <FaLongArrowAltRight /></div>
                  </div>
                </div>
                <div className="body-middle-top-left-top-right">
                  <div className="body-middle-top-left-top-icon"><FaCartPlus /></div>
                  <div className="body-middle-top-left-top-right-text">
                    <div className="body-middle-top-left-top-text-alert">Giỏ hàng</div>
                    <div className="body-middle-top-left-top-text-content"><a href="/">0 Sản phẩm</a></div>
                  </div>
                </div>
              </div>



              {/* TOP LEFT CONTENT */}
              <div className="body-middle-top-left-content">
                <h3 style={{ fontWeight: "600", borderBottom: ".5px solid #e6e6e6", paddingBottom: ".5rem" }}>SẢN PHẨM MỚI</h3>
                <div className="body-middle-top-left-content-new">
                  <ItemMiddle />
                  <ItemMiddle />
                  <ItemMiddle />
                  <ItemMiddle />
                  <ItemMiddle />
                  <ItemMiddle />
                </div>
                <div className="st-border"></div>
                <div className="body-middle-top-left-content-discount">
                  <h3 style={{ fontWeight: "600", borderBottom: ".5px solid #e6e6e6", paddingBottom: ".5rem" }}>SẢN PHẨM KHUYẾN MẠI</h3>
                  {/* CAROUSEL O DAY */}
                  <div className="body-middle-slider">
                    <div>
                      <Swiper
                        loop={true}
                        autoplay={{ delay: 4000, disableOnInteraction: false, }}
                        modules={[Autoplay]}
                        spaceBetween={30}
                        slidesPerView={3}
                        scrollbar={{ draggable: true }}
                        onSwiper={(swiper) => { swiperRef2.current = swiper; }}
                      >
                        <SwiperSlide>
                          <ItemMiddle></ItemMiddle>
                        </SwiperSlide>
                        <SwiperSlide>
                          <ItemMiddle></ItemMiddle>
                        </SwiperSlide>
                        <SwiperSlide>
                          <ItemMiddle></ItemMiddle>
                        </SwiperSlide>
                        <SwiperSlide>
                          <ItemMiddle></ItemMiddle>
                        </SwiperSlide>
                        <SwiperSlide>
                          <ItemMiddle></ItemMiddle>
                        </SwiperSlide>
                        <SwiperSlide>
                          <ItemMiddle></ItemMiddle>
                        </SwiperSlide>
                      </Swiper>
                      <div className="btn-controls">
                        <button className="btn-prev" onClick={() => swiperRef2.current && swiperRef2.current.slidePrev()}><HiChevronDoubleLeft /></button>
                        <button className="btn-next" onClick={() => swiperRef2.current && swiperRef2.current.slideNext()}><HiChevronDoubleRight /> </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="body-middle-top-right">
              <div className="col2-row1">
                <h3>DANH MỤC</h3>
                <ul>
                  <li><Link>Hoa quả sạch</Link></li>
                  <hr />
                  <li><Link>Rau sạch</Link></li>
                  <hr />
                  <li><Link>Thịt sạch</Link></li>
                  <hr />
                  <li><Link>Thuỷ - Hải sản sạch</Link></li>
                  <hr />
                  <li><Link>Gạo - Hạt khô</Link></li>
                </ul>
              </div>
              <div className="col2-row2">
                <h3>TIN MỚI</h3>
                <ul>
                  <li><Link>Cách nhận biết chuối chín tự nhiên và chuối chín do nhúng hóa chất</Link></li>
                  <li><Link>Những người này không nên ăn dứa trong đông</Link></li>
                  <li><Link>3 bí quyết lựa chọn thực phẩm sạch</Link></li>
                </ul>
              </div>
              <div className="col2-row3">
                <Link className="col2-row3-row1">
                  <FaGift />
                  <h4>CHÍNH SÁCH QUÀ TẶNG</h4>
                </Link>
                <Link className="col2-row3-row1">
                  <FaTruck />
                  <h4>CHÍNH SÁCH VẬN CHUYỂN</h4>
                </Link>
                <Link className="col2-row3-row1">
                  <FaBasketShopping />
                  <h4>CHÍNH SÁCH MUA HÀNG</h4>
                </Link>
              </div>
              <div className="col2-row4">
                <Link>
                  <img src="/banner/block-banner.png" alt="banner" />
                </Link>
              </div>
            </div>
          </div>
          <div className="st-border"></div>
          <div className="body-middle-bottom">
            <h3 style={{ fontWeight: "600", borderBottom: ".5px solid #e6e6e6", paddingBottom: ".5rem" }}>GIỎ QUÀ TẶNG</h3>
            <div className="body-middle-bottom-slider">
              <div>
                <Swiper
                  loop={true}
                  autoplay={{ delay: 4000, disableOnInteraction: false, }}
                  modules={[Autoplay]}
                  spaceBetween={30}
                  slidesPerView={3}
                  scrollbar={{ draggable: true }}
                  onSwiper={(swiper) => { swiperRef3.current = swiper; }}
                >
                  <SwiperSlide>
                    <ItemBottom />
                  </SwiperSlide>
                  <SwiperSlide>
                    <ItemBottom />
                  </SwiperSlide>
                  <SwiperSlide>
                    <ItemBottom />
                  </SwiperSlide>
                  <SwiperSlide>
                    <ItemBottom />
                  </SwiperSlide>
                  <SwiperSlide>
                    <ItemBottom />
                  </SwiperSlide>
                  <SwiperSlide>
                    <ItemBottom />
                  </SwiperSlide>
                </Swiper>
                <div className="btn-controls">
                  <button className="btn-prev" onClick={() => swiperRef3.current && swiperRef3.current.slidePrev()}><HiChevronDoubleLeft /></button>
                  <button className="btn-next" onClick={() => swiperRef3.current && swiperRef3.current.slideNext()}><HiChevronDoubleRight /> </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="body-bottom-rating">
        <div className="container">
          <div className="body-middle-bottom-rating">
            <h3>Ý KIẾN KHÁCH HÀNG</h3>
            <div className="slider">
              <div>
                {/* newRating.map -> trả ra 2 item cho mỗi element. Sau đó map thêm 1 lần nữa */}
                <Swiper
                  loop={true}
                  autoplay={{ delay: 4000, disableOnInteraction: false, }}
                  modules={[Autoplay, Pagination]}
                  spaceBetween={30}
                  slidesPerView={1}
                  scrollbar={{ draggable: true }}
                  onSwiper={(swiper) => { swiperRef4.current = swiper; }}
                  pagination={{clickable: true, el: '.swiper-pagination'}}
                >
                  <SwiperSlide>
                    <div className='rating-container'>
                      <Rating />
                      <Rating />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className='rating-container'>
                      <Rating />
                      <Rating />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className='rating-container'>
                      <Rating />
                      <Rating />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className='rating-container'>
                      <Rating />
                      <Rating />
                    </div>
                  </SwiperSlide>
                  <div className="swiper-pagination"></div>
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default Home