import {
  Avatar,
  TextInput,
  Button,
  Text,
  Modal,
  Divider,
  Card,
} from "../../components/Elements";
import { MainLayout } from "../../components/Layouts";
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

  // Breadcrumb items
  const breadcrumbItems = [{ label: "Profile" }];

  return (
    <MainLayout
      title="Profile"
      breadcrumbItems={breadcrumbItems}
      showBreadcrumb={true}
    >
      {/* Profile Header Card */}
      <Card variant="outline" padding="lg" className="mb-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar
              profileImage={user?.profileImage}
              name={user?.name || "User"}
              size="2xl"
            />
            <div>
              <Text variant="heading" className="text-xl font-semibold mb-1">
                {user?.name || "User"}
              </Text>
              <Text variant="body" color="muted">
                {user?.roleName || "Role"}
              </Text>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => setIsModalOpen(true)}
            className="w-full md:w-auto"
          >
            Change Password
          </Button>
        </div>
      </Card>

      {/* Profile Details - 2 Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <Card variant="outline" heading="Personal Information" padding="lg">
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Text variant="caption" color="muted" className="mb-2">
                  Full Name
                </Text>
                <Text variant="body" className="font-medium">
                  {user?.name || "-"}
                </Text>
              </div>
              <div>
                <Text variant="caption" color="muted" className="mb-2">
                  User Code
                </Text>
                <Text variant="body" className="font-medium">
                  {user?.code || "-"}
                </Text>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Text variant="caption" color="muted" className="mb-2">
                  Email Address
                </Text>
                <Text variant="body" className="font-medium break-all">
                  {user?.email || "-"}
                </Text>
              </div>
              <div>
                <Text variant="caption" color="muted" className="mb-2">
                  Phone Number
                </Text>
                <Text variant="body" className="font-medium">
                  {user?.phone || "-"}
                </Text>
              </div>
            </div>
          </div>
        </Card>

        {/* Role & Access Information */}
        <Card
          variant="outline"
          heading="Role & Access Information"
          padding="lg"
        >
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Text variant="caption" color="muted" className="mb-2">
                  Role Name
                </Text>
                <Text variant="body" className="font-medium">
                  {user?.roleName || "-"}
                </Text>
              </div>
              <div>
                <Text variant="caption" color="muted" className="mb-2">
                  Role Code
                </Text>
                <Text variant="body" className="font-medium">
                  {user?.roleCode || "-"}
                </Text>
              </div>
            </div>

            {/* Additional space for future role-related info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Text variant="caption" color="muted" className="mb-2">
                  Status
                </Text>
                <Text variant="body" className="font-medium text-green-600">
                  Active
                </Text>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Modal Change Password */}
      {isModalOpen && (
        <Modal.Backdrop onClick={handleCloseModal}>
          <Modal.Container size="md">
            <Modal.Header onClose={handleCloseModal}>
              Change Password
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={handleSubmit} id="changePasswordForm">
                <div className="space-y-4">
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
    </MainLayout>
  );
};

export default ProfilePage;
