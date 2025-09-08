 
import { useNavigate } from "react-router-dom";
import { Loading, Button, TextInput } from "../../components/Elements";
import AuthLayout from "../../components/Layouts/AuthLayout";
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

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    
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

    
    if (Object.keys(errors).length === 0) {
      formik.handleSubmit(e);
    }
  };

  return (
    <AuthLayout
      title="Join Us Today"
      subtitle="Create your account and start your amazing journey"
    >
      
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Register</h2>
      </div>

      
      <form onSubmit={handleSubmit} className="space-y-6">
        
        <TextInput
          name="name"
          label="Full Name"
          type="text"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.errors.name}
          touched={formik.touched.name}
        />

        
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
          name="email"
          label="Email Address"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.errors.email}
          touched={formik.touched.email}
        />

        
        <TextInput
          name="address"
          label="Address"
          type="text"
          value={formik.values.address}
          onChange={formik.handleChange}
          error={formik.errors.address}
          touched={formik.touched.address}
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
              <span>Creating Account...</span>
            </div>
          ) : (
            "Register"
          )}
        </Button>
      </form>


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
    </AuthLayout>
  );
};

export default RegisterPage;
