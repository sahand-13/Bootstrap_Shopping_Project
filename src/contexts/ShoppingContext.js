import React, { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const initial = {
  cart: [],
  GetItemsCount: () => {},
  inCreaseCartQuantity: () => {},
  deCreaseCartQuantity: () => {},
  removeItem: () => {},
  GetAllCount: () => {},
};
const ShoppingCartContext = createContext(initial);
const ShoppingProvider = ({ children }) => {
  const [cart, setCart] = useLocalStorage("ShoppingCart", initial.cart);
  const GetItemsCount = (id) => {
    return cart.find((item) => item.id === id)?.Count || 0;
  };
  const GetAllCount = () => {
    let Counter = 0;
    cart.forEach((item) => {
      Counter += item.Count;
    });
    return Counter;
  };
  const inCreaseCartQuantity = (id) => {
    debugger;
    setCart((currentItems) => {
      if (currentItems.find((item) => item.id === id) == null) {
        return [...currentItems, { id, Count: 1 }];
      }
      return currentItems.map((item) => {
        if (item.id === id) {
          return { ...item, Count: item.Count + 1 };
        }
        return item;
      });
    });
  };
  const deCreaseCartQuantity = (id) => {
    debugger;
    setCart((currentItems) => {
      if (currentItems.find((item) => item.id === id)?.Count === 1) {
        return currentItems.filter((item) => item.id !== id);
      }
      return currentItems.map((item) => {
        if (item.id === id) {
          return { ...item, Count: item.Count - 1 };
        }
        return item;
      });
    });
  };
  const removeItem = (id) => {
    setCart((currentItems) => {
      return currentItems.filter((item) => item.id !== id);
    });
  };
  return (
    <ShoppingCartContext.Provider
      value={{
        cart,
        GetItemsCount,
        inCreaseCartQuantity,
        deCreaseCartQuantity,
        removeItem,
        GetAllCount,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

export { ShoppingCartContext, ShoppingProvider };
