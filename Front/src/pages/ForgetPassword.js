import React from "react";
import { MetaData } from "../components/MetaData";
import { Link, useNavigate } from "react-router-dom";
import { Container } from "../components/Container";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ForgetPassword = () => {
  const base_url = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const forgetpasswordSchema = Yup.object().shape({
    email: Yup.string()
      .email("must have a valid email")
      .required("Please fill the password"),
  });
  return (
    <>
      <MetaData title="Forget-Password" />
      <Container clas1={"login-wrapper home-wrapper-2 py-5"}>
        <div className="row align-items-center flex-wrap-reverse">
          <div className="col-12 col-md-6">
            <img
              src="/images/forgetpassword.jpg"
              className="img-fluid"
              alt="login-pic"
            />
          </div>
          <div className="col-12 col-md-6">
            <div className="auth-card w-75 mx-auto">
              <h3 className="text-center">Reset Your Password</h3>
              <p className="text-center mt-2 mb-3">
                We will send you an email to reset your password
              </p>
              <Formik
                initialValues={{
                  email: "",
                }}
                validationSchema={forgetpasswordSchema}
                onSubmit={(values, { resetForm }) => {
                  toast.loading("Please wait", {
                    progressClassName: "success-progress-bar",
                    toastId: 2,
                  });
                  const postURL = `${base_url}/user/forget-password`;
                  fetch(postURL, {
                    method: "POST",
                    headers: {
                      Accept: "application/json",
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      // We should keep the fields consistent for managing this data later
                      email: values.email,
                    }),
                  })
                    .then((res) => res.json())
                    .then((data) => {
                      if (data.message === "mail sent") {
                        resetForm();
                        toast.update(2, {
                          render: "reset mail sent",
                          type: "success",
                          hideProgressBar: false,
                          autoClose: 1000,
                          isLoading: false,
                        });
                        navigate("/log-in");
                      } else {
                        toast.update(2, {
                          render: "you are not a registered user",
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
                <Form className="d-flex flex-column gap-15 py-5">
                  <Field
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="form-control"
                  />
                  <div>
                    <div className="mt-3 d-flex gap-15 justify-content-center flex-column align-items-center">
                      <button className="button border-0" type="submit">
                        Submit
                      </button>
                      <Link to="/log-in">Cancel</Link>
                    </div>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};
