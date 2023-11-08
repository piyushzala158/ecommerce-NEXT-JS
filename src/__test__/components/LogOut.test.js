import { fireEvent, render } from "@testing-library/react";
import LogOut from "../../components/LogOut";
import mockRouter from 'next-router-mock';
import '@testing-library/jest-dom'
import { useCookies } from "react-cookie";

jest.mock('next/router', () => require('next-router-mock'));
jest.mock('react-cookie');

describe("LogOut", () => {
  it("should remove LoggedInUser cookie and update user cookie", () => {
    // const removeCookie = jest.fn();
    const removeCookie = jest.fn();
    const setCookie = jest.fn();
    useCookies.mockReturnValue([
      { LoggedInUser: "testuser", user: [{ id: 1, isLogedIn: true }] },
      setCookie,
      removeCookie,
    ]);
    const { getByTestId } = render(
        <LogOut />
    );
    fireEvent.click(getByTestId("logout"));
    expect(removeCookie).toHaveBeenCalledWith("LoggedInUser",{ path: "/", maxAge: -1 });
    expect(setCookie).toHaveBeenCalledWith(
      "user",
      JSON.stringify([{ id: 1, isLogedIn: false }]),
      { path: "/", maxAge: 3600 * 24 * 30 * 12, sameSite: true }
    );
  });
});
