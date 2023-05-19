import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import ClipLoader from "react-spinners/ClipLoader";
import { Container } from "./Container";
import { useNavigate } from "react-router-dom";

export const ProtectRoute = ({ children, setlog }) => {
  const navigate = useNavigate();
  const base_url = process.env.REACT_APP_BASE_URL;
  const [cookie, setCookie] = useCookies(["refreshToken"]);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    const postURL = `${base_url}/user/validateToken`;
    cookie.refreshToken && cookie.refreshToken != "undefined"
      ? fetch(postURL, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            token: cookie.refreshToken,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if ("verified" !== data.token) {
              navigate("/log-in");
            } else {
              setlog();
              setLoading(false);
            }
          })
      : navigate("/log-in");
  }, []);
  return (
    <>
      {loading ? (
        <Container
          class1={
            "cart-wrapper home-wrapper-2 d-flex position-fixed top-50 start-50 translate-middle"
          }>
          <ClipLoader
            color={"orange"}
            loading={loading}
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </Container>
      ) : (
        children
      )}
    </>
  );
};
