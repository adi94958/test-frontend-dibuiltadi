 
import { useNavigate } from "react-router-dom";
import { Loading, Text, Button, TextInput } from "../../components/Elements";
import AuthLayout from "../../components/Layouts/AuthLayout";
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
        } else if (login.rejected.match(result)) {
          Swal.fire({
            title: "Login Failed!",
            text: "Invalid phone number or password.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      } catch (error) {
        console.error("Login error:", error);
      } finally {
        setIsLoading(false);
      }
    },
  });

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    
    const errors = await formik.validateForm();
    formik.setTouched(
      {
        phone: true,
        password: true,
      },
      false
    );

    
    if (Object.keys(errors).length === 0) {
      formik.handleSubmit(e);
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to continue your journey with us"
    >
      
      <div className="text-center mb-8">
        <Text variant="heading">Login</Text>
      </div>

      
      <form onSubmit={handleSubmit} className="space-y-6">
        
        <TextInput
          name="phone"
          label="Phone Number"
          type="text"
          value={formik.values.phone}
          onChange={formik.handleChange}
          error={formik.errors.phone}
          touched={formik.touched.phone}
        />

        
        <TextInput
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.errors.password}
          touched={formik.touched.password}
        />

        
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
    </AuthLayout>
  );
};

export default LoginPage;
