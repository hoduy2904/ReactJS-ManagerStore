import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchValue: "",
  },
  reducers: {
    searchChange: (state, action) => {
      state.searchValue = action.payload;
    },
  },
});

export default searchSlice;
