import { useNavigate } from "react-router-dom";
import { Loading, Text } from "../../components/atoms";
import { Button, TextInput } from "../../components/molecules";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/authSlice";
import { loginSchema } from "../../validation/authValidation";
import { useFormik } from "formik";
import { useState } from "react";
import Swal from "sweetalert2";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Setup formik dengan validasi
  const formik = useFormik({
    initialValues: {
      phone: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const result = await dispatch(
          login({
            phone: values.phone,
            password: values.password,
          })
        );

        if (login.fulfilled.match(result)) {
          Swal.fire({
            title: "Login Success!",
            text: "Welcome back!",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            navigate("/");
          });
        }
      } catch (error) {
        console.error("Login error:", error);
      } finally {
        setIsLoading(false);
      }
    },
  });

  // Handle submit - lebih sederhana
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi semua field sekaligus
    const errors = await formik.validateForm();
    formik.setTouched(
      {
        phone: true,
        password: true,
      },
      false
    );

    // Submit jika tidak ada error
    if (Object.keys(errors).length === 0) {
      formik.handleSubmit(e);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar Ilustrasi */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-pink-400 via-purple-500 to-blue-600 relative">
        <div className="absolute inset-0 bg-black/10"></div>

        <div className="relative w-full h-full flex items-center justify-center text-white text-center px-8">
          {/* Ilustrasi Sederhana */}
          <div>
            {/* Matahari */}
            <div className="w-20 h-20 bg-yellow-300/80 rounded-full mx-auto mb-8 shadow-lg"></div>

            {/* Gunung dan Danau */}
            <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto mb-8">
              <polygon
                points="0,120 100,60 200,80 300,40 400,70 400,200 0,200"
                fill="rgba(255,255,255,0.2)"
              />
              <polygon
                points="0,140 80,90 160,100 240,70 320,90 400,110 400,200 0,200"
                fill="rgba(255,255,255,0.3)"
              />
              <ellipse
                cx="200"
                cy="160"
                rx="150"
                ry="20"
                fill="rgba(255,255,255,0.4)"
              />
            </svg>

            {/* Teks Welcome */}
            <Text variant="heading" color="white" className="mb-2">
              Welcome Back
            </Text>
            <Text
              variant="title"
              color="white"
              className="opacity-90 text-normal"
            >
              Sign in to continue your journey with us
            </Text>
          </div>
        </div>
      </div>

      {/* Form Login */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <Text variant="heading">Login</Text>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Input Phone */}
              <TextInput
                name="phone"
                label="Phone Number"
                type="text"
                value={formik.values.phone}
                onChange={formik.handleChange}
                error={formik.errors.phone}
                touched={formik.touched.phone}
              />

              {/* Input Password */}
              <TextInput
                name="password"
                label="Password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.errors.password}
                touched={formik.touched.password}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                variant="solid"
                color="primary"
                rounded={true}
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loading color="white" size="sm" />
                    <span>Signing in...</span>
                  </div>
                ) : (
                  "Login"
                )}
              </Button>
            </form>

            {/* Link Sign Up */}
            <div className="text-center mt-8">
              <p className="text-gray-600">
                Create an account{" "}
                <button
                  type="button"
                  onClick={() => {
                    navigate("/register");
                  }}
                  className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200 cursor-pointer"
                >
                  Sign Up
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
