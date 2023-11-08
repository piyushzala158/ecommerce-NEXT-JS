import Link from "next/link";
import React from "react";
import { useCookies } from "react-cookie";

const LogOut = () => {
  // Remove logged in user from cookies
  const [cookie, setCookie, removeCookie] = useCookies([
    "LoggedInUser",
    "user",
  ]);
  const handleClick = () => {
    removeCookie("LoggedInUser", { path: "/", maxAge: -1 });
    const user = cookie?.user;
    //set isLoggedIn false in cookies
    const newData = user?.map((u) => {
      return { ...u, isLogedIn: false };
    });
    setCookie("user", JSON.stringify(newData), {
      path: "/",
      maxAge: 3600 * 24 * 30 * 12,
      sameSite: true,
    });
  };
  return (
    <div className="text-center mx-5">
      <Link
        href="/auth/login"
        className="btn btn-outline-danger large_font"
        onClick={handleClick}
        data-testid="logout"
      >
        Log Out
      </Link>
    </div>
  );
};

export default LogOut;
