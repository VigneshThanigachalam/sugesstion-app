import React from "react";
import { MetaData } from "../components/MetaData";
import { Link, useNavigate } from "react-router-dom";
import { Container } from "../components/Container";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

export const Signup = () => {
  const base_url = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const signupSchema = Yup.object().shape({
    name: Yup.string().required("Please fill the name"),
    email: Yup.string()
      .email("must have a valid email")
      .required("Please fill the email"),
    mobile: Yup.number()
      .min(10, "must contan 10 digits")
      .required("Please fill the mobile number"),
    password: Yup.string()
      .required("Please fill the password")
      .min(4, "must contain 4 letters"),
  });
  return (
    <>
      <MetaData title="Sign-Up" />
      <Container class1={"login-wrapper home-wrapper-2 py-5"}>
        <div className="row align-items-center flex-wrap-reverse">
          <div className="col-12 col-md-6">
            <img
              src="/images/signup.jpg"
              className="img-fluid"
              alt="login-pic"
            />
          </div>
          <div className="col-12 col-md-6">
            <div className="auth-card w-75 mx-auto">
              <h3 className="text-center">Sign Up</h3>
              <Formik
                initialValues={{
                  name: "",
                  email: "",
                  mobile: "",
                  password: "",
                }}
                validationSchema={signupSchema}
                onSubmit={(values, { resetForm }) => {
                  toast.loading("Please wait", {
                    progressClassName: "success-progress-bar",
                    toastId: 2,
                  });
                  const postURL = `${base_url}/user/register`;
                  fetch(postURL, {
                    method: "POST",
                    headers: {
                      Accept: "application/json",
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      // We should keep the fields consistent for managing this data later
                      name: values.name,
                      email: values.email,
                      mobile: values.mobile,
                      password: values.password,
                    }),
                  })
                    .then((res) => res.json())
                    .then((data) => {
                      if (data.message === "successfully created") {
                        resetForm();
                        toast.update(2, {
                          render: "successfully created",
                          type: "success",
                          hideProgressBar: false,
                          autoClose: 1000,
                          isLoading: false,
                        });
                        navigate("/");
                      } else {
                        toast.update(2, {
                          render: data.message,
                          type: "warning",
                          hideProgressBar: false,
                          autoClose: 5000,
                          isLoading: false,
                        });
                      }
                    })
                    .catch((err) => {
                      toast.update(2, {
                        render: "Failed to fetch",
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
                      type="text"
                      name="name"
                      placeholder="Name"
                      className="form-control"
                    />
                    {touched.name && errors.name ? (
                      <div className="text-danger pt-1 position-relative">
                        <i class="bi bi-info-circle"></i>
                        {` ${errors.name}`}
                      </div>
                    ) : null}
                    <Field
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="form-control"
                    />
                    {touched.email && errors.email ? (
                      <div className="text-danger pt-1 position-relative">
                        <i class="bi bi-info-circle"></i>
                        {` ${errors.email}`}
                      </div>
                    ) : null}
                    <Field
                      type="tel"
                      name="mobile"
                      placeholder="Mobile Number"
                      className="form-control"
                    />
                    {touched.mobile && errors.mobile ? (
                      <div className="text-danger pt-1 position-relative">
                        <i class="bi bi-info-circle"></i>
                        {` ${errors.mobile}`}
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
                        <i class="bi bi-info-circle"></i>
                        {` ${errors.password}`}
                      </div>
                    ) : null}
                    <div>
                      <div className="mt-3 d-flex gap-15 justify-content-center align-items-center">
                        <button className="button border-0" type="submit">
                          Sign Up
                        </button>
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
