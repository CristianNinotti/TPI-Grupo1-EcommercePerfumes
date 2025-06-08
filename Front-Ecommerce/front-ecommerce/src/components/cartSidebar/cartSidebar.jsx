import { useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";

function CartSidebar({ isOpen, onClose, lastAddedProduct }) {
    const { mode } = useTheme();
    
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
        };
        if (isOpen) {
            document.addEventListener("keydown", handleEsc);
        }
        return () => {
            document.removeEventListener("keydown", handleEsc);
        };
    }, [isOpen, onClose]);

    return (
        <div className={`fixed inset-0 z-40 flex transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/20 transition-opacity duration-300"
                onClick={onClose}
            />

            {/* Sidebar con animación */}
            <div
                className={`ml-auto h-full w-80 shadow-lg z-50 transform transition-transform duration-300 ${
                    isOpen ? "translate-x-0" : "translate-x-full"
                } ${mode === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"}`}
            >
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-lg font-semibold">Producto Agregado</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-600 hover:text-red-500 text-2xl leading-none"
                    >
                        ×
                    </button>
                </div>
                <div className="p-4 flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                        <span className="text-green-600 text-3xl">✔</span>
                    </div>
                    <p className={`mb-6 ${mode === "dark" ? "text-white" : "text-gray-700"}`}>
                        ¡Producto agregado al carrito!
                    </p>
                    {lastAddedProduct && (
                        <div className="mb-4 flex flex-col items-center w-full">
                            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-2 relative">
                                {lastAddedProduct.product?.name && (
                                    <img
                                        src={`images/perfumes/${lastAddedProduct.product.name}.png`}
                                        alt={lastAddedProduct.product.name}
                                        className="w-16 h-16 object-contain rounded-full"
                                    />
                                )}
                                <span className="absolute bottom-1 right-1 bg-green-500 text-white rounded-full p-1 text-lg border-2 border-white">✔</span>
                            </div>
                            <div className="text-center w-full">
                                <p className="font-bold text-base">{lastAddedProduct.product?.name || lastAddedProduct.name}</p>
                                <p className="text-sm text-gray-500">{lastAddedProduct.product?.marca || lastAddedProduct.marca}</p>
                                <p className="text-sm">{lastAddedProduct.product?.description || lastAddedProduct.description}</p>
                                <p className="text-sm">Precio: ${lastAddedProduct.price?.toFixed ? lastAddedProduct.price.toFixed(2) : lastAddedProduct.price}</p>
                                <p className="text-sm">Cantidad: {lastAddedProduct.quantity}</p>
                            </div>
                        </div>
                    )}
                    <div className="flex flex-col gap-2 w-full">
                        <button
                            onClick={() => {
                                onClose();
                                window.location.href = "/cart";
                            }}
                            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                        >
                            Ir al carrito
                        </button>
                        <button
                            onClick={onClose}
                            className="bg-gray-300 text-gray-800 py-2 rounded hover:bg-gray-400 transition"
                        >
                            Seguir comprando
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartSidebar;
