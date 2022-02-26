import { createSlice } from '@reduxjs/toolkit';

export const globalSlice = createSlice({
   name: 'global',
   initialState: {
      sideBarOpen: true,
   },
   // The `reducers` field lets us define reducers and generate associated actions
   reducers: {
      toggleSidebar: (state) => {
         state.sideBarOpen = !state.sideBarOpen;
      },
   },
});

export const { toggleSidebar } = globalSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.user.value)`
export const selectSidebar = (state) => state.global.sideBarOpen;

export default globalSlice.reducer;
