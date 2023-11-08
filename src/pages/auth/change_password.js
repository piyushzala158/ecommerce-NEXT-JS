import { useFormik } from "formik";
import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
// import "../../assets/scss/style.scss";
// import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Header from "../../components/Header";
import decrypt from "../../utils/Decrypt";
import Encrypt from "../../utils/Encrypt";
import { ChangePasswordSchema } from "../../components/Validations";
import {
  newpassword_old_password_is_same,
  oldpass_wrong,
  password_updated,
} from "../../constants/constant";
import Link from "next/link";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";

function ChangePassword() {
const router = useRouter()
//Get use data from coockies
const [cookie, setCookie] = useCookies(["user","LoggedInUser"])
        const userData =cookie?.LoggedInUser
        const userSignedInData = cookie?.user

  const initialValues = {
    oldpassword: "",
    newpassword: "",
    confirm_new_password: "",
  };

  // Form handle using Formik
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: ChangePasswordSchema,
      onSubmit: (values) => {
        // compare oldpassword with Cookie password
        const logpassword = decrypt(userData[0]?.password);
        if (values.oldpassword === logpassword) {
          if (values.oldpassword !== values.confirm_new_password) {
            // Encrypt New password and updated in Cookies
            const hashedPassword = Encrypt(values.newpassword);
            const updatedLoggedInUser = userData.map((val) => {
              return {
                ...val,
                password: hashedPassword,
              };
            });
            setCookie("LoggedInUser", JSON.stringify(updatedLoggedInUser), {
                path: "/",
                maxAge: 3600*24*30*12,
                sameSite: true,
                })
            const updatedUsers = userSignedInData.map((value) => {
              if (value.isLogedIn === true) {
                return {
                  ...value,
                  password: hashedPassword,
                };
              } else {
                return value;
              }
            });
            setCookie("user", JSON.stringify(updatedUsers), {
                path: "/",
                maxAge: 3600*24*30*12, 
                sameSite: true,
                })
            toast.success(password_updated);
            router.push('/auth/profile')
          } else {
            toast.error(newpassword_old_password_is_same);
          }
        } else {
          toast.error(oldpass_wrong);
        }
      },
    });
  return (
    <>
      <Header />
      <div className="container mt-5" data-testid="changepassword">
        <h2 className="text-center my-3">Change Password</h2>
        <Form onSubmit={handleSubmit} className="w-50 m-auto form">
          <FormGroup>
            <Label for="oldpassword" className="large_font">
              Old Password
            </Label>
            <Input
              id="oldpassword"
              name="oldpassword"
              placeholder="Enter Old password"
              type="password"
              value={values.oldpassword}
              onChange={handleChange}
              onBlur={handleBlur}
              className="large_font"
            />
            {touched.oldpassword && errors.oldpassword ? (
              <p className="error">{errors.oldpassword}</p>
            ) : null}
          </FormGroup>
          <FormGroup>
            <Label for="newpassword" className="large_font">
              New Password
            </Label>
            <Input
              id="newpassword"
              name="newpassword"
              placeholder="Enter New password"
              type="password"
              value={values.newpassword}
              onChange={handleChange}
              onBlur={handleBlur}
              className="large_font"
            />
            {touched.newpassword && errors.newpassword ? (
              <p className="error">{errors.newpassword}</p>
            ) : null}
          </FormGroup>
          <FormGroup>
            <Label for="cpassword" className="large_font">
              Confirm New Password
            </Label>
            <Input
              id="confirm_new_password"
              name="confirm_new_password"
              placeholder="Enter Confirm password"
              type="password"
              value={values.confirm_new_password}
              onChange={handleChange}
              onBlur={handleBlur}
              className="large_font"
              data-testid="cpassword"
            />
            {touched.confirm_new_password && errors.confirm_new_password ? (
              <p className="error">{errors.confirm_new_password}</p>
            ) : null}
          </FormGroup>
          <div className="d-flex flex-column flex-md-row justify-content-between">
            <Button type="submit" className="large_font btn mt-3">
              Submit
            </Button>
            <Link
              href="/auth/profile"
              className="large_font btn btn-outline-info ms-5 mt-3"
            >
              Profile
            </Link>
          </div>
        </Form>
      </div>
    </>
  );
}

export default ChangePassword;
