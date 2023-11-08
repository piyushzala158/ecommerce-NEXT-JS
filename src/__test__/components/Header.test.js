import { getByTestId, render } from "@testing-library/react";
import mockRouter from 'next-router-mock';
import '@testing-library/jest-dom'
import { useCookies } from "react-cookie";
import Header from "../../components/Header";

jest.mock('next/router', () => require('next-router-mock'));
jest.mock('react-cookie');
describe("", () => {
    
    it("Should render Header", () => {
    useCookies.mockReturnValue([{ LoggedInUser: 'testuser' }]);
    const { getByText} = render(
        <Header />
    );
    expect(getByText("My Shop")).toBeInTheDocument();
  });
  it("Should render Profile btn if user Logged In", () => {
    useCookies.mockReturnValue([{ LoggedInUser: 'testuser' }]);
const { getByTestId } = render(
    <Header />
);
expect(getByTestId("profilebtn")).toHaveTextContent("Profile");
});

});


// import { render, screen } from "@testing-library/react";
// import { withCookies } from "react-cookie";
// import Header from "../../components/Header";

// describe("Header component", () => {
//   it("should render the brand logo and navigation links", () => {
//     render(withCookies(<Header />));

//     expect(screen.getByText("My Shop")).toBeInTheDocument();
//     expect(screen.getByTestId("profilebtn")).toBeInTheDocument();
//   });
// });