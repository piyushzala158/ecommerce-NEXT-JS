import { fireEvent, render, waitFor } from "@testing-library/react";
import mockRouter from 'next-router-mock';
import '@testing-library/jest-dom'
import Product from "../../pages/[productid]";

jest.mock('next/router', () => require('next-router-mock'));
const mockdata = {
    "id": 1,
    "title": "iPhone 9",
    "thumbnail": "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
    "images": [
    "https://i.dummyjson.com/data/products/1/1.jpg",
    "https://i.dummyjson.com/data/products/1/2.jpg",
    ]
    }

describe("Products", () => {

  test("renders the Products when it is fetched", async () => {
    const { getByTestId } = render(
        <Product product={mockdata} />
    );
    await waitFor(() => {
      expect(getByTestId("product")).toBeInTheDocument();
    });
  });
});