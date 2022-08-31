import { configureStore } from "@reduxjs/toolkit";

import searchReduce from "./searchSlice";
const store = configureStore({
  reducer: {
    searchReduce: searchReduce.reducer,
  },
});
export default store;
