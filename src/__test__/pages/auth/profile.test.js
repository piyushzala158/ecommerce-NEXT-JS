import { getByTestId, render } from "@testing-library/react";
import mockRouter from 'next-router-mock';
import '@testing-library/jest-dom'
import Profile from "../../../pages/auth/profile";

jest.mock('next/router', () => require('next-router-mock'));

describe("", () => {

  it("Should render Profile btn", () => {
    const { getByTestId } = render(
        <Profile />
    );
    expect(getByTestId("profile")).toBeInTheDocument();
  });
});

