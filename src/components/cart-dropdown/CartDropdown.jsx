import React from 'react';

//  using redux
import { connect } from 'react-redux';
// importing the reusable state from cart.selector.js
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { toggleCartHidden } from '../../redux/cart/cart.action';
// importing reselect
import { createStructuredSelector } from 'reselect';

//  using router
import { withRouter } from  'react-router-dom';

import CustomButton from '../custombutton/CustomButton';
import CartItem from '../cart-item/CartItem';

import './cartdropdown.scss';


const CartDropdown = ({ cartItems, history, dispatch }) => (
	<div className="cart-dropdown">
		<div className="cart-items">
			{ cartItems.length ? (
				cartItems.map(cartItem => (
				<CartItem key={cartItem.id} item={cartItem} />
				))
			) : (
				<span className="empty-message">Your cart is empty</span>
			)}
		</div>
			<CustomButton onClick={() => {
				history.push('/checkout');
				dispatch(toggleCartHidden())
			}}>
				GO TO CHECKOUT
			</CustomButton>
	</div>
);

// using redux

const mapStateToProps = createStructuredSelector ({
	cartItems: selectCartItems
});

// with redux
export default  withRouter(
	connect(
	mapStateToProps
)(CartDropdown));

// without redux
// export default  CartDropdown;
