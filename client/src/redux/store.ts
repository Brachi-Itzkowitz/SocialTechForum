// redux/store.ts
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: (state = {}) => state, // רידוסר דמה שלא עושה כלום
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
