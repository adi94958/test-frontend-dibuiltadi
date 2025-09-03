import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCollapsed: false,
  isMobileMenuOpen: false,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isCollapsed = !state.isCollapsed;
    },
    setSidebarCollapsed: (state, action) => {
      state.isCollapsed = action.payload;
    },
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
    setMobileMenuOpen: (state, action) => {
      state.isMobileMenuOpen = action.payload;
    },
    closeMobileMenu: (state) => {
      state.isMobileMenuOpen = false;
    },
  },
});

export const {
  toggleSidebar,
  setSidebarCollapsed,
  toggleMobileMenu,
  setMobileMenuOpen,
  closeMobileMenu,
} = sidebarSlice.actions;

export default sidebarSlice.reducer;
