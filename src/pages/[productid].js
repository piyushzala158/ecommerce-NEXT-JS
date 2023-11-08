import React, { useEffect, useState } from "react";
import { Card, CardBody, CardSubtitle, CardText, CardTitle } from "reactstrap";
import { AiFillStar } from "react-icons/ai";
import Header from "../components/Header";
import Spinner from "../components/spinner/Spinner";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { mainUrl, productUrl } from "../constants/ApiURLs";

function Product({ product }) {
  return (
    <div>
      <Header />
      <div className="col-10 col-md-6 col-lg-4 col-xl-3  py-4 m-auto">
        {product ? (
          <Card data-testid="product" className="product">
            <Carousel showStatus={false}>
              {product.images.map((img, index) => (
                <div key={index}>
                  <img src={img} />
                </div>
              ))}
            </Carousel>
            <CardBody className="m-3">
              <div className="d-flex justify-content-between">
                <div>
                  <CardTitle tag="h5">{product.title}</CardTitle>
                  <CardSubtitle>{product.category}</CardSubtitle>
                  <h6 className="mt-3">
                    Rating : {product.rating}
                    <AiFillStar className="text-warning" size={22} />
                  </h6>
                  <CardText>Brand : {product.brand}</CardText>
                  <CardText>Available Stock : {product.stock}</CardText>
                  <CardText>{product.description}</CardText>
                </div>
                <div className="float-end">
                  <h4>${product.price}</h4>
                  <h6>{product.discountPercentage}% Off</h6>
                </div>
              </div>
            </CardBody>
          </Card>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}

export default Product;

export async function getStaticProps({ params }) {
  //get product using productid 
  const res = await fetch(`${productUrl}/${params.productid}`);
  const product = await res.json();
  return {
    props: { product },
  };
}

export async function getStaticPaths() {
  const res = await fetch(mainUrl);
  const products = await res.json();
  const paths = products.products.map((product) => ({
    params: { productid: product.id.toString() },
  }));
  return { paths, fallback: false };
}
