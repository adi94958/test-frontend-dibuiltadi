import { useSelector } from "react-redux";

const MainLayout = ({ children }) => {
  const isCollapsed = useSelector((state) => state.sidebar.isCollapsed);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Content area yang menyesuaikan dengan sidebar */}
      <div
        className={`
          flex-1 transition-all duration-300 ease-in-out
          ${isCollapsed ? "lg:ml-16" : "lg:ml-64"}
          ml-0
        `}
      >
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
