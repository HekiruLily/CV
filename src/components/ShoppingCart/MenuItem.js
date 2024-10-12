import React from 'react';

const MenuItem = ({ item, onQuantityChange, onSelectItem, onDeleteProduct }) => {
  return (
    <div className='products'>
      <label>
        <input 
          type="checkbox" 
          checked={item.selected} 
          onChange={() => onSelectItem(item.id)} 
        />
        <a href="#">
          {/* Sửa link ảnh để lấy hình ảnh từ public */}
          <img 
            className='product_img' 
            src={`${process.env.PUBLIC_URL}/img/${item.image}`} 
            alt={item.name} 
          />
        </a>
      </label>
      <div className='product_item'>
        <h2>{item.name}</h2>
        
        <div className='button_group'>
          <button 
            className='minus' 
            onClick={() => onQuantityChange(item.id, -1)}
          >
            -
          </button>
          <span className='number'>{item.quantity}</span>
          <button 
            className='plus' 
            onClick={() => onQuantityChange(item.id, 1)}
          >
            +
          </button>
        </div>
        <div className='product_price'>
          <h4>{item.price} VNĐ</h4>
        </div>
      </div>
      <div className="content_detailed02">
        <h4>Thành Tiền</h4>
        <div className='product_price' id="price">
          <h4>{(item.price * item.quantity)} VNĐ</h4>
        </div>
      </div>
      <div className="content_detailed03">
        <h4>Thao Tác</h4>
        <button 
          className="delete-btn" 
          onClick={() => onDeleteProduct(item.id)}
        >
          Xóa
        </button>
      </div>
    </div>
  );
};

export default MenuItem;
