import React, { useEffect, useState } from 'react'
import '../css/Item.scss'
import { FaCartPlus, FaGift, FaPhoneSquareAlt, FaTruck } from 'react-icons/fa';
import { LiaLongArrowAltLeftSolid, LiaLongArrowAltRightSolid } from 'react-icons/lia';
import { Link } from 'react-router-dom';
import { FaBasketShopping, FaCartShopping } from 'react-icons/fa6';
import RecommendItem from '../components/RecommendItem';
import axios from 'axios'

const Item = () => {
  const [quantity, setQuantity] = useState(1);
  const [img, setImg] = useState();
  const images = ["/qua/bo.png", "/qua/chuoi.png", "/qua/bo.png", "/qua/chuoi.png", "/qua/chuoi.png", "/qua/chuoi.png"]
  const handleImage = (e) => {
    setImg(e.target.src)
  }

  const handleBuy = (e) => {
    e.preventDefault();
  }

  // Chuyển [b] thành <b> và [/b] thành </b>, chuyển [url] => <a>, [img] => <img>
  const convertTagsToHtml = (text) => {
    const regexURL = /\[url=(.*?)\](.*?)\[\/url\]/g;
    const regexIMG = /\[img=(.*?)\]/g;

    return text
      .replace(/\[b\]/g, "<b>")
      .replace(/\[\/b\]/g, "</b>")
      .replace(/\[i\]/g, "<i>")
      .replace(/\[\/i\]/g, "</i>")
      .replace(/\[u\]/g, "<u>")
      .replace(/\[\/u\]/g, "</u>")
      .replace(regexURL, "<a href='$1'>$2</a>")
      .replace(regexIMG, "<img src='$1' style='margin-left: auto;display: block;transform: translateX(-50%)'>");
  }


  // test codes start here
  const types = ["type 1", "type 2", "type 3"]
  const [result, setResult] = useState("")
  axios.post("https://api.vndb.org/kana/vn",
    {
      filters: ["id", "=", "11"],
      fields: "description"
    },
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Token himo-ytq7i-nyyj1-jb8y-goonj-e7at4-6you"
      }
    }).then(e => {
      setResult(e.data.results[0].description)
      console.log(result)
    })

  // test codes end here


  return (
    <>
      <div className="top-item">
        <div className="container">
          <div className="top-item-col1">
            <img src={img || images[0]} alt="" className='big-img' />
            <div className="imgs">
              {images.map((e, i) => (
                <img key={i} src={e} alt="" className="small-img" onClick={handleImage} />
              ))}
            </div>
          </div>
          <div className="top-item-col2">
            <h1>Chuối tiêu</h1>
            <div className="prices">
              <div className="price">
                <h1>25.000₫</h1>
              </div>
              <div className="discount">
                <del>
                  <i>
                    60.000₫
                  </i>
                </del>
              </div>
            </div>
            <div className="method">
              <div className="tel">
                <div className="tel-icon"><FaPhoneSquareAlt /></div>
                <div className="tel-text">
                  <div className="top-text">Đặt hàng nhanh</div>
                  <a className="bottom-text" href='tel:0963.647.129'>0963.647.129</a>
                </div>
              </div>
              <div className="arrows">
                <LiaLongArrowAltLeftSolid />
                <LiaLongArrowAltRightSolid />
              </div>
              <div className="cart">
                <div className="cart-icon"><FaCartPlus /></div>
                <div className="cart-text">
                  <div className="top-text">Giỏ hàng</div>
                  <Link className="bottom-text">0 Sản phẩm</Link>
                </div>
              </div>
            </div>
            <form className="form-buy">
              <div className="left-buy">
                <div className="quantity">
                  <h3>Số lượng</h3>
                  <input type="number" value={quantity} min={1} name='quantity' onChange={(e) => setQuantity(e.target.value)} />
                </div>
                <div className="submit-btn">
                  <button type="submit" onClick={handleBuy} ><FaCartShopping /><p>Mua hàng</p></button>
                </div>
              </div>
              <div className="types">
                <div className="type">
                  <h3>Loại</h3>
                  <select name="types" id="types">
                    {types.map((e, i) => (
                      <option value={e} key={i}>{e}</option>
                    ))}
                  </select>
                </div>
                <div className="type">
                  <h3>Loại</h3>
                  <select name="types" id="types">
                    {types.map((e, i) => (
                      <option value={e} key={i}>{e}</option>
                    ))}
                  </select>
                </div>
                <div className="type">
                  <h3>Loại</h3>
                  <select name="types" id="types">
                    {types.map((e, i) => (
                      <option value={e} key={i}>{e}</option>
                    ))}
                  </select>
                </div>
                <div className="type">
                  <h3>Loại</h3>
                  <select name="types" id="types">
                    {types.map((e, i) => (
                      <option value={e} key={i}>{e}</option>
                    ))}
                  </select>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="bottom-item">
        <div className="container">
          <div className="bottom-left">
            <h3>ĐẶC ĐIỂM NỔI BẬT</h3>
            <div className="st-border"></div>
            <p style={{ whiteSpace: "pre-line" }} dangerouslySetInnerHTML={{
              __html: convertTagsToHtml(`----The one who obtains the Holy Grail will have any wish come true.

The Holy Grail War. A great ritual that materializes the greatest holy artifact, the Holy Grail. There are two conditions to participate in this ritual: being a magus and being a "Master" chosen by the Holy Grail.

[img=/qua/bo.png]

There are seven chosen Masters and seven classes of Servants, beings akin to superhumans with incredible fighting abilities. There is only one Holy Grail. If you wish for a miracle, prove that you are the strongest with your powers.

Emiya Shirou is a high school student who has learned rudimentary magic from his father and uses it to fix objects. He finds himself engaged in the Holy Grail war as he gets attacked by a Servant. As he gets cornered, he somehow summons his Servant and manages to stay alive long enough to compete against the other Masters.

[Partially taken from [url=http://mirrormoon.org/fate_stay_night]mirror moon[/url]]`)
            }}></p>
            <div className="st-border"></div>
          </div>
          <div className="bottom-right">
            <div className="redirects">
              <Link className="redirect">
                <FaGift />
                <h4>CHÍNH SÁCH QUÀ TẶNG</h4>
              </Link>
              <Link className="redirect">
                <FaTruck />
                <h4>CHÍNH SÁCH VẬN CHUYỂN</h4>
              </Link>
              <Link className="redirect">
                <FaBasketShopping />
                <h4>CHÍNH SÁCH MUA HÀNG</h4>
              </Link>
            </div>
            <div className="recommendations">
              <h4 className='highlighted'>SẢN PHẨM LIÊN QUAN</h4>
              <ul>
                <li>
                  <Link>
                    <RecommendItem />
                  </Link>
                </li>
                <li>
                  <Link>
                    <RecommendItem />
                  </Link>
                </li>
                <li>
                  <Link>
                    <RecommendItem />
                  </Link>
                </li>
                <li>
                  <Link>
                    <RecommendItem />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Item