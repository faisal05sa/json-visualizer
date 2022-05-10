import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  searchText: "",
  jsonPath: "root",
  expandAll: false,
  collapseAll: false,
};

export const statusbarSlice = createSlice({
  name: "statusbar",
  initialState,
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes

    removeSearchText: (state) => {
      state.searchText = "";
    },

    updateSearchText: (state, action) => {
      state.searchText = action.payload;
    },

    updateJsonPath: (state, action) => {
      state.jsonPath = action.payload;
    },

    setExpandAll: (state) => {
      state.expandAll = true;
      state.collapseAll = false;
    },

    setCollapseAll: (state) => {
      state.expandAll = false;
      state.collapseAll = true;
    },

    resetExpandCollapseAll: (state) => {
      state.expandAll = false;
      state.collapseAll = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  removeSearchText,
  updateSearchText,
  updateJsonPath,
  setExpandAll,
  setCollapseAll,
  resetExpandCollapseAll,
} = statusbarSlice.actions;

export default statusbarSlice.reducer;
