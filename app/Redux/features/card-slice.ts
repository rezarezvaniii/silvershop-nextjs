import { createSlice , PayloadAction } from "@reduxjs/toolkit";

interface CartState {
    items: string[];
  }
  
  const initialState: CartState = {
    items: [],
  };



export const card = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<string>) {
          state.items.push(action.payload);
        },
        removeItem(state, action: PayloadAction<string>) {
          state.items = state.items.filter(item => item !== action.payload);
        },
      },
})

export const { addItem, removeItem } = card.actions;
export default card.reducer;