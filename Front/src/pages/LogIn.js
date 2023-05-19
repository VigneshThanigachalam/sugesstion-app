import React from "react";
import { MetaData } from "../components/MetaData";
import { Link, useNavigate } from "react-router-dom";
import { Container } from "../components/Container";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import axios from "axios";

export const LogIn = ({ setlog, log }) => {
  const base_url = process.env.REACT_APP_BASE_URL;
  const [cookies, setCookie] = useCookies(["refreshToken"]);
  const navigate = useNavigate();
  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email("must have a valid email")
      .required("Please fill the email"),
    password: Yup.string().required("Please fill the password"),
  });
  return (
    <>
      <MetaData title="Log-in" />
      <Container class1={"login-wrapper home-wrapper-2 py-5"}>
        <div className="row align-items-center flex-wrap-reverse">
          <div className="col-12 col-md-6">
            <img
              src="/images/login.jpg"
              className="img-fluid"
              alt="login-pic"
            />
          </div>
          <div className="col-12 col-md-6">
            <div className="auth-card w-75 mx-auto">
              <h3 className="text-center">Login</h3>
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                }}
                validationSchema={loginSchema}
                onSubmit={(values, { resetForm }) => {
                  toast.loading("Please wait", {
                    progressClassName: "success-progress-bar",
                    toastId: 2,
                  });
                  const postURL = `${base_url}/user/login`; //Our previously set up route in the backend
                  fetch(postURL, {
                    method: "POST",
                    headers: {
                      Accept: "application/json",
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      // We should keep the fields consistent for managing this data later
                      email: values.email,
                      password: values.password,
                    }),
                  })
                    .then((res) => res.json())
                    .then((data) => {
                      if (data.message === "successfully logged") {
                        setlog();
                        setCookie("refreshToken", data.token);
                        resetForm();
                        toast.update(2, {
                          render: "successfully logged",
                          type: "success",
                          hideProgressBar: false,
                          autoClose: 1000,
                          isLoading: false,
                        });
                        navigate("/");
                      } else {
                        toast.update(2, {
                          render: "Invalid Crediential",
                          type: "warning",
                          hideProgressBar: false,
                          autoClose: 5000,
                          isLoading: false,
                        });
                      }
                    })
                    .catch((err) => {
                      toast.update(2, {
                        render: "Failed to Fetch",
                        type: "error",
                        hideProgressBar: false,
                        autoClose: 5000,
                        isLoading: false,
                      });
                    });
                }}>
                {({ errors, touched }) => (
                  <Form className="d-flex flex-column gap-15 py-5">
                    <Field
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="form-control"
                    />
                    {touched.email && errors.email ? (
                      <div className="text-danger pt-1 position-relative">
                        <i className="bi bi-info-circle"></i>
                        {` ${errors.email}`}
                      </div>
                    ) : null}
                    <Field
                      type="password"
                      name="password"
                      placeholder="Password"
                      className="form-control"
                    />
                    {touched.password && errors.password ? (
                      <div className="text-danger pt-1 position-relative">
                        <i className="bi bi-info-circle"></i>
                        {` ${errors.password}`}
                      </div>
                    ) : null}
                    <div>
                      <Link to="/forget-password">Forget Password</Link>
                      <div className="mt-3 d-flex gap-15 justify-content-center align-items-center">
                        <button className="button border-0" type="submit">
                          Login
                        </button>
                        <Link to="/sign-up" className="button signup">
                          SignUp
                        </Link>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};
