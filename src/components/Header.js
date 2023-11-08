import React, { useEffect, useState } from "react";
import { useCookies, withCookies } from "react-cookie";
import Link from "next/link";
import { useRouter } from "next/router";

const Header = () => {
  const [user, setUser] = useState(null);
  const [cookies] = useCookies(["LoggedInUser"]);
  const router = useRouter();
  const { pathname } = router;

  useEffect(() => {
    setUser(cookies.LoggedInUser);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link href="/products" className="navbar-brand mx-5">
          My Shop
        </Link>
        <div className="justify-content-end me-3" id="navbarSupportedContent">
          {user && pathname !== "/auth/profile" ? (
            <Link
              href="/auth/profile"
              className="btn btn-outline-success large_font"
              data-testid="profilebtn"
            >
              Profile
            </Link>
          ) : null}
        </div>
      </div>
    </nav>
  );
};

export default Header
