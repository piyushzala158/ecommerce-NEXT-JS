import { fireEvent, render, waitFor } from "@testing-library/react";
import Product from "../../pages/products";
import mockRouter from 'next-router-mock';
import '@testing-library/jest-dom'


jest.mock('next/router', () => require('next-router-mock'));

describe("Products", () => {
  test("renders the Products when it is fetched", async () => {
    const { getByTestId } = render(
        <Product />
    );
    await waitFor(() => {
      expect(getByTestId("Products")).toBeInTheDocument();
    });
  });
});
