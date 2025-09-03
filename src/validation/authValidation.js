import * as yup from "yup";
import messages from "../messages/authMessages";

export const loginSchema = yup.object().shape({
  phone: yup
    .string()
    .matches(/^[0-9]+$/, messages.phone.digitsOnly)
    .required(messages.phone.required)
    .min(7, messages.phone.minLength)
    .max(20, messages.phone.maxLength),
  password: yup
    .string()
    .required(messages.password.required)
    .min(8, messages.password.minLength)
    .max(50, messages.password.maxLength),
});

export const changePasswordSchema = yup.object().shape({
  currentPassword: yup
    .string()
    .required(messages.currentPassword.required)
    .min(8, messages.currentPassword.minLength)
    .max(50, messages.currentPassword.maxLength),

  newPassword: yup
    .string()
    .required(messages.newPassword.required)
    .min(8, messages.newPassword.minLength)
    .max(50, messages.newPassword.maxLength)
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, messages.newPassword.pattern),

  confirmPassword: yup
    .string()
    .required(messages.confirmPassword.required)
    .oneOf([yup.ref("newPassword")], messages.confirmPassword.mismatch),
});

export const registerSchema = yup.object().shape({
  name: yup
    .string()
    .required(messages.name.required)
    .min(3, messages.name.minLength)
    .max(50, messages.name.maxLength),
  email: yup
    .string()
    .required(messages.email.required)
    .email(messages.email.invalid)
    .min(3, messages.email.minLength)
    .max(50, messages.email.maxLength),
  phone: yup
    .string()
    .matches(/^[0-9]+$/, messages.phone.digitsOnly)
    .required(messages.phone.required)
    .min(7, messages.phone.minLength)
    .max(20, messages.phone.maxLength),
  address: yup
    .string()
    .required(messages.address.required)
    .min(3, messages.address.minLength)
    .max(50, messages.address.maxLength),
  password: yup
    .string()
    .required(messages.newPassword.required)
    .min(8, messages.newPassword.minLength)
    .max(50, messages.newPassword.maxLength)
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, messages.newPassword.pattern),
});
