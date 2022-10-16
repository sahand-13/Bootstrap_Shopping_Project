import React, { useState } from "react";
import { Navbar as BSNavBar, Container, Nav } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
import useTheme from "../../hooks/useTheme";
import useShoppingCart from "../../hooks/useShoppingCart";
import BagCounter from "./BagCounter";
import UserProfile from "./UserProfile";

const Navbar = () => {
  const { theme } = useTheme();
  const [hover, setHover] = useState(false);
  const { GetAllCount } = useShoppingCart();
  const Counter = GetAllCount();
  const { pathname } = useLocation();

  return (
    <BSNavBar
      sticky="top"
      className="shadow-lg clearfix mb-3 h-25"
      bg={theme.mode}
      variant="dark"
    >
      <UserProfile />
      <Container>
        <Nav className="me-auto">
          <Nav.Link
            className="text-uppercase text-center m-2 d-flex "
            as={NavLink}
            to="/"
            style={{}}
          >
            <Icon
              style={{
                color: theme.palette.primary.main.darker,
                fontWeight: "bold",
                cursor: "pointer",
              }}
              width={30}
              hieght={30}
              icon="typcn:home"
            />
            <div
              className="m-1"
              style={{
                color: theme.palette.text.secondary.lighter,
                fontWeight: "bold",
              }}
            >
              Home
            </div>
          </Nav.Link>
          <Nav.Link
            className="text-white text-uppercase text-center m-2   d-flex "
            as={NavLink}
            to={"/Shop"}
          >
            <Icon width={30} hieght={30} icon="noto:shopping-bags" />

            <div
              className="m-1"
              style={{
                color: theme.palette.text.secondary.darker,
                fontWeight: "bold",
              }}
            >
              Shop
            </div>
          </Nav.Link>
        </Nav>
        {pathname.toLowerCase() === "/shop" && (
          <Nav.Item className="text-white">
            <div
              style={{
                width: "2rem",
                hieght: "2rem",
                position: "relative",
                marginLeft: 10,
                marginRight: 10,
              }}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              <Icon
                className="m-1 justify-content-centers justify-content-center"
                icon={"icon-park-solid:mall-bag"}
                style={{ transition: "ease-in-out 250ms" }}
                color={
                  hover
                    ? theme.palette.primary.main.lighter
                    : theme.palette.primary.secondary.lighter
                }
                width={45}
                hieght={45}
              />
              <div
                className="d-flex  align-items-center justify-content-center"
                style={{
                  width: 5,
                  hieght: 5,
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  transform: "translate(-50%, -15% )",
                  color: !hover
                    ? theme.palette.text.secondary.deepest
                    : theme.palette.text.secondary.lighter,
                }}
              >
                {Counter > 0 && <BagCounter />}
              </div>
            </div>
          </Nav.Item>
        )}
      </Container>
    </BSNavBar>
  );
};

export default Navbar;
