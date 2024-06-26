import React, { useEffect, useState } from 'react'
import '../css/Item.scss'
import { FaCartPlus, FaGift, FaPhoneSquareAlt, FaTruck } from 'react-icons/fa';
import { LiaLongArrowAltLeftSolid, LiaLongArrowAltRightSolid } from 'react-icons/lia';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaBasketShopping, FaCartShopping } from 'react-icons/fa6';
import RecommendItem from '../components/RecommendItem';
import Type from '../components/Type';
import { fetchAPI } from '../../fetchApi';
import { PuffLoader } from 'react-spinners';

const Item = () => {
  const params = new useParams();
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [ads, setAds] = useState();
  const [quantity, setQuantity] = useState(1);
  const [img, setImg] = useState();
  const [itemList, setItemList] = useState([]);


  const handleImage = (e) => {
    setImg(e.target.src)
  }

  useEffect(() => {
    fetchAPI(`/item/get-item/${params.id}`, 'GET').then(e => {
      if (e.status == 200) {
        setData(e.data.item)
        setItemList(e.data.item.variants.map(type => ({ name: type.name, type: type.type[0] })))
        fetchAPI(`/item/get-type/${e.data.item.food_type}/1`)
          .then(e => setAds(e.data.items.slice(0, 4)))
      }
      else {
        setData(false)
      }
    })
    const timeout = setTimeout(() => {
      setLoading(false)
    }, 500);
    return () => {
      clearTimeout(timeout)
    }
  }, [])

  const formattedNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }



  // SUBMIT

  const handleType = (name, type) => {
    const index = itemList.findIndex(item => item.name === name);
    if (index !== -1) {
      itemList[index].type = type;
      setItemList([...itemList]); // spread operator to trigger re-render
    } else {
      setItemList([])
    }
  };
  const price = 10000;

  const handleBuy = (e) => {
    e.preventDefault();
    if (localStorage.getItem('user') == null) {
      navigate('/signin')
    }
    else {
      const saveItem = {
        itemName: data.itemName,
        image: data.images[0],
        quantity,
        originalPrice: data.price,
        price: price * quantity,
        type: [
          ...itemList
        ],
        ID: data.ID
      }
      const existingCart = JSON.parse(localStorage.getItem('cart')) || []
      const existingItemIndex = existingCart.findIndex(e => e.itemName == saveItem.itemName)
      if (existingItemIndex !== -1) {
        existingCart[existingItemIndex] = saveItem
        localStorage.setItem('cart', JSON.stringify(existingCart));
      }
      else {
        const updatedCart = [...existingCart, saveItem];
        localStorage.setItem('cart', JSON.stringify(updatedCart));
      }
      navigate('/cart')
    }
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
      .replace(regexIMG, "<img src='$1' style='margin-left: auto;display: block;transform: translateX(-50%);max-width: 480px'>");
  }


  return loading ? (<div style={{
    margin: "120px 0",
    marginLeft: "50%",
  }}>
    <PuffLoader color="#1dc483" />
  </div>) : !data ? navigate('/not-found') : (
    <>
      <div className="top-item">
        <div className="container">
          <div className="top-item-col1">
            <img src={img || data.images[0]} alt="" className='big-img' />
            <div className="imgs">
              {data.images.map((e, i) => (
                <img key={i} src={e} alt="" className="small-img" onClick={handleImage} />
              ))}
            </div>
          </div>
          <div className="top-item-col2">
            <h1>{data.itemName}</h1>
            <div className="prices">
              <div className="price">
                <h1>{formattedNumber(data.price)}₫</h1>
              </div>
              <div className="discount">
                <del>
                  <i>
                    {formattedNumber(data.discount)}₫
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
                  <Link to={'/cart'} className="bottom-text">0 Sản phẩm</Link>
                </div>
              </div>
            </div>
            <form className="form-buy">
              <div className="left-buy">
                <div className="quantity">
                  <h3>Số lượng</h3>
                  <input type="number" value={quantity} min={1} name='quantity' onChange={(e) => setQuantity(parseInt(e.target.value))} />
                </div>
                <div className="buy-btn">
                  <button type="submit" onClick={handleBuy} ><FaCartShopping /><p>Mua hàng</p></button>
                </div>
              </div>
              <div className="types">
                {data.variants.map((e, i) => (
                  <Type props={e} key={i} onChange={handleType} />
                ))}
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
              __html: convertTagsToHtml(data.description)
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
                {ads.map((e, i) => (
                  <li key={i}>
                    <Link to={`/product/${e.ID}`}>
                      <RecommendItem props={e} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Item