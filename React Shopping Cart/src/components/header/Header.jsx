import { Link, NavLink } from "react-router-dom";
import "./Header.css";
import { useContext, useEffect, useState } from "react";
import UseContext from "../../contexts/todoContext/UseContext";
import { useDispatch, useSelector } from "react-redux";
const navItems = [
  { page: "home", link: "/" },
  { page: "login", link: "/login" },
  { page: "cart", link: "/cart" },
];

function Header() {
  const { user, setUser } = useContext(UseContext);
  const [searchItem, setSearchItem] = useState();
  const [products, setProducts] = useState([]);

  // const cart = useSelector((state) => state.cart.cart);
  // console.log(cart);
 
  const handleInputChange = (e) => { 
    const searchTerm = e.target.value;
    setSearchItem(searchTerm)
  }
  console.log(searchItem);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("https://dummyjson.com/products");
        setProducts(data.products);
       
      } catch (error) {
        console.log(error);
      
      }
    })();
  }, []);
  return (
    <div className="header">
      <div className="header-wrapper  fixed top-0">
        <div className="flex items-center justify-center">
        <img alt="" className="w-20 h-20" src="https://p1.hiclipart.com/preview/484/369/231/shopping-bag-handbag-tote-bag-paper-bag-yellow-orange-office-supplies-luggage-and-bags-png-clipart.jpg" />
        <h2 className="font-['Open_Sans'] text-2xl text-pink-800" >Ecart</h2>
        </div>
        <div className="w-[50%]">      
      <input
      className="border w-full  shadow shadow-gray-400 justify-center items-center"
        type="text"
        value={searchItem}
        onChange={handleInputChange}
        placeholder='Search...'
      />
     
    </div>
        <ul>
          {navItems.map((ele) => (
            <NavLink
              className={({ isActive }) =>
                isActive ? "nav-active" : "not-active"
              }
              key={ele.page}
              to={ele.link}
            >
              <li>{ele.page}</li>
            </NavLink>
          ))}
          
        </ul>
      </div>
    </div>
  );
}
export default Header;
