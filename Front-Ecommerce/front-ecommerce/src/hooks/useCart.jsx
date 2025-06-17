import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const useCart = () => {
    const {
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        decreaseQuantity,
        totalItems,
        clearCartFrontend,
    } = useContext(CartContext);

    return {
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        decreaseQuantity,
        totalItems,
        clearCartFrontend,
    };
};

export default useCart;
