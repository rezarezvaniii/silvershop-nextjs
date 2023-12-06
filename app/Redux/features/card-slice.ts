import { createSlice , PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";

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
        removeItem(state, action: PayloadAction< number | string>) {
          console.log("this is a initial state ",initialState)
          console.log("my state =",action.payload)
          const updateItems = state.items.filter(item => item!== action.payload)
          state.items = updateItems
          console.log("this is a code item",updateItems.filter(item => item !== action.payload));
          
          // console.log("my action =" , state.items.filter(item=> item !== action.payload))
          // state.items = state.items.filter(item => item !== action.payload);
        },
      },
})

export const { addItem, removeItem } = card.actions;
export default card.reducer;