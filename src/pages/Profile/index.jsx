import {
  Avatar,
  TextInput,
  Button,
  Text,
  Modal,
  Divider,
  Card,
} from "../../components/Elements";
import { useSelector, useDispatch } from "react-redux";
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
    <div className="min-h-screen bg-gray-50 p-5">
      {/* Profile Content */}
      <Card variant="outline" padding="none" className="w-full mx-auto overflow-hidden">
        {/* Profile Header Card */}
        <div className="flex flex-col sm:flex-row justify-between p-4 sm:p-6">
          <div className="flex flex-row items-center space-y-0 space-x-4 sm:space-x-6 mb-4 sm:mb-0">
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

          <div className="flex justify-end items-center">
            <Button
              variant="outline"
              className="justify-center w-full sm:w-auto"
              onClick={() => setIsModalOpen(true)}
            >
              Change Password
            </Button>
          </div>
        </div>

        {/* Full Width Divider */}
        <Divider thickness="1px" color="bg-gray-200" />

        {/* Profile Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 p-4 sm:p-6">
          {/* Personal Information */}
          <Card variant="outline" heading="Personal Information">
            <div className="space-y-4">
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
          </Card>

          {/* Work Information */}
          <Card variant="outline" heading="Role & Access Information">
            <div className="space-y-4">
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
          </Card>

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
      </Card>
    </div>
  );
};

export default ProfilePage;
