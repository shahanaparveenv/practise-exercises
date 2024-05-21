import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {  useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ProductCard from "./ProductCard";
import { addToCart } from "../../redux/slices/cartSlice";

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState(null);
 const [loading,setLoading] = useState(true);
 const [relatedProducts, setRelatedProducts] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `https://dummyjson.com/products/${id}`
        );
        setProduct(data);
        const  category  = await axios.get(
          `https://dummyjson.com/products/category/${data.category}`
        );        
        setRelatedProducts(category.data.products.filter(product=>
          product.id!=id));
          
  
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    })();
  }, [id]);
  console.log(relatedProducts);
  return loading ? (
    <div>Loading.....</div>
  ) : (
    <div className="mt-20 ">
      <h1 className="ml-2">\{product.category}</h1>
      <div className="flex ">
        <div className="flex flex-col gap-2 p-5">
          {
            product.images.map((ele) => (
              <img 
              onMouseOver={()=>setActiveImage(ele)}
              className="w-20 object-contain" key={ele} src={ele} alt="" />
            ))}
        </div>
        <img
          className="mt-2 h-98 rounded"
          src={activeImage? activeImage : product.images[0]}
          alt=""
        />
        <div className="ml-10 mt-10 overflow-hidden">
          <h1 className="text-3xl font-semibold">{product.title}</h1>
          <h1 className="text-slate-400 font-semibold">
            Rating : {product.rating}
          </h1>
          <h1 className="text-green-800 font-extrabold text-lg ">
            Rs.{product.price}
          </h1>
          <h1 className="text-red-500">Brand : {product.brand}</h1>
          <p className=" overflow-visible">{product.description}</p>
        
          <div className="flex  justify-center gap-8 mt-20">
        <button className="w-36 h-12 bg-orange-700 text-white  "
         type="submit"
         onClick={() => {
           dispatch(addToCart(product));
           toast.success(`${product.title} added to cart`);
         }}>
          Add to Cart
        </button>
        {/* <button className="w-36 bg-orange-700 text-white "
       >Buy Now</button> */}
      </div></div>
      </div>
     
      <h1 className="text-xl text-red-700 ml-[45%] mt-10 mb-10">Related Products : </h1>
      <div className="grid grid-cols-4 gap-3 p-4 h-30">
      
       
          {
            relatedProducts.map((ele) => (
              <ProductCard prod={ele} key={ele.id}/>
                 ))}
        
      </div>
    </div>
  );
}
export default ProductDetails;
