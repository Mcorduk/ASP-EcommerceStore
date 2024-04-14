import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Cart } from "../../app/models/cart";
import agent from "../../app/api/agent";

interface CartState {
  cart: Cart | null;
  status: string;
}

const initialState: CartState = {
  cart: null,
  status: "idle",
};

export const addCartItemAsync = createAsyncThunk<
  Cart,
  { productId: number; quantity?: number }
>("cart/addCartItemAsync", async ({ productId, quantity = 1 }, thunkAPI) => {
  try {
    const response = await agent.Cart.addItem(productId, quantity);
    return response.value;
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data });
  }
});

export const removeCartItemAsync = createAsyncThunk<
  void,
  { productId: number; quantity?: number; isDelete?: boolean }
>(
  "cart/removeCartItemAsync",
  async ({ productId, quantity = 1, isDelete = false }, thunkAPI) => {
    try {
      await agent.Cart.removeItem(productId, quantity);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addCartItemAsync.pending, (state, action) => {
      console.log(action);
      state.status = "pendingAddItem" + action.meta.arg.productId;
    });
    builder.addCase(addCartItemAsync.fulfilled, (state, action) => {
      state.cart = action.payload;
      state.status = "idle";
    });
    builder.addCase(addCartItemAsync.rejected, (state, action) => {
      console.log(action.payload);
      state.status = "idle";
    });
    builder.addCase(removeCartItemAsync.pending, (state, action) => {
      const { productId, isDelete } = action.meta.arg;
      state.status = isDelete
        ? "pendingDeleteItem" + productId
        : "pendingRemoveItem" + productId;
    });
    builder.addCase(removeCartItemAsync.fulfilled, (state, action) => {
      const { productId, quantity = 1 } = action.meta.arg;
      const itemIndex = state.cart?.items.findIndex(
        (i) => i.productId === productId
      );
      if (itemIndex === -1 || itemIndex === undefined) return;
      state.cart!.items[itemIndex].quantity -= quantity!;
      if (state.cart!.items[itemIndex].quantity === 0) {
        state.cart!.items.splice(itemIndex, 1);
      }
      state.status = "idle";
    });
    builder.addCase(removeCartItemAsync.rejected, (state, action) => {
      console.log(action.payload);
      state.status = "idle";
    });
  },
});

export const { setCart } = cartSlice.actions;
