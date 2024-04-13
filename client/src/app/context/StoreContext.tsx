import { PropsWithChildren, createContext, useContext, useState } from "react";
import { Cart } from "../models/cart";

interface StoreContextValue {
  removeItem: (productId: number, quantity: number) => void;
  setCart: (cart: Cart) => void;
  cart: Cart | null;
}

export const StoreContext = createContext<StoreContextValue | undefined>(
  undefined
);

// eslint-disable-next-line react-refresh/only-export-components
export function useStoreContext() {
  const context = useContext(StoreContext);

  if (context === undefined) {
    throw Error(
      "Oops - we are not inside the app.tsx so we do not have access to the context"
    );
  }

  return context;
}

export function StoreProvider({ children }: PropsWithChildren<unknown>) {
  const [cart, setCart] = useState<Cart | null>(null);

  function removeItem(productId: number, quantity: number) {
    if (!cart) return;
    const items = [...cart.items]; // new array of items
    const itemIndex = items.findIndex((i) => i.productId === productId);
    if (itemIndex >= 0) {
      items[itemIndex].quantity -= quantity;
      if (items[itemIndex].quantity === 0) items.splice(itemIndex, 1);
      setCart({ ...cart, items }); // Use the current cart state instead of prevState
    }
  }

  return (
    <StoreContext.Provider value={{ cart, setCart, removeItem }}>
      {children}
    </StoreContext.Provider>
  );
}
