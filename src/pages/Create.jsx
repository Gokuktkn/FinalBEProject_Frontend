import React, { useState } from 'react';
import { Form, Input, Button, Tag, Tooltip, Upload, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';
import "../css/Create.css";

const Create = () => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [attributes, setAttributes] = useState([]);
  const [images, setImages] = useState([]);
  const [productDescription, setProductDescription] = useState('');
  const [newTag, setNewTag] = useState('');
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState('');

  const handleClose = (removedTag, attrIndex) => {
    const newAttributes = [...attributes];
    newAttributes[attrIndex].tags = newAttributes[attrIndex].tags.filter(tag => tag !== removedTag);
    setAttributes(newAttributes);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = (attrIndex) => {
    if (inputValue && !attributes[attrIndex].tags.includes(inputValue)) {
      const newAttributes = [...attributes];
      newAttributes[attrIndex].tags = [...newAttributes[attrIndex].tags, inputValue];
      setAttributes(newAttributes);
    }
    setInputVisible(false);
    setInputValue('');
  };

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
        } else {
          return attributeName;
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        setAttributes([...attributes, { name: result.value, tags: [] }]);
      }
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => URL.createObjectURL(file));
    setImages([...images, ...newImages]);
  };

  const handleImageRemove = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProductData = {
      productName,
      productPrice,
      attributes,
      images,
      productDescription,
    };
    console.log(newProductData);
    Swal.fire({
      title: 'Sản phẩm đã được tạo!',
      icon: 'success',
      confirmButtonText: 'OK'
    });
    setProductName('');
    setProductPrice('');
    setAttributes([]);
    setImages([]);
    setProductDescription('');
  };

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
          <label htmlFor="price">Giá sản phẩm</label>
          <Input
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            required
            id="price"
          />
        </Form.Item>
        {attributes.map((attribute, index) => (
          <Form.Item key={index} className="product-info">
            <label>{attribute.name}</label>
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
              {inputVisible && (
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
              {!inputVisible && (
                <Tag className="site-tag-plus" onClick={showInput}>
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
          <Button className="submit-btn">
            Tạo sản phẩm
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Create;
