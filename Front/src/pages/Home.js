import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Container } from "../components/Container";
import { MetaData } from "../components/MetaData";
import { CgArrowRight } from "react-icons/cg";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

export const Home = () => {
  const navigate = useNavigate();
  const base_url = process.env.base_url;
  const CategorySchema = Yup.object().shape({
    picked: Yup.string()
      .oneOf(["traditional", "trendy"])
      .required("Please choose the category"),
  });

  return (
    <>
      <MetaData title="Home" />
      <Container class1={"cart-wrapper home-wrapper-2"}>
        <div className="row my-5 flex-wrap-reverse justify-content-between">
          <div className="col-6 home-wall"></div>
          <div className="col-6 my-5 pt-4">
            <div className="auth-card mx-auto">
              <h3 className="text-center">Choose the Category</h3>
              <Formik
                initialValues={{
                  picked: "",
                }}
                validationSchema={CategorySchema}
                onSubmit={(values) => {
                  navigate(values.picked);
                }}>
                {({ errors, values }) => (
                  <Form className="d-flex flex-column gap-15 py-0 py-md-5">
                    <Field
                      type="radio"
                      className="btn-check"
                      name="picked"
                      value="traditional"
                      id="traditional"
                      autoComplete="off"
                    />
                    <label
                      className="btn btn-outline-dark d-flex justify-content-between"
                      htmlFor="traditional">
                      <span className="w-25 traditional-logo"></span>{" "}
                      <span className="w-75 text-center my-auto">
                        Traditional
                      </span>
                    </label>
                    <Field
                      type="radio"
                      className="btn-check"
                      name="picked"
                      value="trendy"
                      id="trendy"
                      autoComplete="off"
                    />
                    <label
                      className="btn btn-outline-dark d-flex justify-content-between"
                      htmlFor="trendy">
                      <span className="w-25 trendy-logo"></span>{" "}
                      <span className="w-75 text-center my-auto">Trendy</span>
                    </label>
                    {errors.picked ? (
                      <div className="text-danger">
                        <i className="bi bi-info-circle"></i>
                        {` ${errors.picked}`}
                      </div>
                    ) : null}
                    <div>
                      <div className="mt-3 d-flex gap-15 justify-content-center align-items-center">
                        <button className="button border-0" type="submit">
                          <CgArrowRight />
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
