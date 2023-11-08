import { useFormik } from "formik";
import React, { useEffect } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import Header from "../../components/Header";
// import "../../assets/scss/style.scss";
import { toast } from "react-hot-toast";
import Encrypt from "../../utils/Encrypt";
import decrypt from "../../utils/Decrypt";
import { LoginSchema } from "../../components/Validations";
import { invald_email, login_successfully, user_already_exist } from "../../constants/constant";
import { useCookies } from "react-cookie";
import Link from "next/link";
import { useRouter } from "next/router";

function Login() {
const router = useRouter()
//Get use data from coockies
const [cookie, setCookie] = useCookies(["user","LoggedInUser"])

  const initialValues = {
    fname: "",
    lname: "",
    mobile: '',
    email: "",
    password: "",
  };

  // Login form with Formik
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: LoginSchema,
      onSubmit: (values) => {
        //filter data using email
        let user = cookie?.user?.filter((u) => u.email == values.email);
        if (!user[0]){
          // Display error message if login fails
          toast.error(user_already_exist);
        } else {
          // compare input password with stored password
          const userhashedPassword = decrypt(user[0].password);
          if (userhashedPassword === values.password) {
            // Encrept Password 
            const hashedPassword = Encrypt(values.password);
            setCookie("LoggedInUser", 
              JSON.stringify([
                {
                  fname: user[0].fname,
                  lname: user[0].lname,
                  mobile: user[0].mobile,
                  email: values.email,
                  password: hashedPassword,
                  isLogedIn: true,
                }
              ]),{
                path: "/",
                maxAge: 3600*24*30*12, 
                sameSite: true,
                }
            );
            // Updated Sign Up data for Logged In user
            const updatedUsers = cookie?.user?.map((value) => {
              if (value.email === values.email) {
                return {
                  ...value,
                  isLogedIn: true,
                };
              } else {
                return {
                  ...value,
                  isLogedIn: false,
                };
              }
            });
            // localStorage.setItem("users", JSON.stringify(updatedUsers));
            setCookie("user", JSON.stringify(updatedUsers), {
                path: "/",
                maxAge: 3600*24*30*12, // Expires after 1hr
                sameSite: true,
                })
            // Redirect to home page
            toast.success(login_successfully)
            router.push("/products")
          } else {
            // Display error message if login fails
            toast.error(invald_email);
          }
        }
      },
    });
    return (
      <>
        <Header />
        <div className="container" data-testid="searchBar">
          <h4 className="text-center my-3">LOG IN</h4>
          <Form
            onSubmit={handleSubmit}
            data-testid="login"
            className="w-50 m-auto form"
          >
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
                data-testid="email"
              />
              {touched.email && errors.email ? (
                <p className="error">{errors.email}</p>
              ) : null}
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
                data-testid="password"
              />
              {touched.password && errors.password ? (
                <p className="error">{errors.password}</p>
              ) : null}
            </FormGroup>
            <div className="d-flex flex-column flex-md-row justify-content-between">
              <Button
                type="submit"
                name="submit"
                className="large_font mt-3 btn"
                data-testid="loginbtn"
              >
                LOG IN
              </Button>
              <Link
                href="/auth/signup"
                className="large_font btn btn-outline-info ms-5 mt-3 "
              >
                Sign Up
              </Link>
            </div>
          </Form>
        </div>
      </>
    ); 
}

export default Login;
