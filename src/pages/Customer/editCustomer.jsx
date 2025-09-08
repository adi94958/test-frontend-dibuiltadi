import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import Swal from "sweetalert2";

import { MainLayout, FormLayout } from "../../components/Layouts";
import { TextInput } from "../../components/Elements";
import { customerSchema } from "../../validation/customerValidation";
import {
  getCustomerDetail,
  updateCustomer,
  clearError,
  clearCustomerDetail,
} from "../../redux/slices/customerSlice";

const EditCustomer = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const { customerDetail, loading, error, message } = useSelector(
    (state) => state.customer
  );

  
  const formik = useFormik({
    initialValues: {
      name: customerDetail?.name || "",
      identityNo: customerDetail?.identityNo || "",
      npwp: customerDetail?.npwp || "",
      email: customerDetail?.email || "",
      phone: customerDetail?.phone || "",
      mobile_phone: customerDetail?.mobile_phone || "",
    },
    validationSchema: customerSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      
      const cleanData = Object.fromEntries(
        Object.entries(values).filter(
          ([key, value]) => key === "name" || (value && value.trim())
        )
      );

      try {
        await dispatch(
          updateCustomer({ code, customerData: cleanData })
        ).unwrap();
        setUpdateSuccess(true);
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text:
            error?.message || error?.responseMessage || "Something went wrong",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    },
  });

  
  useEffect(() => {
    if (updateSuccess) {
      Swal.fire({
        title: "Berhasil!",
        text: message,
        icon: "success",
        confirmButtonText: "OK",
      });

      navigate("/customers");
      setUpdateSuccess(false);
    }
  }, [updateSuccess, message, navigate]);

  
  useEffect(() => {
    if (code) {
      dispatch(getCustomerDetail(code));
    }

    
    return () => {
      dispatch(clearCustomerDetail());
      dispatch(clearError());
    };
  }, [code, dispatch]);

  
  const handleCancel = () => {
    navigate("/customers");
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = await formik.validateForm();
    formik.setTouched(
      {
        name: true,
        identityNo: true,
        npwp: true,
        email: true,
        phone: true,
        mobile_phone: true,
      },
      false
    );

    
    if (Object.keys(errors).length === 0) {
      formik.handleSubmit(e);
    }
  };

  
  const breadcrumbItems = [
    { label: "Customer Management", href: "/customers" },
    { label: "Edit Customer" },
  ];

  
  if (loading && !customerDetail) {
    return (
      <MainLayout
        title="Edit Customer"
        breadcrumbItems={breadcrumbItems}
        showBreadcrumb={true}
      >
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading customer data...</div>
        </div>
      </MainLayout>
    );
  }

  
  if (error && !customerDetail) {
    return (
      <MainLayout
        title="Edit Customer"
        breadcrumbItems={breadcrumbItems}
        showBreadcrumb={true}
      >
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-red-600">
            Error loading customer data: {error.message || error}
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout
      title={`Edit Customer - ${customerDetail?.name || code}`}
      breadcrumbItems={breadcrumbItems}
      showBreadcrumb={true}
    >
      <FormLayout
        title="Form Edit"
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        submitText="Update"
        cancelText="Cancel"
        isSubmitting={loading}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <div>
            <TextInput
              name="name"
              label="Nama Customer"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.name}
              touched={formik.touched.name}
              required
            />
          </div>

          
          <div>
            <TextInput
              name="identityNo"
              label="Nomor Identitas"
              value={formik.values.identityNo}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.identityNo}
              touched={formik.touched.identityNo}
            />
          </div>

          
          <div>
            <TextInput
              name="npwp"
              label="NPWP"
              value={formik.values.npwp}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.npwp}
              touched={formik.touched.npwp}
            />
          </div>

          
          <div>
            <TextInput
              name="email"
              type="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.email}
              touched={formik.touched.email}
            />
          </div>

          
          <div>
            <TextInput
              name="phone"
              label="Telepon"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.phone}
              touched={formik.touched.phone}
            />
          </div>


          <div>
            <TextInput
              name="mobile_phone"
              label="Nomor HP"
              value={formik.values.mobile_phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.mobile_phone}
              touched={formik.touched.mobile_phone}
            />
          </div>
        </div>
      </FormLayout>
    </MainLayout>
  );
};

export default EditCustomer;
