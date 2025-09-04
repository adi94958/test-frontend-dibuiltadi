// components/layouts/AuthLayout.jsx
import { Card, Text } from "../Elements";

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar Ilustrasi */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-pink-400 via-purple-500 to-blue-600 relative">
        <div className="absolute inset-0 bg-black/10"></div>

        <div className="relative w-full h-full flex items-center justify-center text-white text-center px-8">
          {/* Ilustrasi Sederhana */}
          <div>
            {/* Teks Welcome */}
            <Text variant="heading" color="white" className="mb-4">
              {title}
            </Text>
            <Text variant="title" color="white" className="opacity-90">
              {subtitle}
            </Text>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="w-full lg:w-1/2 flex items-center p-8 justify-center">
        <Card variant="outline" padding="lg" className="w-full max-w-md">
          {children}
        </Card>
      </div>
    </div>
  );
};

export default AuthLayout;
