import { useNavigate } from "react-router-dom";
import { Loading, Text } from "../../components/atoms";
import { Button, TextInput } from "../../components/molecules";
import { useDispatch } from "react-redux";
import { register } from "../../redux/slices/authSlice";
import { registerSchema } from "../../validation/authValidation";
import { useFormik } from "formik";
import { useState } from "react";
import Swal from "sweetalert2";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Setup formik dengan validasi
  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      address: "",
      password: "",
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const result = await dispatch(
          register({
            name: values.name,
            phone: values.phone,
            email: values.email,
            address: values.address,
            password: values.password,
          })
        );

        if (register.fulfilled.match(result)) {
          Swal.fire({
            title: "Registration Success!",
            text: "Account created successfully. Please login to continue.",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            navigate("/login");
          });
        }
      } catch (error) {
        console.error("Registration error:", error);
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
        name: true,
        phone: true,
        email: true,
        address: true,
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
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 relative">
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
            <Text variant="heading" color="white" className="mb-4">
              Join Us Today
            </Text>
            <Text variant="title" color="white" className="opacity-90">
              Create your account and start your amazing journey
            </Text>
          </div>
        </div>
      </div>

      {/* Form Register */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Register</h2>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Input Name */}
              <TextInput
                name="name"
                label="Full Name"
                type="text"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.errors.name}
                touched={formik.touched.name}
              />

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

              {/* Input Email */}
              <TextInput
                name="email"
                label="Email Address"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.errors.email}
                touched={formik.touched.email}
              />

              {/* Input Address */}
              <TextInput
                name="address"
                label="Address"
                type="text"
                value={formik.values.address}
                onChange={formik.handleChange}
                error={formik.errors.address}
                touched={formik.touched.address}
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
                    <span>Creating Account...</span>
                  </div>
                ) : (
                  "Register"
                )}
              </Button>
            </form>

            {/* Link Sign In */}
            <div className="text-center mt-8">
              <p className="text-gray-600">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    navigate("/login");
                  }}
                  className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors duration-200 cursor-pointer"
                >
                  Sign In
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
