"use client";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Checkout = () => {
  const router = useRouter();
  const [cartItem, setCartItem] = useState<null | any>(null);

  useEffect(() => {
    // Kiểm tra và lấy thông tin từ query
    if (router.query.cartItem) {
      setCartItem(JSON.parse(router.query.cartItem as string));
    }
  }, [router.query]);

  return (
    <div className="checkout-page">
      <h2>Chi tiết đơn hàng</h2>
      {cartItem ? (
        <div>
          <img
            src={cartItem.image}
            alt={cartItem.name}
            className="w-16 h-20 object-cover"
          />
          <h3>{cartItem.name}</h3>
          <p>Màu sắc: {cartItem.color}</p>
          <p>Kích thước: {cartItem.size}</p>
          <p>Số lượng: {cartItem.quantity}</p>
          <p>Giá: {cartItem.price} VNĐ</p>
          <p>Tổng giá: {cartItem.price * cartItem.quantity} VNĐ</p>
        </div>
      ) : (
        <p>Không có sản phẩm nào trong giỏ hàng.</p>
      )}
    </div>
  );
};

export default Checkout;
