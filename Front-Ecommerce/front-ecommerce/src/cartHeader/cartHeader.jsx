import React from "react";
import logo3 from "../assets/image/logo/logo3.png";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { playOpenSound } from "../components/sounds/Sounds";

const CartHeader = () => {
    const navigate = useNavigate();

    return (
        <header className="w-full bg-black text-white shadow-md">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 relative">

                <button
                    onClick={() => {
                        playOpenSound();
                        setTimeout(() => navigate(-1), 200);
                    }}
                    style={{ backgroundColor: 'transparent' }}
                    className="p-2 bg-transparent hover:bg-gray-800 rounded-full transition"
                >
                    <FaArrowLeft className="text-white w-5 h-5" />
                </button>

                <div className="absolute left-1/2 transform -translate-x-1/2">
                    <img
                        src={logo3}
                        alt="logo"
                        className="h-35 w-auto object-contain cursor-pointer"
                        onClick={(e) => {
                            e.preventDefault();
                            playOpenSound();
                            navigate("/");
                        }}
                    />
                </div>


                <div className="w-8" />
            </div>
        </header>
    );
};

export default CartHeader;
