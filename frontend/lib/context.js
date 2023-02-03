import { createContext, useContext, useState } from "react";
import { Context } from "urql";

const ShopContext = createContext();

export const StateContext = ({ children }) => {
  const [qty, setQty] = useState(0);
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const increaseQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const decreaseQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 0;
      return prevQty - 1;
    });
  };

  const onAdd=(product,quantity)=>{
    const exist = cartItems.find(item=>item.slug===product.slug);
    if(exist){
        setCartItems(cartItems.map((item)=>item.slug===product.slug ? {...exist,quantity:exist.quantity+quantity}:item));
    }
    else{
        setCartItems([...cartItems,{...product,quantity:quantity}])
    }
  }
  return (
    <ShopContext.Provider
      value={{
        qty,
        increaseQty,
        decreaseQty,
        showCart,
        setShowCart,
        cartItems,
        onAdd,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useStateContext = () => useContext(ShopContext);
