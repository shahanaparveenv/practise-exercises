import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../redux/slices/cartSlice";
import { toast } from "react-toastify";

function ProductCard({ prod }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="flex gap-2 cursor-pointer hover:scale-105 duration-300 shadow-md shadow-gray-400 rounded-md overflow-hidden flex-col items-center">
    <div
      className="flex gap-2 cursor-pointer  rounded-md overflow-hidden flex-col items-center"
      onClick={() => navigate(`/productdetails/${prod.id}`)}
    >
      <img
        className="w-full h-60 rounded object-cover object-center"
        src={prod.thumbnail}
        alt=""
      />

      <div className="w-full p-5 hover:bg-gray-100 ">
        <h2 className="text-center hover:text-blue-900 text-l font-bold">
          {prod.title}
        </h2>
        <div className="w-full mt-1">
          <h3 className="text-sm">Brand : {prod.brand}</h3>
        </div>
        <div className="flex justify-between items-center mt-1">
          <h2 className="text-red-600 font-bold">${prod.price}</h2>
          <h2 className="text-green-600 font-bold">
            {prod.discountPercentage}% off
          </h2>
        </div>
        </div>
       
    </div>
    <div className="flex w-full h-15 justify-center items-center text-lg">
          <button className=" border rounded w-[70%] mb-4 border-yellow-700"
           type="submit"
           onClick={() => {
             dispatch(addToCart(prod));
             toast.success(`${prod.title} added to cart`);
           }}>
            Add to Cart
            <i
              className="fa-solid fa-cart-plus ml-3 cursor-pointer"
             
            ></i>
          </button>
        
      </div>
    </div>
  );
}
export default ProductCard;
