import React from "react";
import ImageUploader from "react-image-upload";
import { useState } from "react";
import { MetaData } from "./MetaData";
import { Container } from "./Container";
import "react-image-upload/dist/index.css";
import { useNavigate, useParams } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import axios from "axios";

export const AddDress = ({setsaved}) => {
  const navigate = useNavigate();
  const base_url = process.env.REACT_APP_BASE_URL;
  const { category } = useParams();
  const [upload, setUpload] = useState();
  const [uploadAcc, setUploadAcc] = useState();
  const dressTypeArr = ["saree", "salwar"];
  const colorArr = ["white", "green", "red"];
  const [dressImage, setdressImage] = useState();
  const [accImage, setaccImage] = useState();
  const [cookie, setCookie] = useCookies(["refreshToken"]);

  const AddDressSchema = Yup.object().shape({
    dressType: Yup.string()
      .oneOf(dressTypeArr, "Please select the type")
      .required("Please select the type"),
    color: Yup.string()
      .oneOf(colorArr, "Please select the color")
      .required("Please select the color"),
    file: Yup.string().required("Please attach image"),
    acc: Yup.string().required("Please attach image"),
  });

  function getImageFileObject(imageFile) {
    setUpload(true);
    setdressImage(imageFile.file);
  }

  function runAfterImageDelete(file) {
    setUpload(false);
    setdressImage(null);
  }
  function getImageFileObjectAcc(imageFile) {
    setUploadAcc(true);
    setaccImage(imageFile.file);
  }

  function runAfterImageDeleteAcc(file) {
    setUploadAcc(false);
    setaccImage(null);
  }
  return (
    <>
      <MetaData title="Home" />
      <Container
        class1={"cart-wrapper home-wrapper-2"}
        class2={"d-flex flex-wrap product-container card my-5"}>
        <div className="row card-body text-white bg-dark">
          <div
            className={`col-4 d-none d-md-block ${
              category === "trendy" ? "trendy" : "traditional"
            }`}></div>
          <Formik
            initialValues={{
              dressType: "",
              color: "",
              file: dressImage,
              acc: accImage,
            }}
            validationSchema={AddDressSchema}
            onSubmit={(values) => {
              const config = {
                token: cookie.refreshToken,
              };
              const data = new FormData();
              data.append("dressImage", dressImage);
              data.append("accImage", accImage);
              data.append("color", values.color);
              data.append("dressType", values.dressType);
              data.append("category", category);
              const a = axios.post(`${base_url}/user-request/addDress`, data, {
                headers: {
                  token: cookie.refreshToken,
                },
              });
              toast.promise(a, {
                pending: {
                  render() {
                    return "Please wait";
                  },
                  icon: true,
                },
                success: {
                  render() {
                    setsaved();
                    navigate("/saved-dress");
                    return "successfully added";
                  },
                  icon: true,
                },
                error: {
                  render() {
                    return "Failed to Add";
                  },
                },
              });
            }}>
            {({ errors, touched, setFieldTouched, setFieldValue }) => (
              <Form className="col-12 col-md-8 d-grid px-0 px-md-5">
                <div className="row my-4 align-items-top">
                  <div className="col-12 col-sm-6">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label">
                      Select the Type
                    </label>
                  </div>
                  <div className="col-12 col-sm-6">
                    <Field
                      as="select"
                      className="form-select"
                      aria-label="Default select example"
                      name="dressType">
                      <option>select</option>
                      <option value="saree">Saree</option>
                      <option value="salwar">Salwar</option>
                    </Field>
                    {touched.dressType && errors.dressType ? (
                      <div className="text-danger pt-1 position-relative">
                        <i className="bi bi-info-circle"></i>
                        {` ${errors.dressType}`}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="row mt-4 align-items-center">
                  <div className="col-12 col-sm-6">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label">
                      Select the color
                    </label>
                  </div>
                  <div className="col-12 col-sm-6">
                    <Field
                      as="select"
                      className="form-select"
                      aria-label="Default select example"
                      name="color">
                      <option value="">Select</option>
                      {colorArr.map((color, index) => {
                        return (
                          <option value={color} key={index}>
                            {color}
                          </option>
                        );
                      })}
                    </Field>
                    <Field
                      as="input"
                      type="color"
                      className="form-select"
                      aria-label="Default select example"
                      name="color"
                      value>
                    </Field>
                    {touched.color && errors.color ? (
                      <div className="text-danger pt-1">
                        <i className="bi bi-info-circle"></i>
                        {` ${errors.color}`}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="row mt-4 align-items-center">
                  <div className="col-12 col-sm-6">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label">
                      Upload the Dress
                    </label>
                  </div>
                  <div className="col-12 col-sm-6">
                    <Field type="hidden" name="file" value=""></Field>
                    <ImageUploader
                      uploadIcon={upload == true && <></>}
                      onFileAdded={(img) => {
                        getImageFileObject(img);
                        setFieldTouched("file");
                        setFieldValue("file", "true");
                      }}
                      onFileRemoved={(img) => runAfterImageDelete(img)}
                    />
                    {errors.file && upload != true && touched.file ? (
                      <div className="text-danger pt-1">
                        <i className="bi bi-info-circle"></i>
                        {` ${errors.file}`}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="row mt-4 align-items-center">
                  <div className="col-12 col-sm-6">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label">
                      Upload the Accessory
                    </label>
                  </div>
                  <div className="col-12 col-sm-6">
                    <Field type="hidden" name="acc" value=""></Field>
                    <ImageUploader
                      uploadIcon={uploadAcc == true && <></>}
                      onFileAdded={(img) => {
                        getImageFileObjectAcc(img);
                        setFieldTouched("acc");
                        setFieldValue("acc", "true");
                      }}
                      onFileRemoved={(img) => runAfterImageDeleteAcc(img)}
                    />
                    {errors.acc && uploadAcc != true && touched.acc ? (
                      <div className="text-danger pt-1">
                        <i className="bi bi-info-circle"></i>
                        {errors.acc}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="row px-2 justify-content-between flex-wrap-reverse">
                  <button
                    className="btn btn-danger col-12 col-md-3 mb-3 mb-md-0"
                    type="button"
                    onClick={() => navigate(-1)}>
                    Cancel
                  </button>
                  <button
                    className="btn btn-success col-12 col-md-3 mb-3 mb-md-0"
                    type="submit">
                    Add
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Container>
    </>
  );
};
