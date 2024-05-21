import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart:{
            user:null,
            products:[]
        }
    },
    reducers: {
      addToCart:(state, action)=> {
        const index = state.cart.products.findIndex(x=> x.id === action.payload.id)
        index!== -1 ?
        state.cart.products = state.cart.products.map(x=>
            x.id === action.payload.id ? {...x, quantity:x.quantity+1} : x) :
            state.cart.products.push({...action.payload, quantity:1})
      },
        
      removeFromCart:(state, action)=> {
         state.cart.products = state.cart.products.filter((x) => x.id !== action.payload.id);
      },
      incrementQuantity:(state,action)=>{
        state.cart.products = state.cart.products.map(x=>
            x.id === action.payload.id? {...x,quantity:x.quantity+1} :x)
      },
      decrementQuantity:(state,action)=>{
        state.cart.products = state.cart.products.map(x=>
            x.id === action.payload.id && x.quantity>1 ? {...x,quantity:x.quantity-1} :x)      },
    },
  });
  
  export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity } = cartSlice.actions;
  export default cartSlice.reducer;