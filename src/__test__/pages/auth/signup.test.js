import { fireEvent, getByTestId, render, screen, waitFor } from "@testing-library/react";
import mockRouter from 'next-router-mock';
import '@testing-library/jest-dom'
import SignUp from "../../../pages/auth/signup";

jest.mock('next/router', () => require('next-router-mock'));

describe("SignUp", ()=> {
   it("renders SignUp form",()=>{
     render(
          <SignUp/>
      );
      const fName = screen.getByLabelText("First Name");
      const lName = screen.getByLabelText("Last Name");
      const mobile = screen.getByLabelText("Mobile Number");
      const email = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const cpasswordInput = screen.getByLabelText("Confirm Password");
    const submitButton = screen.getByTestId("signupbtn");
    expect(fName).toBeInTheDocument();
    expect(lName).toBeInTheDocument();
    expect(mobile).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(cpasswordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
   })
   it("submitting form calls onSubmit handler with All the Fields", async() => {
  
    const mockOnSubmit = jest.fn();
    render(
        <SignUp />
      );
   const fName = screen.getByLabelText("First Name");
   const lName = screen.getByLabelText("Last Name");
   const mobile = screen.getByLabelText("Mobile Number");
   const email = screen.getByLabelText("Email");
 const passwordInput = screen.getByLabelText("Password");
 const cpasswordInput = screen.getByLabelText("Confirm Password");
 const submitButton = screen.getByTestId("signupbtn");

    fireEvent.change(fName, { target: { value: "piyush" } });
    fireEvent.change(lName, { target: { value: "zala" } });
    fireEvent.change(mobile, { target: { value: 9876543210 } });
    fireEvent.change(email, { target: { value: "piyush@gmail.com" } });
    fireEvent.change(passwordInput, { target: { value: "Piyush@123" } });
    fireEvent.change(cpasswordInput, { target: { value: "Piyush@123" } });
    mockOnSubmit(submitButton);
    await waitFor(() => {
        expect(mockOnSubmit).toBeCalledTimes(1)
    });
  });
})