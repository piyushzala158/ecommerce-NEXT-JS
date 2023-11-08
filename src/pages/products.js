import React, { useState } from "react";
import { Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { AiFillStar } from "react-icons/ai";
import Pagination from "react-bootstrap/Pagination";
import Spinner from "../components/spinner/Spinner";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Products.module.scss";
import Header from "../components/Header";
import { mainUrl } from "../constants/ApiURLs";

const Product = ({ products }) => {
  const [activePage, setActivePage] = useState(1);
  const pageSize = 8; // products per page
  let totalPages = products?.products
    ? Math.ceil(products.products.length / pageSize)
    : null;

  // change active Page
  const handlePageClick = (pageNumber) => {
    setActivePage(pageNumber);
  };
  // Reander Procuts start
  const renderProducts = () => {
    const startIndex = (activePage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return (
      <>
        <Header />
        <div className="row m-1 m-sm-5" data-testid="Products">
          {/* sliced products using startIndex and endIndex  */}
          {products ? (
            products?.products?.slice(startIndex, endIndex).map((product) => (
              <div key={product.id} className="col-sm-6 col-lg-4 col-xl-3 py-4">
                <Card className="m-auto product">
                  <img alt="Sample" src={product.thumbnail} height="250px" />
                  <CardBody className="m-3">
                    <div className="d-flex justify-content-between mb-4">
                      <div>
                        <CardTitle tag="h5">{product.title}</CardTitle>
                        <CardSubtitle>{product.category}</CardSubtitle>
                        <h5 className={`${styles.rating} mt-1`}>
                          Rating : {product.rating}
                          <AiFillStar className="text-warning" size={22} />
                        </h5>
                        <h6>Brand : {product.brand}</h6>
                      </div>
                      <div className="float-end">
                        <h4>${product.price}</h4>
                        <h6>{product.discountPercentage}% Off</h6>
                      </div>
                    </div>
                    <Link
                      href={`/${product.id}`}
                      className="btn btn-primary large_font mt-3"
                    >
                      View
                    </Link>
                  </CardBody>
                </Card>
              </div>
            ))
          ) : (
            <Spinner />
          )}
        </div>
      </>
    );
  };
  // End Render Products

  // render Pagination Items
  const renderPaginationItems = () => {
    const items = [];
    for (let i = 1; i <= totalPages; i++) {
      items.push(
        <Pagination.Item
          key={i}
          onClick={() => handlePageClick(i)}
          active={i === activePage}
        >
          {i}
        </Pagination.Item>
      );
    }
    return items;
  };
  // End render Pagination Items

  return (
    <div>
      {renderProducts()}
      <Pagination size="lg" className="flex-wrap justify-content-center mx-2">
        {renderPaginationItems()}
      </Pagination>
    </div>
  );
};

export default Product;

export async function getStaticProps() {
  //fetch api
  const response = await fetch(mainUrl);
  const products = await response.json();
  return {
    props: {
      products,
    },
  };
}
