import { useFormik } from "formik";
import React, { useEffect } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import Header from "../../components/Header";
// import "../../assets/scss/style.scss";
import { toast } from "react-hot-toast";
import Encrypt from "../../utils/Encrypt";
import { SignUpSchema } from "../../components/Validations";
import { email_already_exist, signup_successfully } from "../../constants/constant";
import Link from "next/link";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";

function SignUp() {
const Router = useRouter()
  const [cookie, setCookie] = useCookies(["user"])

  const initialValues = {
    fname: "",
    lname: "",
    mobile: '',
    email: "",
    password: "",
    confirm_password: "",
  };
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: SignUpSchema,
    onSubmit: (values) => {
      // Check if username already exists
        const usernameExists = cookie.user ? cookie.user.some(
          (user) => user.email === values.email
        ) : null
        // console.log(usernameExists)
        if (usernameExists) {
          toast.error(email_already_exist);
          resetForm();
        } else {
          //Encrypt Password
          const hashedPassword = Encrypt(values.password);
          // Add new user data to existing user data array and store in local storage
          const newUser = {
            fname: values.fname,
            lname: values.lname,
            mobile: values.mobile,
            email: values.email,
            password: hashedPassword,
          };
          // console.log(cookie.user);
          const updatedUsers = cookie.user ? [...cookie?.user,newUser] : [newUser]
          const userData = JSON.stringify(updatedUsers);
          setCookie("user", JSON.stringify(updatedUsers), {
            path: "/",
            maxAge: 3600*24*30*12, // Expires after 1hr
            sameSite: true,
            })
          // Clear form fields
          resetForm();     
          toast.success(signup_successfully);
            Router.push('/auth/login')
          
        }
    },
  });
  return (
    <>
      <Header />
      <div className="container">
        <h2 className="text-center m-3">Welcome to <span className="text-info">My Shop</span></h2>
        <h4 className="text-center my-3">SIGN UP</h4>
        <Form onSubmit={handleSubmit} className="w-50 m-auto form">
          <FormGroup>
            <Label for="fname" className="large_font">
              First Name
            </Label>
            <Input
              id="fname"
              name="fname"
              placeholder="Enter Your First Name"
              type="name"
              value={values.fname}
              onChange={handleChange}
              onBlur={handleBlur}
              className="large_font"
            />
            {touched.fname && errors.fname ? <p className="error">{errors.fname}</p> : null}
          </FormGroup>
          <FormGroup>
            <Label for="lname" className="large_font">
              Last Name
            </Label>
            <Input
              id="lname"
              name="lname"
              placeholder="Enter Your Last Name"
              type="lname"
              value={values.lname}
              onChange={handleChange}
              onBlur={handleBlur}
              className="large_font"
            />
            {touched.lname && errors.lname ? <p className="error">{errors.lname}</p> : null}
          </FormGroup>
          <FormGroup>
            <Label for="mobile" className="large_font">
              Mobile Number
            </Label>
            <Input
              id="mobile"
              name="mobile"
              placeholder="Enter Your Mobile Number"
              value={values.mobile}
              onChange={handleChange}
              onBlur={handleBlur}
              className="large_font"
            />
            {touched.mobile && errors.mobile ? <p className="error">{errors.mobile}</p> : null}
          </FormGroup>
          <FormGroup>
            <Label for="email" className="large_font">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              placeholder="Enter Your Email"
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className="large_font"
            />
            {touched.email && errors.email ? <p className="error">{errors.email}</p> : null}
          </FormGroup>
          <FormGroup>
            <Label for="password" className="large_font">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              placeholder="Enter password"
              type="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className="large_font"
            />
            {touched.password && errors.password ? (
              <p className="error">{errors.password}</p>
            ) : null}
          </FormGroup>
          <FormGroup>
            <Label for="password" className="large_font">
              Confirm Password
            </Label>
            <Input
              id="confirm_password"
              name="confirm_password"
              placeholder="Confirm Password"
              type="password"
              value={values.confirm_password}
              onChange={handleChange}
              onBlur={handleBlur}
              className="large_font"
            />
            {touched.confirm_password && errors.confirm_password ? (
              <p className="error">{errors.confirm_password}</p>
            ) : null}
          </FormGroup>
          <div className="d-flex flex-column flex-md-row justify-content-between">
          <Button type="submit" name="Submit" className="large_font btn" data-testid="signupbtn">
            SIGN UP
          </Button>
          <Link href="/auth/login" className="large_font btn btn-outline-info ms-5">
            Login
          </Link>
          </div>
        </Form>
      </div>
    </>
  );
}
export default SignUp;
