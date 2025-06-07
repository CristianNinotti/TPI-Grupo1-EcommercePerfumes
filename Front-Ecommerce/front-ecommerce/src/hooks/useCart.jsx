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
    } = useContext(CartContext);

    return {
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        decreaseQuantity,
        totalItems,
    };
};

export default useCart;
