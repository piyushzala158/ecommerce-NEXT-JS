import { fireEvent, getByTestId, render, screen, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom'
import mockRouter from 'next-router-mock';
import Login from "../../../pages/auth/login";


jest.mock('next/router', () => require('next-router-mock'));

describe("Login", ()=> {
   it("renders login form",()=>{
    const { getByTestId } = render(
          <Login />
      );
      const usernameInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByTestId("login");
    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
   })
   it("submitting form calls onSubmit handler with username and password", async() => {
  
    const mockOnSubmit = jest.fn();
    render(
        <Login />
        )
    const usernameInput = screen.getByTestId("email");
    const passwordInput = screen.getByTestId("password");
    const submitButton = screen.getByTestId("loginbtn");

    fireEvent.change(usernameInput, { target: { value: "piyush@z.z1" } });
    fireEvent.change(passwordInput, { target: { value: "Piyush@123" } });
    mockOnSubmit(submitButton);
    await waitFor(() => {
        expect(mockOnSubmit).toBeCalledTimes(1)
      });
  });
})