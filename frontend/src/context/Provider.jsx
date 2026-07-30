import { useState } from "react";
import { Context } from "./Context";

const Provider = ({ children }) => {
  const [calcular, setCalcular] = useState((a, b) => {
    return a + b;
  });

  const ContextValue = {
    calcular,
    setCalcular,
  };

  return <Context.Provider value={ContextValue}>{children}</Context.Provider>;
};

export default Provider;
