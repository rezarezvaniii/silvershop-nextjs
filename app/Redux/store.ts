import { configureStore } from "@reduxjs/toolkit";
import cardSlice from "./features/card-slice";

const store = configureStore({
    reducer: {
      cardSlice

    },


})

export default store;

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch