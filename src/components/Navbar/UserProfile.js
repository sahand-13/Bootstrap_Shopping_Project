import React from "react";
import { useState } from "react";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";
import useAuth from "../../hooks/useAuth";

const UserProfile = () => {
  const { user, SignOut } = useAuth();
  const [show, setShow] = useState(false);
  return (
    <OverlayTrigger
      key={"bottom"}
      placement={"bottom"}
      trigger={"click"}
      show={show}
      overlay={
        <Popover
          style={{ backgroundColor: "#01010185" }}
          onMouseLeave={() => setShow(false)}
        >
          <Popover.Header
            className=" text-light"
            style={{ backgroundColor: "#01010185" }}
            as="h3"
          >
            {user?.Email}
          </Popover.Header>
          <Popover.Body style={{ padding: 5 }}>
            <ul
              style={{
                listStyleType: "none",
                margin: 0,
                padding: 0,
                textAlign: "center",
              }}
              className={"w-100 mx-auto"}
            >
              {/* <li>
                <div className="text-light m-1" style={{ cursor: "pointer" }}>
                  sign out
                </div>
              </li> */}
              <li>
                <Button
                  variant="light"
                  style={{ fontSize: "10px" }}
                  className="w-100"
                  size="sm"
                  onClick={() => SignOut()}
                >
                  Sign Out
                </Button>
              </li>
            </ul>
          </Popover.Body>
        </Popover>
      }
    >
      <div
        className="d-flex text-white"
        style={{
          marginLeft: 30,
          marginRight: 30,
          width: "10rem",
          cursor: "pointer",
        }}
        onMouseEnter={() => setShow(true)}
        onClick={() => setShow((pervious) => !pervious)}
      >
        <div
          style={{
            borderRadius: "50%",
            marginRight: 10,
            width: "40px",
            height: "40px",
            backgroundColor: "red",
          }}
        >
          <div style={{ marginLeft: 16, marginTop: 6 }}>
            {user?.FullName.charAt(0).toUpperCase()}
          </div>
        </div>
        <div
          style={{
            wordWrap: "normal",
            width: "100px",
            height: "20px",
            marginTop: 6,
          }}
        >
          {user?.FullName}
        </div>
      </div>
    </OverlayTrigger>
  );
};

export default UserProfile;
