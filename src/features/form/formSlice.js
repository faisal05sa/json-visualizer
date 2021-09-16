import { createSlice } from "@reduxjs/toolkit";

export const switchesArray = [
  { name: "darkMode", text: "Dark Mode", default: true },
  { name: "monospaceFont", text: "Monospace Font", default: false },
  {
    name: "truncateStrings",
    text: "Truncate Long Strings",
    default: false,
  },
];

let initialState = {
  settings: {
    truncateLimit: 40,
  },
  inputJson: undefined,
};
switchesArray.forEach((control) => {
  initialState.settings[control.name] = control.default;
});

export const inputSlice = createSlice({
  name: "input",
  initialState,
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes

    removeJsonInput: (state) => {
      state.inputJson = undefined;
    },

    updateSettings: (state, action) => {
      const { name, value } = action.payload;
      state.settings[name] = value;
    },

    updateJsonInput: (state, action) => {
      state.inputJson = action.payload;
    },

    addToTruncateLimit: (state, action) => {
      state.settings.truncateLimit += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updateSettings,
  updateJsonInput,
  removeJsonInput,
  addToTruncateLimit,
} = inputSlice.actions;

export default inputSlice.reducer;
