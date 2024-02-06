import * as yup from "yup";

export const userValidation = yup.object().shape({
  name: yup
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(20)
    .matches(
      /^[a-zA-Z][a-zA-Z\s]*$/,
      "Only alphabets and spaces are allowed, and the first character cannot be a space"
    )
    .required("Required"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      "Invalid email address"
    )
    .required("Required"),

  mobile: yup
    .number("Phone number must be a 10 digit number")
    .positive()
    .integer()
    .test("len", "Phone number should be a 10 digit number", (val) =>
      /^\d{10}$/.test(val)
    )
    .required("Required"),
  gender: yup.string().required("Required"),
  education: yup.string().required("Required"),
  address: yup.string().required("Required"),
});
