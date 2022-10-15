import React from "react";
import { Button, Card, Container, Form, Image } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Login from "../../assets/svg/Login.svg";
import Bounce from "react-reveal/Bounce";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRef } from "react";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { AvailableUsers, User } from "../../Constants/localStorageConstant";
import Flip from "react-reveal/Flip";
import Title from "../../components/Helmet/Title";

const LoginPage = () => {
  // Form Validation Schema
  const navigate = useNavigate();
  const schema = yup
    .object()
    .shape({
      Email: yup
        .string()
        .required("Email is required")
        .email("Email isn't Valid"),
      Password: yup
        .string()
        .required("Password is required")
        .min(8, "Password at least 8 character")
        .matches(
          /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/,
          "Password should have One upperCase and one character lower case and number"
        ),
    })
    .required();
  // hooks
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    clearErrors,
    getFieldState,
  } = useForm({
    resolver: yupResolver(schema),
  });
  // -------
  const errorHandler = (message) => {
    if (!isValid) {
      enqueueSnackbar(message, {
        preventDuplicate: true,
        variant: "warning",
        autoHideDuration: 5000,
        anchorOrigin: { vertical: "bottom", horizontal: "left" },
      });
    } else {
      clearErrors();
    }
  };
  const Submit = (e) => {
    const fieldState = getFieldState();
    if (!fieldState.invalid) {
      const AllUsers = localStorage.getItem(AvailableUsers);
      const user =
        AllUsers && JSON.parse(AllUsers).find((user) => user.Email === e.Email);

      if (!user) {
        enqueueSnackbar("User is not exist ", {
          variant: "error",
          autoHideDuration: 2000,
          anchorOrigin: { vertical: "bottom", horizontal: "left" },
        });
      }
      if (user && user.Password === e.Password) {
        enqueueSnackbar("Login Successfully", {
          variant: "success",
          autoHideDuration: 3000,
          anchorOrigin: { vertical: "bottom", horizontal: "left" },
        });

        localStorage.setItem(User, JSON.stringify(user));
        navigate({ pathname: "/" });
      }
      if (user && user.Password !== e.Password) {
        enqueueSnackbar("Wrong Password", {
          variant: "error",
          autoHideDuration: 2000,
          anchorOrigin: { vertical: "bottom", horizontal: "left" },
        });
      }
    }
  };
  return (
    <Title title={"Login"}>
      <Flip left cascade>
        <Card className="bg-dark bg-gradient  text-white w-50 mx-auto mt-3 mb-3 ">
          <Card.Title
            style={{ fontFamily: "Impact" }}
            className=" text-center  text-primary display-4 mt-5"
          >
            <Bounce top cascade>
              LOGIN
            </Bounce>
          </Card.Title>
          <Card.Img height={"350px"} src={Login} alt="Login SVG" />

          <Card.Body className=" w-75 mx-auto" style={{ marginBottom: "40px" }}>
            <Form
              className="w-75 mx-auto "
              onChange={() => isValid && closeSnackbar()}
            >
              <Form.Group className=" m-3 " controlId="Email">
                <Form.Control
                  type="email"
                  className=""
                  placeholder="Enter email"
                  autoComplete="off"
                  {...register("Email")}
                />
                {errors?.Email?.message && errorHandler(errors?.Email?.message)}
              </Form.Group>

              <Form.Group className="m-3" controlId="Password">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  {...register("Password")}
                />
                {errors?.Password?.message &&
                  errorHandler(errors?.Password?.message)}
              </Form.Group>
            </Form>
          </Card.Body>
          <Card.Footer className="text-center ">
            <Button
              variant="light"
              size="sm"
              style={{
                height: "38px",
                marginTop: "10px",
                marginBottom: "10px",
                marginLeft: "1rem",
                marginRight: "1rem",
                width: "10rem",
              }}
              onClick={() => {
                closeSnackbar();
                return navigate({ pathname: "/Signup" });
              }}
            >
              Sign Up
            </Button>
            <Button
              variant="primary"
              type="submit"
              size="sm"
              style={{
                height: "38px",
                marginTop: "10px",
                marginBottom: "10px",
                marginLeft: "1rem",
                marginRight: "1rem",
                width: "10rem",
              }}
              onClick={handleSubmit((e) => Submit(e))}
            >
              LogIn
            </Button>
          </Card.Footer>
        </Card>
      </Flip>
    </Title>
  );
};

export default LoginPage;
