import React from "react";
import { Button, Card, Container, Form, Image } from "react-bootstrap";
import { useForm } from "react-hook-form";
import SignupSVG from "../../assets/svg/Signup.svg";
import Bounce from "react-reveal/Bounce";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRef } from "react";
import { useSnackbar } from "notistack";
import Roll from "react-reveal/Roll";
import Flip from "react-reveal/Flip";
import { useNavigate } from "react-router-dom";
import Title from "../../components/Helmet/Title";
import { AvailableUsers } from "../../Constants/localStorageConstant";
import { useEffect } from "react";
const SignupPage = () => {
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
      FullName: yup
        .string()
        .required("Full Name is required")
        .min(5, "Full Name must be at least 5 character"),
    })
    .required();
  // hooks
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isValidating },
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
    const fieldsState = getFieldState();
    if (!fieldsState.invalid) {
      const Users = localStorage.getItem(AvailableUsers);
      if (Users) {
        const ParsedUsers = JSON.parse(Users);
        if (ParsedUsers.find((user) => user.Email === e.Email)) {
          return enqueueSnackbar("User Already Register", {
            variant: "error",
            autoHideDuration: 1000,
          });
        }
        ParsedUsers.push({ ...e });
        localStorage.setItem(AvailableUsers, JSON.stringify(ParsedUsers));
      } else {
        const Users = [];
        Users.push({ ...e });
        localStorage.setItem(AvailableUsers, JSON.stringify(Users));
      }
      enqueueSnackbar("Registration Successfully", {
        variant: "success",
        autoHideDuration: 1000,
      });
      return navigate({ pathname: "/Login" });
    }
  };
  return (
    <Title title={"Sign Up"}>
      <Flip right cascade>
        <Card className="bg-dark bg-gradient text-white w-50 mx-auto mt-3 mb-3 ">
          <Card.Title
            style={{ fontFamily: "Impact" }}
            className=" text-center  text-info  display-4 mt-5"
          >
            <Bounce top cascade>
              SIGN UP NOW
            </Bounce>
          </Card.Title>
          <Card.Img height={"300px"} src={SignupSVG} alt="Login SVG" />

          <Card.Body className=" w-75 mx-auto" style={{ marginBottom: "40px" }}>
            <Form
              className="w-75 mx-auto "
              onChange={() => isValid && closeSnackbar()}
            >
              <Form.Group className=" m-3 " controlId="FullName">
                <Form.Control
                  className=""
                  placeholder="Please enter your full name"
                  {...register("FullName")}
                />
                {errors?.FullName?.message &&
                  errorHandler(errors?.FullName?.message)}
              </Form.Group>
              <Form.Group className=" m-3 " controlId="Email">
                <Form.Control
                  type="email"
                  className=""
                  placeholder="Enter email"
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
                return navigate({ pathname: "/Login" });
              }}
            >
              Sign In
            </Button>
            <Button
              variant="info"
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
              Sign Up
            </Button>
          </Card.Footer>
        </Card>
      </Flip>
    </Title>
  );
};

export default SignupPage;
