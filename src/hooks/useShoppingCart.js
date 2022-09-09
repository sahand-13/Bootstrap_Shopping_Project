import { useContext } from "react";
import { ShoppingCartContext } from "../contexts/ShoppingContext";

const useShoppingCart = () => useContext(ShoppingCartContext);

export default useShoppingCart;
