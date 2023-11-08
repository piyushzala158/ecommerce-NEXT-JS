import * as Yup from "yup";
import YupPassword from "yup-password";
import { mobile_regex } from "../constants/Regex";
import {
  cpassword_required,
  email,
  email_case,
  email_required,
  fname_required,
  lname_required,
  max_length,
  min_length,
  mobile_regex_match,
  mobile_required,
  new_password_match,
  password_match,
  password_min,
  password_minlowercase,
  password_minnumber,
  password_minspecialcharacter,
  password_minuppercase,
  password_required,
} from "../constants/Validations";
YupPassword(Yup);

// Sign Up Schema using Yup
export const SignUpSchema = Yup.object().shape({
  fname: Yup.string()
    .min(2, min_length)
    .max(30, max_length)
    .required(fname_required),
  lname: Yup.string()
    .min(2, min_length)
    .max(30, max_length)
    .required(lname_required),
  mobile: Yup.string().required(mobile_required).matches(mobile_regex, {
    message: mobile_regex_match,
    excludeEmptyString: false,
  }),
  email: Yup.string()
  .lowercase(email_case).strict()
    .email(email)
    .required(email_required),
  password: Yup.string()
    .required(password_required)
    .min(8, password_min)
    .minLowercase(1, password_minlowercase)
    .minUppercase(1, password_minuppercase)
    .minNumbers(1, password_minnumber)
    .minSymbols(1, password_minspecialcharacter),
  confirm_password: Yup.string()
    .required(cpassword_required)
    .oneOf([Yup.ref("password"), null], password_match),
});

// Sign Up Schema End

// Login Schema start

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email(email)
    .lowercase(email_case).strict()
    .required(email_required),
  password: Yup.string().required(password_required),
});
// Login Schema end

// Change Password Schema start

export const ChangePasswordSchema = Yup.object().shape({
  oldpassword: Yup.string().required(password_required),
  newpassword: Yup.string()
    .required(password_required)
    .min(8, password_min)
    .minLowercase(1, password_minlowercase)
    .minUppercase(1, password_minuppercase)
    .minNumbers(1, password_minnumber)
    .minSymbols(1, password_minspecialcharacter),
  confirm_new_password: Yup.string()
    .required(cpassword_required)
    .oneOf([Yup.ref("newpassword"), null], new_password_match),
});
// Change Password Schema end

//Edit Schema start
export const EditSchema = Yup.object().shape({
  fname: Yup.string()
    .min(2, min_length)
    .max(30, max_length)
    .required(fname_required),
  lname: Yup.string()
    .min(2, min_length)
    .max(30, max_length)
    .required(lname_required),
  mobile: Yup.string().required(mobile_required).matches(mobile_regex, {
    message: mobile_regex_match,
    excludeEmptyString: false,
  }),
  email: Yup.string()
    .email(email)
    .lowercase(email_case).strict()
    .required(email_required),
});
//Edit Schema end
