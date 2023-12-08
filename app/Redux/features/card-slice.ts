import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface CartState {
  items: string[];
}

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<string>) {
      state.items.push(action.payload);
    },
    removeItem(state, action: PayloadAction<number>) {
      const updatedItems = state.items.filter((item:any) => item.id !== action.payload);
      state.items = updatedItems;
    },
  },
});

export const { addItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;