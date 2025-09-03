import { Avatar, TextInput } from "../../components/molecules";
import { Button } from "../../components/molecules";
import { useSelector, useDispatch } from "react-redux";
import { Text } from "../../components/atoms";
import Modal from "../../components/molecules/Modal";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { changePasswordSchema } from "../../validation/authValidation";
import {
  updatePassword,
  clearUpdateError,
  clearUpdateSuccess,
} from "../../redux/slices/authSlice";
import Swal from "sweetalert2";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user, loading, error, updateSuccess, updateError, message } =
    useSelector((state) => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Setup formik untuk change password
  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: changePasswordSchema,
    onSubmit: async (values) => {
      dispatch(
        updatePassword({
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
          newPasswordConfirmation: values.confirmPassword,
        })
      );
    },
  });

  useEffect(() => {
    if (updateSuccess) {
      Swal.fire({
        title: "Success!",
        text: message,
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        setIsModalOpen(false);
        formik.resetForm();
        dispatch(clearUpdateSuccess());
      });
    }
  }, [updateSuccess, message, dispatch, formik]);

  useEffect(() => {
    if (updateError) {
      const messError = [
        error?.currentPassword,
        error?.newPassword,
        error?.confirmPassword,
      ].filter(Boolean);

      Swal.fire({
        title: message,
        text: messError.join("\n"),
        icon: "error",
        confirmButtonText: "OK",
      }).then(() => {
        formik.resetForm();
        dispatch(clearUpdateError());
      });
    }
  }, [updateError, error, message, dispatch, formik]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    formik.resetForm();
    dispatch(clearUpdateError());
  };

  // Handle submit dengan validasi
  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = await formik.validateForm();
    formik.setTouched(
      {
        currentPassword: true,
        newPassword: true,
        confirmPassword: true,
      },
      false
    );

    // Submit jika tidak ada error
    if (Object.keys(errors).length === 0) {
      formik.handleSubmit(e);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Profile Content */}
      <div className="w-full mx-auto p-6">
        {/* Profile Header Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex mb-6 flex-col sm:flex-row justify-between">
          <div className="p-6">
            <div className="flex flex-row items-center space-y-0 space-x-6">
              {/* Profile Avatar */}
              <div className="relative">
                <Avatar
                  profileImage={user?.profileImage}
                  name={user?.name || "User"}
                  size="2xl"
                />
              </div>

              {/* User Info */}
              <div className="flex-1">
                <div>
                  <Text variant="subheading">{user?.name}</Text>
                  <Text variant="caption">{user?.roleName}</Text>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end items-center p-6">
            <Button
              variant="outline"
              className="justify-center w-full sm:w-auto"
              onClick={() => setIsModalOpen(true)}
            >
              Change Password
            </Button>
          </div>
        </div>

        {/* Profile Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Personal Information
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <p className="text-gray-900">{user?.name || "-"}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <p className="text-gray-900">{user?.email || "-"}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <p className="text-gray-900">{user?.phone || "-"}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  User Code
                </label>
                <p className="text-gray-900">{user?.code || "-"}</p>
              </div>
            </div>
          </div>

          {/* Work Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Role & Access Information
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role Name
                </label>
                <p className="text-gray-900">{user?.roleName || "-"}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role Code
                </label>
                <p className="text-gray-900">{user?.roleCode || "-"}</p>
              </div>
            </div>
          </div>

          {/* Modal Changes Password with Nested Components */}
          {isModalOpen && (
            <Modal.Backdrop onClick={handleCloseModal}>
              <Modal.Container size="md">
                <Modal.Header onClose={handleCloseModal}>
                  Change Password
                </Modal.Header>
                <Modal.Body>
                  <form onSubmit={handleSubmit} id="changePasswordForm">
                    <div className="space-y-4">
                      <div>
                        <TextInput
                          name="currentPassword"
                          type="password"
                          label="Current Password"
                          value={formik.values.currentPassword}
                          onChange={formik.handleChange}
                          error={formik.errors.currentPassword}
                          touched={formik.touched.currentPassword}
                          required
                        />
                      </div>
                      <div>
                        <TextInput
                          name="newPassword"
                          type="password"
                          label="New Password"
                          value={formik.values.newPassword}
                          onChange={formik.handleChange}
                          error={formik.errors.newPassword}
                          touched={formik.touched.newPassword}
                          required
                        />
                      </div>
                      <div>
                        <TextInput
                          name="confirmPassword"
                          type="password"
                          label="Confirm New Password"
                          value={formik.values.confirmPassword}
                          onChange={formik.handleChange}
                          error={formik.errors.confirmPassword}
                          touched={formik.touched.confirmPassword}
                          required
                        />
                      </div>
                    </div>
                  </form>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="outline"
                    onClick={handleCloseModal}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    form="changePasswordForm"
                    variant="primary"
                    disabled={loading}
                  >
                    {loading ? "Updating..." : "Update Password"}
                  </Button>
                </Modal.Footer>
              </Modal.Container>
            </Modal.Backdrop>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
