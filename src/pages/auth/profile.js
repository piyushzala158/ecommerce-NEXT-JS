import { useFormik } from "formik";
import React from "react";
// import { Link } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
// import "../../assets/scss/style.scss";
import Header from "../../components/Header";
import { toast } from "react-hot-toast";
import { EditSchema } from "../../components/Validations";
import { email_already_exist, profile_updated } from "../../constants/constant";
import { useCookies } from "react-cookie";
import Link from "next/link";
import LogOut from "../../components/LogOut";

const Profile = () => {

//Get use data from coockies
const [cookie, setCookie] = useCookies(["user","LoggedInUser"])
const existingSignInUser = cookie?.user || []
const existingUser = cookie?.LoggedInUser || [];
// console.log(existingUser);
  const initialValues = {
    fname: existingUser[0]?.fname,
    lname: existingUser[0]?.lname,
    mobile: existingUser[0]?.mobile,
    email: existingUser[0]?.email,
  };

  //Edit From with Fromik
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
    validationSchema: EditSchema,
    onSubmit: (values) => {
      // Add new user data to existing user data array and store in local storage
      const checkAuthentication = (email) => {
        let isContained = false;
        isContained = existingSignInUser.some((item) => item.email === email);
        return isContained;
      };
      const updatedUsers = existingSignInUser.map((value) => {
        // check if this is the value to be edited
        if (!value.isLogedIn) {
          return {
            ...value,
          };
        } else {
          // If user change the email value check that if input email is already Exstist
          if (value.email !== values.email) {
            if (checkAuthentication(values.email)) {
              toast.error(email_already_exist);
              resetForm();
              return {
                ...value,
              };
            } else {
              toast.success(profile_updated);
              return {
                ...value,
                fname: values.fname,
                lname: values.lname,
                mobile: values.mobile,
                email: values.email,
              };
            }
          } else {
            toast.success(profile_updated);
            return {
              ...value,
              fname: values.fname,
              lname: values.lname,
              mobile: values.mobile,
              email: values.email,
            };
          }
        }
      });
      const newUser = updatedUsers.filter((data) => data.isLogedIn == true);
    //   localStorage.setItem("LoggedInUsers", JSON.stringify(newUser));
    //   localStorage.setItem("users", JSON.stringify(updatedUsers));
    setCookie("user", JSON.stringify(updatedUsers), {
        path: "/",
        maxAge: 3600*24*30*12, // Expires after 1hr
        sameSite: true,
        })
    setCookie("LoggedInUser", JSON.stringify(newUser), {
        path: "/",
        maxAge: 3600*24*30*12, // Expires after 1year
        sameSite: true,
        })
    },
  });
  return (
    <>
      <Header />
      <div className="profile container" data-testid="profile">
        <h2 className="text-center mt-5">PROFILE</h2>
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
            {touched.fname && errors.fname ? (
              <p className="error">{errors.fname}</p>
            ) : null}
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
            {touched.lname && errors.lname ? (
              <p className="error">{errors.lname}</p>
            ) : null}
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
            {touched.mobile && errors.mobile ? (
              <p className="error">{errors.mobile}</p>
            ) : null}
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
            {touched.email && errors.email ? (
              <p className="error">{errors.email}</p>
            ) : null}
          </FormGroup>
          <Button type="submit" className="large_font text-end">
            UPDATE
          </Button>
        </Form>
        <div className="d-flex justify-content-center flex-column flex-lg-row mt-4">
          <LogOut />
          <Link
            href="/auth/change_password"
            className="btn btn-outline-warning large_font change_password_btn"
          >
            Change Password
          </Link>
        </div>
      </div>
    </>
  );
};

export default Profile;
