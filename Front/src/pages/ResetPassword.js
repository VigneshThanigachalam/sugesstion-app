import React from "react";
import { MetaData } from "../components/MetaData";
import { Container } from "../components/Container";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";

export const ResetPassword = () => {
  const { refreshToken } = useParams();
  const base_url = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();

  const resetpasswordSchema = Yup.object().shape({
    password: Yup.string()
      .min(4, "must contain 4 letters")
      .required("Please fill the password"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
  });
  return (
    <>
      <MetaData title="Reset-Password" />
      <Container class1="login-wrapper home-wrapper-2 py-5">
        <div className="row align-items-center flex-wrap-reverse">
          <div className="col-12 col-md-6">
            <img
              src="/images/resetpassword.jpg"
              className="img-fluid"
              alt="login-pic"
            />
          </div>
          <div className="col-12 col-md-6">
            <div className="auth-card w-75 mx-auto">
              <h3 className="text-center">Rest Password</h3>
              <Formik
                initialValues={{
                  password: "",
                  confirmPassword: "",
                }}
                validationSchema={resetpasswordSchema}
                onSubmit={(values, { resetForm }) => {
                  toast.loading("Please wait", {
                    progressClassName: "success-progress-bar",
                    toastId: 2,
                  });
                  const postURL = `${base_url}/user/reset-password`;
                  fetch(postURL, {
                    method: "PUT",
                    headers: {
                      Accept: "application/json",
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      // We should keep the fields consistent for managing this data later
                      token: refreshToken,
                      password: values.password,
                    }),
                  })
                    .then((res) => res.json())
                    .then((data) => {
                      if (data.message === "successfully updated") {
                        resetForm();
                        toast.update(2, {
                          render: "successfully updated",
                          type: "success",
                          hideProgressBar: false,
                          autoClose: 1000,
                          isLoading: false,
                        });
                        navigate("/log-in");
                      } else {
                        toast.update(2, {
                          render: "Token expired",
                          type: "error",
                          hideProgressBar: false,
                          autoClose: 5000,
                          isLoading: false,
                        });
                        toast.error("Token expired");
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
                    <Field
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      className="form-control"
                    />
                    {touched.confirmPassword && errors.confirmPassword ? (
                      <div className="text-danger pt-1 position-relative">
                        <i class="bi bi-info-circle"></i>
                        {` ${errors.confirmPassword}`}
                      </div>
                    ) : null}
                    <div>
                      <div className="mt-3 d-flex gap-15 justify-content-center align-items-center">
                        <button className="button border-0" type="submit">
                          Ok
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
