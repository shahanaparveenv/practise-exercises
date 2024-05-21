import React from "react";
import { useDispatch } from "react-redux";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "../../redux/slices/cartSlice";

function CartItem({ prod }) {
  const dispatch = useDispatch();
  return (
    <div className="bg-gray-200 w-full p-2 justify-between gap-6 flex items-center">
      <img className="h-20 w-20 object-cover" src={prod.thumbnail} alt="" />
      <h1>{prod.title}</h1>
      <h1 className="text-red-700">${prod.price}</h1>
      <div className="flex ml-2 justify-center items-center gap-2">
        <button onClick={() => dispatch(decrementQuantity(prod))}>
          <i className="fa-solid fa-minus" />
        </button>
        <h1>{prod.quantity}</h1>
        <button onClick={() => dispatch(incrementQuantity(prod))}>
          <i className="fa-solid fa-plus" />
        </button>
      </div>
      <h1 className="font-bold text-red-900">${prod.quantity * prod.price}</h1>
      <i
        onClick={() => dispatch(removeFromCart(prod))}
        className="fa-solid fa-trash cursor-pointer hover:text-red-500"
      />
    </div>
  );
}

export default CartItem;
