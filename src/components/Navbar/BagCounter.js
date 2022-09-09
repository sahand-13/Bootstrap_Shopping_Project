import React, { useEffect, useState } from "react";
import useShoppingCart from "../../hooks/useShoppingCart";
import RubberBand from "react-reveal/RubberBand";
import { v4 as uuidv4 } from "uuid";

const BagCounter = () => {
  const [counter, setCounter] = useState(0);
  const { cart, GetAllCount } = useShoppingCart();
  useEffect(() => {
    setCounter(GetAllCount());
  }, [cart]);
  return <RubberBand key={uuidv4()}>{counter}</RubberBand>;
};

export default BagCounter;
