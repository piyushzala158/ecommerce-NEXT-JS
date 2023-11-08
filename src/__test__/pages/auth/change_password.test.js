import {
    fireEvent,
    getByTestId,
    render,
    screen,
    waitFor,
  } from "@testing-library/react";
import ChangePassword from "../../../pages/auth/change_password";
import mockRouter from 'next-router-mock';
import '@testing-library/jest-dom'

jest.mock('next/router', () => require('next-router-mock'));

  describe("ChangePassword", () => {
    it("renders ChangePassword form", () => {
      const { getByTestId } = render(
          <ChangePassword />
      );
      const oldpasswordInput = screen.getByLabelText("Old Password");
      const passwordInput = screen.getByLabelText("New Password");
      const confirmNewPassword = screen.getByTestId("cpassword");
      const submitButton = screen.getByRole("button", { name: "Submit" });
      expect(oldpasswordInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
      expect(confirmNewPassword).toBeInTheDocument();
      expect(submitButton).toBeInTheDocument();
    });
    it("submitting form calls onSubmit handler with All the Fields", async () => {
      const mockOnSubmit = jest.fn();
      render(
          <ChangePassword />
      );
      const oldpasswordInput = screen.getByLabelText("Old Password");
      const passwordInput = screen.getByLabelText("New Password");
      const confirmNewPassword = screen.getByTestId("cpassword");
      const submitButton = screen.getByRole("button", { name: "Submit" });
  
      fireEvent.change(oldpasswordInput, { target: { value: "Piyush@123" } });
      fireEvent.change(passwordInput, { target: { value: "Piyush@1234" } });
      fireEvent.change(confirmNewPassword, { target: { value: "Piyush@1234" } });
      mockOnSubmit(submitButton);
      await waitFor(() => {
        expect(mockOnSubmit).toBeCalledTimes(1);
      });
    });
  });
  