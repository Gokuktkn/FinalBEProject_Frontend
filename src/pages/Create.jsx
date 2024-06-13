import React, { useState } from 'react';
import { Form, Input, Button, Select, Tooltip, Upload, message, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';
import "../css/Create.css";

const { Option } = Select;

const Create = () => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState(1000);
  const [discount, setDiscount] = useState(1000);
  const [productType, setProductType] = useState('');
  const [attributes, setAttributes] = useState([]);
  const [images, setImages] = useState([]);
  const [imagesData, setImagesData] = useState([])
  const [productDescription, setProductDescription] = useState('');
  const [inputVisibleIndex, setInputVisibleIndex] = useState(null);
  const [inputValue, setInputValue] = useState('');

  // Tag của attributes
  const handleClose = (removedTag, attrIndex) => {
    const newAttributes = [...attributes];
    newAttributes[attrIndex].tags = newAttributes[attrIndex].tags.filter(tag => tag !== removedTag);
    setAttributes(newAttributes);
  };

  // Show input khi ấn vào tag
  const showInput = (index) => {
    setInputVisibleIndex(index);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Nhập thông tin vào tag
  const handleInputConfirm = (attrIndex) => {
    if (inputValue && !attributes[attrIndex].tags.includes(inputValue)) {
      const newAttributes = [...attributes];
      newAttributes[attrIndex].tags = [...newAttributes[attrIndex].tags, inputValue];
      setAttributes(newAttributes);
    }
    setInputVisibleIndex(null);
    setInputValue('');
  };

  // Hàm kiểm tra trùng lặp tên attribute
  const isDuplicateAttributeName = (name) => {
    return attributes.some(attribute => attribute.name === name);
  };

  // Thêm thuộc tính
  const addAttribute = () => {
    Swal.fire({
      title: 'Nhập tên đặc tính',
      input: 'text',
      inputPlaceholder: 'Ví dụ: Kích cỡ, Màu sắc',
      showCancelButton: true,
      confirmButtonText: 'Thêm',
      cancelButtonText: 'Hủy',
      preConfirm: (attributeName) => {
        if (!attributeName) {
          Swal.showValidationMessage('Tên đặc tính không được bỏ trống');
          return false;
        }
        if (isDuplicateAttributeName(attributeName)) {
          Swal.showValidationMessage('Tên đặc tính đã tồn tại');
          return false;
        }
        return attributeName;
      }
    }).then((result) => {
      if (result.isConfirmed) {
        setAttributes([...attributes, { name: result.value, tags: [] }]);
      }
    });
  };

  // Img preview
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => URL.createObjectURL(file));
    setImages([...images, ...newImages]);

    const file = e.target.files[0];
    setImagesData([...imagesData, file])
  };

  const handleImageRemove = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };

  const handleDeleteAttribute = (index) => {
    const newAttributes = attributes.filter((_, attrIndex) => attrIndex !== index);
    setAttributes(newAttributes);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProductData = {
      productName,
      productPrice,
      discount,
      productType,
      attributes,
      ImageData,
      productDescription,
    };
    console.log(newProductData);

    if(imagesData.length == 0) {
      Swal.fire({
        title: 'Ảnh không được phép bỏ trống'
      })
    }
    else {
      const formData = new FormData();
      // formData.append('items', imagesData, imagesData.map(e => e.name))
      formData.append('itemName', productName)
      formData.append('price', productPrice)
      formData.append('discount', discount)
      // formData.append('itemName', productName)
      // formData.append('itemName', productName)
      
      Swal.fire({
        title: 'Sản phẩm đã được tạo!',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    }
  };

//   START
// Input: tất cả trong data submit: productName, productPrice, discount, productType, attributes, images, productDescription
// CODE HERE
//   END

  return (
    <div className="create-container content-container">
      <h1>Thêm sản phẩm</h1>
      <Form onSubmit={handleSubmit} className="create-content">
        <Form.Item className="product-info">
          <label htmlFor="product-name">Tên sản phẩm</label>
          <Input
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
            id="product-name"
            className="product-name"
          />
        </Form.Item>
        <Form.Item className="product-info">
          <label htmlFor="price">Giá bán</label>
          <Input
            min={1000}
            value={productPrice}
            onChange={(e) => setProductPrice(parseInt(e.target.value))}
            required
            id="price"
            type="number"
          />
        </Form.Item>
        <Form.Item className="product-info">
          <label htmlFor="discount">Giá gốc</label>
          <Input
            min={1000}
            value={discount}
            onChange={(e) => setDiscount(parseInt(e.target.value))}
            required
            id="discount"
            type="number"
          />
        </Form.Item>
        <Form.Item className="product-info">
          <label htmlFor="product-type">Loại sản phẩm</label>
          <Select
            value={productType}
            onChange={(value) => setProductType(value)}
            required
            id="product-type"
          >
            <Option value="Hải sản">Hải sản</Option>
            <Option value="Rau củ">Rau củ</Option>
            <Option value="Thịt">Thịt</Option>
            <Option value="Trái cây">Trái cây</Option>
          </Select>
        </Form.Item>
        {attributes.map((attribute, index) => (
          <Form.Item key={index} className="product-info">
            <div className="attribute-name" style={{ display: "flex" }}>
              <label style={{ padding: "5px 0 0" }}>{attribute.name} </label>
              <Button onClick={() => handleDeleteAttribute(index)} type="link" danger style={{ padding: "0 20px" }}>Xóa</Button>
            </div>
            <div>
              {attribute.tags.map((tag, tagIndex) => {
                const isLongTag = tag.length > 20;
                const tagElem = (
                  <Tag
                    className="edit-tag"
                    key={tag}
                    closable
                    onClose={() => handleClose(tag, index)}
                  >
                    <span>{isLongTag ? `${tag.slice(0, 20)}...` : tag}</span>
                  </Tag>
                );
                return isLongTag ? (
                  <Tooltip title={tag} key={tag}>
                    {tagElem}
                  </Tooltip>
                ) : (
                  tagElem
                );
              })}
              {inputVisibleIndex === index && (
                <Input
                  type="text"
                  size="small"
                  className="tag-input"
                  value={inputValue}
                  onChange={handleInputChange}
                  onBlur={() => handleInputConfirm(index)}
                  onPressEnter={() => handleInputConfirm(index)}
                />
              )}
              {inputVisibleIndex !== index && (
                <Tag className="site-tag-plus" onClick={() => showInput(index)}>
                  <PlusOutlined /> New Tag
                </Tag>
              )}
            </div>
          </Form.Item>
        ))}
        <Button type="button" onClick={addAttribute} className="add-attribute-btn">
          Thêm đặc tính
        </Button>
        <Form.Item className="product-info image-upload-section">
          <label htmlFor="product-images">Ảnh sản phẩm</label>
          <input
            type="file"
            id="product-images"
            multiple
            onChange={handleImageChange}
            accept="image/*"
          />
          <label htmlFor="product-images" className="image-upload-label">
            Chọn ảnh
          </label>
          <div className="image-previews">
            {images.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image} alt={`Product Preview ${index + 1}`} />
                <div className="image-item__btn-wrapper">
                  <Button onClick={() => handleImageRemove(index)}>
                    Xóa
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Form.Item>
        <Form.Item className="product-info">
          <label>Mô tả sản phẩm</label>
          <Input.TextArea
            rows={4}
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            required
            className="product-desc product-info"
          />
        </Form.Item>
        <Form.Item className="create-submit">
          <Button type="submit" className="submit-btn" onClick={handleSubmit}>
            Tạo sản phẩm
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Create;
