import { createSlice } from "@reduxjs/toolkit";

const categoriesSlice = createSlice({
  name: "listCategory",
  initialState: {
    listCategory: ["Empty"],
  },
  reducers: {
    updateListCategories(state, action) {
      const listCategory = action.payload;

      state.listCategory = [...listCategory];
    },
  },
});

export const categoriesAction = categoriesSlice.actions;
export default categoriesSlice;
