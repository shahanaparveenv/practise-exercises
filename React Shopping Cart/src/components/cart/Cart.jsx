import {  useSelector } from "react-redux";
import CartItem from "./CartItem";
import { current } from "@reduxjs/toolkit";

const Cart = () => {
  const cart = useSelector((state) => state.cart.cart);

  return (
    <div className=" w-full flex flex-col mt-12 gap-1 items-center p-10">
      {cart.products.map((prod) => (
        <CartItem prod={prod} key={prod.id} />
      ))}
      <div className="w-full flex justify-between">
        <button className="w-48 h-10 bg-green-700 rounded text-white">Place Order</button>
        <h1>Sub Total : $ {cart.products.reduce((acc, cur)=> (acc += cur.price*cur.quantity), 0)}</h1>
        </div>
    </div>
  );
};

export default Cart;
