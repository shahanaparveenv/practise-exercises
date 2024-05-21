function LoadingCard() {
  return (
    <div className="flex gap-2 animate-pulse justify-between duration-300 shadow-md shadow-grey-100 rounded-md overflow-hidden flex-col items-center">
      <img
        className="w-full h-60 object-cover object-center "
        src="https://i2.wp.com/asvs.in/wp-content/uploads/2017/08/dummy.png?fit=399%2C275"
        alt=""
      />

      <div className="w-full p-5 flex flex-col gap-2">
        <div className="bg-gray-500 w-28 h-4 rounded"></div>
        <div className="flex justify-between items-center">
          <div className="bg-gray-500 w-16 h-4 rounded"></div>
          <div className="bg-gray-500 w-16 h-4 rounded"></div>
        </div>
        <div className="flex w-full h-15 justify-center items-center text-lg">
          <button className=" border bg-gray-500 rounded w-[70%] mb-4 border-yellow-700">
            <i className="fa-solid fa-cart-plus ml-3 cursor-pointer"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
export default LoadingCard;
