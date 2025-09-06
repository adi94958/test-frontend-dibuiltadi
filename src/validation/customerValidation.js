import * as yup from "yup";
import messages from "./../messages/customerMessages";

export const customerSchema = yup.object().shape({
  name: yup
    .string()
    .required(messages.name.required)
    .min(3, messages.name.minLength)
    .max(50, messages.name.maxLength),
  identityNo: yup
    .string()
    .max(30, messages.identityNo.maxLength)
    .notRequired()
    .nullable(),
  npwp: yup
    .string()
    .matches(/^[0-9.-]+$/, messages.npwp.pattern)
    .min(15, messages.npwp.minLength)
    .max(20, messages.npwp.maxLength)
    .notRequired()
    .nullable(),
  email: yup
    .string()
    .email(messages.email.invalid)
    .min(3, messages.email.minLength)
    .max(50, messages.email.maxLength)
    .notRequired()
    .nullable(),
  phone: yup
    .string()
    .matches(/^[0-9]+$/, messages.phone.digitsOnly)
    .min(7, messages.phone.minLength)
    .max(20, messages.phone.maxLength)
    .notRequired()
    .nullable(),
  mobilePhone: yup
    .string()
    .matches(/^[0-9]+$/, messages.mobilePhone.digitsOnly)
    .min(7, messages.mobilePhone.minLength)
    .max(20, messages.mobilePhone.maxLength)
    .notRequired()
    .nullable(),
});

// Schema for add customer with additional required fields
export const addCustomerSchema = yup.object().shape({
  name: yup
    .string()
    .required(messages.name.required)
    .min(3, messages.name.minLength)
    .max(50, messages.name.maxLength),
  identityNo: yup
    .string()
    .max(30, messages.identityNo.maxLength)
    .notRequired()
    .nullable(),
  npwp: yup
    .string()
    .matches(/^[0-9.-]+$/, messages.npwp.pattern)
    .min(15, messages.npwp.minLength)
    .max(20, messages.npwp.maxLength)
    .notRequired()
    .nullable(),
  email: yup
    .string()
    .email(messages.email.invalid)
    .min(3, messages.email.minLength)
    .max(50, messages.email.maxLength)
    .notRequired()
    .nullable(),
  phone: yup
    .string()
    .matches(/^[0-9]+$/, messages.phone.digitsOnly)
    .min(7, messages.phone.minLength)
    .max(20, messages.phone.maxLength)
    .notRequired()
    .nullable(),
  mobile_phone: yup
    .string()
    .matches(/^[0-9]+$/, messages.mobilePhone.digitsOnly)
    .min(7, messages.mobilePhone.minLength)
    .max(20, messages.mobilePhone.maxLength)
    .notRequired()
    .nullable(),
  provinceCode: yup
    .string()
    .required(messages.provinceCode.required),
  cityCode: yup
    .string()
    .required(messages.cityCode.required),
  address: yup
    .string()
    .required(messages.address.required)
    .min(10, messages.address.minLength)
    .max(200, messages.address.maxLength),
  companyType: yup
    .string()
    .required(messages.companyType.required)
    .oneOf(['person', 'company'], messages.companyType.invalid),
});
