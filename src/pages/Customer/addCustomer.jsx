import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import Swal from "sweetalert2";

import { MainLayout, FormLayout } from "../../components/Layouts";
import { TextInput, SelectInput } from "../../components/Elements";
import { addCustomerSchema } from "../../validation/customerValidation";
import { storeCustomer, clearError } from "../../redux/slices/customerSlice";
import { getProvinces } from "../../redux/slices/provinceSlice";
import { getCities } from "../../redux/slices/citySlice";

const AddCustomer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [createSuccess, setCreateSuccess] = useState(false);

  const { loading, message } = useSelector((state) => state.customer);
  const { provincesList, loading: provincesLoading } = useSelector(
    (state) => state.province
  );
  const { citiesList, loading: citiesLoading } = useSelector(
    (state) => state.city
  );

  // Setup formik untuk add customer
  const formik = useFormik({
    initialValues: {
      name: "",
      identityNo: "",
      npwp: "",
      email: "",
      phone: "",
      mobile_phone: "",
      provinceCode: "",
      cityCode: "",
      address: "",
      companyType: "",
    },
    validationSchema: addCustomerSchema,
    onSubmit: async (values) => {
      // Filter empty optional fields
      const cleanData = Object.fromEntries(
        Object.entries(values).filter(
          ([key, value]) =>
            // Required fields
            [
              "name",
              "provinceCode",
              "cityCode",
              "address",
              "companyType",
            ].includes(key) ||
            // Optional fields with values
            (value && value.trim())
        )
      );

      try {
        await dispatch(storeCustomer(cleanData)).unwrap();
        setCreateSuccess(true);
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

  // Handle success create
  useEffect(() => {
    if (createSuccess) {
      Swal.fire({
        title: "Berhasil!",
        text: message || "Customer berhasil ditambahkan",
        icon: "success",
        confirmButtonText: "OK",
      });

      navigate("/customers");
      setCreateSuccess(false);
    }
  }, [createSuccess, message, navigate]);

  // Fetch provinces and cities saat component mount
  useEffect(() => {
    dispatch(getProvinces());
    dispatch(getCities());

    // Cleanup saat component unmount
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  // Handle cancel
  const handleCancel = () => {
    navigate("/customers");
  };

  // Handle submit dengan validasi
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
        provinceCode: true,
        cityCode: true,
        address: true,
        companyType: true,
      },
      false
    );

    // Submit jika tidak ada error
    if (Object.keys(errors).length === 0) {
      formik.handleSubmit(e);
    }
  };

  // Breadcrumb items
  const breadcrumbItems = [
    { label: "Customer Management", href: "/customers" },
    { label: "Add Customer" },
  ];

  // Prepare options for select inputs
  const provinceOptions = [
    { value: "", label: "Select Province" },
    ...provincesList.map((province) => ({
      value: province.code,
      label: province.name,
    }))
  ];

  const cityOptions = [
    { value: "", label: "Select City" },
    ...citiesList.map((city) => ({
      value: city.code,
      label: city.name,
    }))
  ];

  const companyTypeOptions = [
    { value: "", label: "Select Company Type" },
    { value: "person", label: "Person" },
    { value: "company", label: "Company" },
  ];

  return (
    <MainLayout
      title="Add Customer"
      breadcrumbItems={breadcrumbItems}
      showBreadcrumb={true}
    >
      <FormLayout
        title="Form Add Customer"
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        submitText="Save"
        cancelText="Cancel"
        isSubmitting={loading}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Nama Customer - Required */}
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

          {/* Company Type - Required */}
          <div>
            <SelectInput
              name="companyType"
              labelType="none"
              value={formik.values.companyType}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.companyType}
              touched={formik.touched.companyType}
              options={companyTypeOptions}
              required
            />
          </div>

          {/* Nomor Identitas - Optional */}
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

          {/* NPWP - Optional */}
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

          {/* Email - Optional */}
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

          {/* Telepon - Optional */}
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

          {/* Mobile Phone - Optional */}
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

          {/* City - Required */}
          <div>
            <SelectInput
              name="cityCode"
              labelType="none"
              value={formik.values.cityCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.cityCode}
              touched={formik.touched.cityCode}
              options={cityOptions}
              required
              disabled={citiesLoading}
            />
          </div>

          {/* Province - Required */}
          <div>
            <SelectInput
              name="provinceCode"
              labelType="none"
              value={formik.values.provinceCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.provinceCode}
              touched={formik.touched.provinceCode}
              options={provinceOptions}
              required
              disabled={provincesLoading}
            />
          </div>

          {/* Address - Required - Full width */}
          <div>
            <TextInput
              name="address"
              label="Alamat"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.address}
              touched={formik.touched.address}
              required
              multiline
              rows={3}
            />
          </div>
        </div>
      </FormLayout>
    </MainLayout>
  );
};

export default AddCustomer;
