import { configureStore } from "@reduxjs/toolkit";
import inputReducer from "../features/form/formSlice";
import statusbarReducer from "../features/statusbar/statusbarSlice";

export const store = configureStore({
  reducer: {
    input: inputReducer,
    statusbar: statusbarReducer,
  },
});
