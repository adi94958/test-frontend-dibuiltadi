import { useSelector, useDispatch } from "react-redux";
import {
  toggleSidebar,
  setSidebarCollapsed,
  toggleMobileMenu,
  setMobileMenuOpen,
  closeMobileMenu,
} from "../redux/slices/sidebarSlice";

export const useSidebar = () => {
  const dispatch = useDispatch();
  const { isCollapsed, isMobileMenuOpen } = useSelector(
    (state) => state.sidebar
  );

  return {
    isCollapsed,
    isMobileMenuOpen,
    toggleSidebar: () => dispatch(toggleSidebar()),
    setSidebarCollapsed: (collapsed) =>
      dispatch(setSidebarCollapsed(collapsed)),
    toggleMobileMenu: () => dispatch(toggleMobileMenu()),
    setMobileMenuOpen: (open) => dispatch(setMobileMenuOpen(open)),
    closeMobileMenu: () => dispatch(closeMobileMenu()),
    setIsCollapsed: (collapsed) => dispatch(setSidebarCollapsed(collapsed)),
    setIsMobileMenuOpen: (open) => dispatch(setMobileMenuOpen(open)),
  };
};
