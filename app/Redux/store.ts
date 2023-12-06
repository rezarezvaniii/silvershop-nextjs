import { configureStore } from "@reduxjs/toolkit";
import cardSlice from "./features/card-slice";
import { TypedUseSelectorHook } from "react-redux";
import { useSelector } from "react-redux";
const store = configureStore({
    reducer: {
      cardSlice

    },


})

export default store;

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;