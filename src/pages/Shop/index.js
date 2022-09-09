import React from "react";
import { Container, Row } from "react-bootstrap";
import ShopItems from "../../components/ShopItems/ShopItems";
import Store from "../../data/store.json";

const Shop = () => {
  const { products } = Store;
  return (
    <Container>
      <Row
        md={2}
        xs={1}
        lg={3}
        className="g-2"
        style={{ justifyContent: "center" }}
      >
        {products.map((product) => {
          return <ShopItems key={product.id} product={product} />;
        })}
      </Row>
    </Container>
  );
};

export default Shop;
