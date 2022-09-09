import { Icon } from "@iconify/react";
import React from "react";
import { Button, Card } from "react-bootstrap";
import useTheme from "../../hooks/useTheme";
import curruncyFormatter from "../../utils/curruncyFormatter";
import Jump from "react-reveal/Jump";
import useShoppingCart from "../../hooks/useShoppingCart";
import { v4 as uuidv4 } from "uuid";

const ShopItems = ({ product }) => {
  const { theme } = useTheme();
  const {
    cart,
    inCreaseCartQuantity,
    deCreaseCartQuantity,
    GetItemsCount,
    removeItem,
  } = useShoppingCart();
  const count = GetItemsCount(product.id);
  return (
    <>
      <Card style={{ width: "25rem", margin: "0.3rem" }}>
        <Card.Img
          className={"shadow-lg mt-1 mb-1 bg-white rounded "}
          variant="top"
          src={
            product.pic
              ? product.pic
              : require("../../assets/images/loading.jpg")
          }
          height={"250rem"}
        />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>{product.discription}</Card.Text>
          <div
            style={{
              justifyContent: "space-between",
              display: "flex",
              textAlign: "center",
            }}
          >
            {count > 0 ? (
              <Button
                style={{
                  margin: 1,
                  width: "2rem",
                  height: "2rem",
                  textAlign: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
                className={"rounded-circle"}
                size={"small"}
                variant="warning"
                onClick={() => deCreaseCartQuantity(product.id)}
              >
                <div
                  style={{
                    position: "absolute",
                    bottom: 5,
                    right: 12,
                  }}
                  icon={"material-symbols:add-circle-outline"}
                >
                  -
                </div>
              </Button>
            ) : (
              <div />
            )}
            <div
              style={{
                marginTop: "3px",
                position: "relative",
              }}
            >
              {curruncyFormatter(product.price)}
            </div>
            {count > 0 ? (
              <Button
                style={{
                  margin: 1,
                  width: "2rem",
                  height: "2rem",
                  textAlign: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
                className={"rounded-circle"}
                size={"small"}
                variant="success"
                onClick={() => inCreaseCartQuantity(product.id)}
              >
                <Icon
                  style={{
                    position: "absolute",
                    bottom: 5,
                    right: 5,
                  }}
                  width={20}
                  height={20}
                  icon={"material-symbols:add-circle-outline"}
                />
              </Button>
            ) : (
              <div />
            )}
          </div>
        </Card.Body>
        {count > 0 ? (
          <Jump>
            <div
              style={{
                marginRight: 20,
              }}
            >
              <Card.Footer
                style={{
                  backgroundColor: theme.palette.primary.secondary.darker,
                  transitionTimingFunction: "height ease-in 3s",
                }}
                className={"m-3 me-auto "}
              >
                <div
                  style={{
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Icon
                    width={25}
                    height={25}
                    icon="arcticons:amazon-shopping"
                    color={theme.palette.primary.main.darker}
                  />
                  <div style={{ margin: 2 }}>
                    <span style={{ color: theme.palette.text.warning.darker }}>
                      {count}
                    </span>{" "}
                    item is added
                  </div>
                </div>
              </Card.Footer>
            </div>
          </Jump>
        ) : (
          <div
            style={{
              marginRight: 20,
            }}
            onClick={() => {
              inCreaseCartQuantity(product.id);
            }}
          >
            <Card.Footer
              style={{
                backgroundColor: theme.palette.primary.main.darker,
                transitionTimingFunction: "height ease-in 3s",
              }}
              className={"m-4 me-auto "}
            >
              <div
                style={{
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Icon
                  width={25}
                  height={25}
                  icon="arcticons:amazon-shopping"
                  color={theme.palette.primary.secondary.darker}
                />
                <div
                  style={{
                    margin: 2,
                    color: theme.palette.text.primary,
                  }}
                >
                  Add To Cart
                </div>
              </div>
            </Card.Footer>
          </div>
        )}
      </Card>
    </>
  );
};

export default ShopItems;
