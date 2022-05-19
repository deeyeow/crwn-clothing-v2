import { useContext } from 'react';

import { CartContext } from '../../context/cart.context';

import Button from '../button/button.component';

import './checkout-item.styles.scss';

const CheckoutItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;

  const { addItemToCart, decrementItemInCart, removeItemInCart } =
    useContext(CartContext);

  const incrementItemHandler = () => addItemToCart(cartItem);
  const decrementItemHandler = () => decrementItemInCart(cartItem);
  const removeItemHandler = () => removeItemInCart(cartItem);

  return (
    <div className='checkout-item-container'>
      <div className='image-container'>
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className='name'>{name}</span>
      <span className='quantity'>
        <div className='arrow' onClick={decrementItemHandler}>
          &#10094;
        </div>
        <span className='value'>{quantity}</span>
        <div className='arrow' onClick={incrementItemHandler}>
          &#10095;
        </div>
      </span>
      <span className='price'>{price}</span>
      <Button className='remove-button' onClick={removeItemHandler}>
        &#10005;
      </Button>
    </div>
  );
};

export default CheckoutItem;
