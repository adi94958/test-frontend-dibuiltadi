import { Text, Breadcrumb } from "../Elements";

const MainLayout = ({
  children,
  title,
  breadcrumbItems = [],
  showBreadcrumb = true,
  className = "",
  caption,
}) => {
  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      {/* Header Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            {/* Breadcrumb - Only show if there are items (not just Dashboard alone) */}
            {showBreadcrumb && breadcrumbItems.length > 0 && (
              <div className="mb-4">
                <Breadcrumb items={breadcrumbItems} size="sm" homeUrl="/" />
              </div>
            )}

            {/* Page Title */}
            <div>
              <Text
                variant="heading"
                color="dark"
                className="text-2xl sm:text-3xl font-bold"
              >
                {title}
              </Text>
              {caption && (
                <Text variant="body" className="mt-2">
                  {caption}
                </Text>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
